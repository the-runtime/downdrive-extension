// Popup Script - Handles UI interactions
import OauthManager from '../lib/oauth-manager.js';

class PopupController {
  constructor() {
    this.oauthManager = new OauthManager();
    this.selectedFiles = [];
  
   
    this.isUploading = false;

    this.loadSelectedProvider().then(() => {
      console.log('selectedProvider loaded:', this.selectedProvider);
      this.checkAuthStatus();  // call after loading provider
    });


    this.initializeElements();
    this.attachEventListeners();
    this.checkAuthStatus();
  }

  getStorage(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => resolve(result[key]));
    });
  }

  async loadSelectedProvider() {
    const provider = await this.getStorage('selectedProvider');
    document.getElementById('provider-select').value = provider;
    this.selectedProvider = provider;
  }



  initializeElements() {
    // UI Elements
    this.providerSelect = document.getElementById('provider-select');
    // this.fileInput = document.getElementById('file-input');
    // this.dropZone = document.getElementById('drop-zone');
    // this.fileList = document.getElementById('file-list');
    this.savePdfBtn = document.getElementById('save-pdf-btn');
    this.saveDocxBtn = document.getElementById('save-docx-btn');
    this.clearBtn = document.getElementById('clear-btn');
    this.authBtn = document.getElementById('auth-btn');
    this.authStatus = document.getElementById('auth-status');
    this.progressSection = document.getElementById('progress-section');
    this.progressBar = document.getElementById('progress-bar');
    this.progressText = document.getElementById('progress-text');
    this.statusSection = document.getElementById('status-section');
    this.statusMessage = document.getElementById('status-message');
  }

  attachEventListeners() {
    // Provider selection
    this.providerSelect.addEventListener('change', (e) => {
      console.log("selectedProvider, value", this.selectedProvider, e.target.value)
      this.selectedProvider = e.target.value;
      chrome.storage.local.set({ selectedProvider: e.target.value })
      this.checkAuthStatus();
    });

    // // File input
    // this.fileInput.addEventListener('change', (e) => {
    //   this.handleFileSelection(e.target.files);
    // });

    // // Drag and drop
    // this.dropZone.addEventListener('dragover', (e) => {
    //   e.preventDefault();
    //   this.dropZone.classList.add('drag-over');
    // });

    // this.dropZone.addEventListener('dragleave', () => {
    //   this.dropZone.classList.remove('drag-over');
    // });

    // this.dropZone.addEventListener('drop', (e) => {
    //   e.preventDefault();
    //   this.dropZone.classList.remove('drag-over');
    //   this.handleFileSelection(e.dataTransfer.files);
    // });

    // // Buttons
    console.log("in addListensers")
    this.savePdfBtn.addEventListener('click', () => this.savePageAsPdf());
    this.saveDocxBtn.addEventListener('click', () => this.savePageAsDocx())
    // this.clearBtn.addEventListener('click', () => this.clearFiles());
    this.authBtn.addEventListener('click', () => this.handleAuth());
  }

  // handleFileSelection(files) {
  //   // Add new files to selection
  //   for (let file of files) {
  //     this.selectedFiles.push(file);
  //   }

  //   this.renderFileList();
  //   this.updateButtons();
  // }

  // renderFileList() {
  //   this.fileList.innerHTML = '';

  //   if (this.selectedFiles.length === 0) {
  //     this.fileList.innerHTML = '<p class="no-files">No files selected</p>';
  //     return;
  //   }

  //   this.selectedFiles.forEach((file, index) => {
  //     const fileItem = document.createElement('div');
  //     fileItem.className = 'file-item';

  //     const fileInfo = document.createElement('div');
  //     fileInfo.className = 'file-info';

  //     const fileName = document.createElement('span');
  //     fileName.className = 'file-name';
  //     fileName.textContent = file.name;

  //     const fileSize = document.createElement('span');
  //     fileSize.className = 'file-size';
  //     fileSize.textContent = this.formatFileSize(file.size);

  //     fileInfo.appendChild(fileName);
  //     fileInfo.appendChild(fileSize);

  //     const removeBtn = document.createElement('button');
  //     removeBtn.className = 'remove-btn';
  //     removeBtn.textContent = '×';
  //     removeBtn.onclick = () => this.removeFile(index);

  //     fileItem.appendChild(fileInfo);
  //     fileItem.appendChild(removeBtn);
  //     this.fileList.appendChild(fileItem);
  //   });
  // }

  // removeFile(index) {
  //   this.selectedFiles.splice(index, 1);
  //   this.renderFileList();
  //   this.updateButtons();
  // }

  // clearFiles() {
  //   this.selectedFiles = [];
  //   this.fileInput.value = '';
  //   this.renderFileList();
  //   this.updateButtons();
  //   this.hideProgress();
  //   this.hideStatus();
  // }

  // updateButtons() {
  //   const hasFiles = this.selectedFiles.length > 0;
  //   this.uploadBtn.disabled = !hasFiles || this.isUploading;
  //   this.clearBtn.disabled = !hasFiles || this.isUploading;
  // }

  // async handleUpload() {
  //   if (this.selectedFiles.length === 0 || this.isUploading) return;

  //   this.isUploading = true;
  //   this.updateButtons();
  //   this.showProgress();
  //   this.hideStatus();

  //   try {
  //     const progressCallback = (progress, current, total, fileName) => {
  //       this.updateProgress(progress, current, total, fileName);
  //     };

  //     const results = await this.uploadManager.uploadMultipleFiles(
  //       this.selectedFiles,
  //       this.selectedProvider,
  //       progressCallback
  //     );

  //     this.showResults(results);
  //     this.clearFiles();
  //   } catch (error) {
  //     this.showError(error.message);
  //   } finally {
  //     this.isUploading = false;
  //     this.updateButtons();
  //     this.hideProgress();
  //   }
  // }

  async savePageAsPdf() {
     chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]?.id) {
        // console.log("in the tab section")
        chrome.tabs.sendMessage(tabs[0].id, { action: 'savePageAsPdf' }, response => {
          console.log('Response from content script:', response);
        });
      }
    });
  }
  
  async savePageAsDocx() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]?.id) {
        // console.log("in the tab section")
        chrome.tabs.sendMessage(tabs[0].id, { action: 'savePageAsDocx' }, response => {
          console.log('Response from content script:', response);
        });
      }
    });
  }

  async handleAuth() {
    console.log("in the handleAuth")
    try {

      this.authBtn.disabled = true;
      this.authBtn.textContent = 'Connecting...';

      await this.oauthManager.authenticate(this.selectedProvider);

      this.showSuccess('Successfully connected!');
      this.checkAuthStatus();
    } catch (error) {
      this.showError(`Authentication failed: ${error.message}`);
    } finally {
      this.authBtn.disabled = false;
      this.authBtn.textContent = 'Connect Account';
    }
  }

  async checkAuthStatus() {

    const token = await this.oauthManager.getCachedToken(this.selectedProvider);
    const isValid = token && await this.oauthManager.isTokenValid(this.selectedProvider, token);

    if (isValid) {
      this.authStatus.textContent = '✓ Connected';
      this.authStatus.classList.add('connected');
      this.authBtn.textContent = 'Reconnect';
    } else {
      this.authStatus.textContent = 'Not authenticated';
      this.authStatus.classList.remove('connected');
      this.authBtn.textContent = 'Connect Account';
    }
  }

  showProgress() {
    this.progressSection.classList.remove('hidden');
  }

  hideProgress() {
    this.progressSection.classList.add('hidden');
    this.progressBar.style.width = '0%';
    this.progressText.textContent = 'Uploading: 0%';
  }

  updateProgress(progress, current, total, fileName) {
    this.progressBar.style.width = `${progress}%`;
    if (current && total) {
      this.progressText.textContent = `Uploading ${current}/${total}: ${fileName} (${Math.round(progress)}%)`;
    } else {
      this.progressText.textContent = `Uploading: ${Math.round(progress)}%`;
    }
  }

  showStatus() {
    this.statusSection.classList.remove('hidden');
  }

  hideStatus() {
    this.statusSection.classList.add('hidden');
    this.statusMessage.innerHTML = '';
  }

  // showResults(results) {
  //   this.showStatus();
  //   this.statusMessage.innerHTML = '';

  //   const successCount = results.filter(r => r.status === 'success').length;
  //   const failCount = results.filter(r => r.status === 'error').length;

  //   const summary = document.createElement('div');
  //   summary.className = 'status-summary success';
  //   summary.textContent = `Uploaded ${successCount} of ${results.length} files successfully`;
  //   this.statusMessage.appendChild(summary);

  //   if (failCount > 0) {
  //     const failedList = document.createElement('div');
  //     failedList.className = 'failed-list';
  //     failedList.innerHTML = '<p><strong>Failed uploads:</strong></p>';

  //     results.filter(r => r.status === 'error').forEach(result => {
  //       const item = document.createElement('p');
  //       item.className = 'error-item';
  //       item.textContent = `${result.file}: ${result.error}`;
  //       failedList.appendChild(item);
  //     });

  //     this.statusMessage.appendChild(failedList);
  //   }
  // }

  showSuccess(message) {
    this.showStatus();
    this.statusMessage.innerHTML = `<div class="status-summary success">${message}</div>`;
  }

  showError(message) {
    this.showStatus();
    this.statusMessage.innerHTML = `<div class="status-summary error">Error: ${message}</div>`;
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}


// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});