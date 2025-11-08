import OAuthManager from './oauth-manager.js';

class UploadManager {
  constructor() {
    this.oauthManager = new OAuthManager();
    this.uploaders = {
      googleDrive: this.uploadToGoogleDrive.bind(this),
      onedrive: this.uploadToOneDrive.bind(this),
      dropbox: this.uploadToDropbox.bind(this)
    };
  }

  async uploadFile(file, provider, progressCallback) {
    try {
      const token = await this.oauthManager.authenticate(provider);
      const uploader = this.uploaders[provider];
      if (!uploader) throw new Error(`No uploader for ${provider}`);
      const result = await uploader(file, token, progressCallback);
      return result;
    } catch (error) {
      console.error(`Upload error for ${provider}:`, error);
      throw error;
    }
  }

  // Upload Google Drive using fetch with multipart formdata and progress via XMLHttpRequest workaround (limited support)
  async uploadToGoogleDrive(file, accessToken, progressCallback) {
    const metadata = { name: file.name, mimeType: file.type || 'application/octet-stream' };
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', file);

    // Unfortunately fetch upload progress is not widely supported in service worker
    // You can omit progressCallback or implement using XMLHttpRequest in UI context if needed

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData
    });

    if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
    const data = await response.json();

    return { success: true, fileId: data.id, fileName: data.name, webViewLink: data.webViewLink };
  }

  async uploadToOneDrive(file, accessToken, progressCallback) {
    if (file.size < 4 * 1024 * 1024) {
      return this.uploadToOneDriveSimple(file, accessToken, progressCallback);
    } else {
      return this.uploadToOneDriveResumable(file, accessToken, progressCallback);
    }
  }

  async uploadToOneDriveSimple(file, accessToken, progressCallback) {
    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${encodeURIComponent(file.name)}:/content`;

    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': file.type || 'application/octet-stream'
      },
      body: file
    });

    if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
    const data = await response.json();

    return { success: true, fileId: data.id, fileName: data.name, webUrl: data.webUrl };
  }

  async uploadToOneDriveResumable(file, accessToken, progressCallback) {
    const createSessionUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${encodeURIComponent(file.name)}:/createUploadSession`;

    const sessionResponse = await fetch(createSessionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item: { '@microsoft.graph.conflictBehavior': 'rename' }
      })
    });

    if (!sessionResponse.ok) throw new Error(`Failed to create upload session: ${sessionResponse.statusText}`);

    const sessionData = await sessionResponse.json();
    const uploadUrl = sessionData.uploadUrl;

    const chunkSize = 320 * 1024 * 10; // 3.2 MB
    let offset = 0;

    while (offset < file.size) {
      const chunk = file.slice(offset, Math.min(offset + chunkSize, file.size));
      const chunkBuffer = await chunk.arrayBuffer();

      const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Length': chunkBuffer.byteLength.toString(),
          'Content-Range': `bytes ${offset}-${offset + chunkBuffer.byteLength - 1}/${file.size}`
        },
        body: chunkBuffer
      });

      if (!response.ok && response.status !== 202) {
        throw new Error(`Chunk upload failed: ${response.statusText}`);
      }

      offset += chunkBuffer.byteLength;

      if (progressCallback) {
        progressCallback((offset / file.size) * 100);
      }

      if (response.status === 201 || response.status === 200) {
        const result = await response.json();
        return { success: true, fileId: result.id, fileName: result.name, webUrl: result.webUrl };
      }
    }
  }

  async uploadToDropbox(file, accessToken, progressCallback) {
    const arrayBuffer = await file.arrayBuffer();
    // const accessToken = await this.oauthManager.getDropboxAccessToken(code);
    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: '/Apps/Downdrive' + file.name,
          mode: 'add',
          autorename: true,
          mute: false
        })
      },
      body: arrayBuffer
    });

    if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = JSON.stringify(errorData, null, 2);
        } catch {
          errorMessage = response.statusText;
        }
        throw new Error(`Upload failed: ${errorMessage}`);
  }


    const data = await response.json();

    return { success: true, fileId: data.id, fileName: data.name, pathDisplay: data.path_display };
  }
}

export default UploadManager;
