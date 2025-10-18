# filesafe
# Cloud Storage Uploader Extension - Setup Guide

## Overview
This browser extension allows users to upload files directly from their browser to multiple cloud storage services including Google Drive, OneDrive, and Dropbox.

## Project Structure
```
extension/
├── manifest.json              # Extension configuration
├── service-worker.js          # Background service worker
├── oauth-manager.js           # OAuth authentication handler
├── upload-manager.js          # File upload logic
└── popup/
    ├── popup.html            # Extension popup UI
    ├── popup.js              # Popup logic
    └── popup.css             # Popup styles
```

## Setup Instructions

### 1. Configure OAuth Credentials

Before using the extension, you need to set up OAuth applications for each cloud provider:

#### Google Drive
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Drive API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Chrome App" as application type
6. Add authorized redirect URI: `https://<extension-id>.chromiumapp.org/`
7. Copy the Client ID and update in `oauth-manager.js` and `manifest.json`

#### OneDrive (Microsoft)
1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to "Azure Active Directory" → "App registrations"
3. Click "New registration"
4. Add redirect URI: `https://<extension-id>.chromiumapp.org/`
5. Go to "API permissions" → Add "Microsoft Graph" → "Files.ReadWrite"
6. Copy the Application (client) ID and update in `oauth-manager.js`

#### Dropbox
1. Go to [Dropbox App Console](https://www.dropbox.com/developers/apps)
2. Click "Create app"
3. Choose "Scoped access" and "Full Dropbox" access
4. Add redirect URI: `https://<extension-id>.chromiumapp.org/`
5. In Permissions tab, enable "files.content.write"
6. Copy the App key and update in `oauth-manager.js`

### 2. Update Configuration Files

**oauth-manager.js:**
```javascript
googleDrive: {
  clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  // ...
},
onedrive: {
  clientId: 'YOUR_MICROSOFT_CLIENT_ID',
  // ...
},
dropbox: {
  clientId: 'YOUR_DROPBOX_APP_KEY',
  // ...
}
```

**manifest.json:**
```json
"oauth2": {
  "client_id": "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
  "scopes": [
    "https://www.googleapis.com/auth/drive.file"
  ]
}
```

### 3. Load the Extension

#### Chrome/Edge:
1. Open `chrome://extensions/` or `edge://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the extension directory
5. Note the Extension ID for OAuth redirect URI configuration

#### Firefox:
1. Open `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `manifest.json` from the extension directory

### 4. Add Icons

Create three PNG icons and place them in an `icons/` directory:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

## Usage

1. Click the extension icon in your browser toolbar
2. Select your cloud storage provider from the dropdown
3. Click "Connect Account" to authenticate
4. Choose files to upload (or drag and drop)
5. Click "Upload Files" to start the upload process
6. Monitor progress and view results

## Features

### OAuth Authentication
- Secure OAuth 2.0 authentication flow
- Token caching for improved performance
- Automatic token validation
- Support for multiple cloud providers

### File Upload
- Multiple file selection
- Drag and drop support
- Progress tracking
- Chunked upload for large files (OneDrive)
- Error handling and retry logic
- Batch upload support

### User Interface
- Clean, modern design
- Real-time progress indicators
- Upload status notifications
- File list management
- Provider switching

## API Reference

### OAuthManager

```javascript
const oauthManager = new OAuthManager();

// Authenticate with a provider
const token = await oauthManager.authenticate('googleDrive');

// Logout from a provider
await oauthManager.logout('googleDrive');

// Logout from all providers
await oauthManager.logoutAll();
```

### UploadManager

```javascript
const uploadManager = new UploadManager();

// Upload a single file
const result = await uploadManager.uploadFile(
  file, 
  'googleDrive', 
  (progress) => console.log(`Progress: ${progress}%`)
);

// Upload multiple files
const results = await uploadManager.uploadMultipleFiles(
  files, 
  'onedrive', 
  (progress, current, total, fileName) => {
    console.log(`Uploading ${current}/${total}: ${fileName} (${progress}%)`);
  }
);
```

## File Size Limits

- **Google Drive**: No hard limit in this implementation (uses multipart upload)
- **OneDrive**: 
  - Simple upload: < 4MB
  - Resumable upload: >= 4MB (chunked at 3.2MB per chunk)
- **Dropbox**: No hard limit in this implementation

## Troubleshooting

### Authentication Issues
- Ensure OAuth credentials are correctly configured
- Check redirect URI matches extension ID
- Verify API permissions are granted
- Clear cached tokens: `chrome.storage.local.clear()`

### Upload Failures
- Check file size limits
- Verify network connectivity
- Ensure valid authentication token
- Check browser console for errors

### CORS Errors
- Ensure `host_permissions` in manifest.json include all API endpoints
- Check OAuth app configuration allows extension origin

## Development

### Testing
1. Make changes to source files
2. Go to `chrome://extensions/`
3. Click reload icon for the extension
4. Test functionality in popup

### Debugging
- Service Worker: Click "service worker" link in extensions page
- Popup: Right-click popup → Inspect
- Console logs: Check both service worker and popup consoles

## Security Considerations

- Never commit OAuth credentials to version control
- Use environment variables or config files for sensitive data
- Token storage uses Chrome's secure storage API
- All API calls use HTTPS
- Tokens expire after 50 minutes (refresh required)

## Browser Compatibility

- Chrome: ✅ Full support (Manifest V3)
- Edge: ✅ Full support (Chromium-based)
- Firefox: ⚠️ Requires `browser.*` API polyfill
- Safari: ⚠️ Limited support (requires Safari-specific adjustments)

## Future Enhancements

- Box.com integration
- pCloud integration
- AWS S3 support
- Upload history view
- Scheduled/automatic uploads
- Folder selection for upload destination
- File encryption before upload
- Resume interrupted uploads
- Context menu integration
- Keyboard shortcuts

## License

This project is provided as-is for educational purposes.

## Support

For issues and questions:
1. Check browser console for errors
2. Verify OAuth configuration
3. Test with different file sizes
4. Review API documentation for each provider