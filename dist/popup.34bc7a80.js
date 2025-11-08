// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"8P8AJ":[function(require,module,exports,__globalThis) {
// Popup Script - Handles UI interactions
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _oauthManagerJs = require("../lib/oauth-manager.js");
var _oauthManagerJsDefault = parcelHelpers.interopDefault(_oauthManagerJs);
class PopupController {
    constructor(){
        this.oauthManager = new (0, _oauthManagerJsDefault.default)();
        this.selectedFiles = [];
        this.isUploading = false;
        this.loadSelectedProvider().then(()=>{
            console.log('selectedProvider loaded:', this.selectedProvider);
            this.checkAuthStatus(); // call after loading provider
        });
        this.initializeElements();
        this.attachEventListeners();
        this.checkAuthStatus();
    }
    getStorage(key) {
        return new Promise((resolve)=>{
            chrome.storage.local.get(key, (result)=>resolve(result[key]));
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
        this.providerSelect.addEventListener('change', (e)=>{
            console.log("selectedProvider, value", this.selectedProvider, e.target.value);
            this.selectedProvider = e.target.value;
            chrome.storage.local.set({
                selectedProvider: e.target.value
            });
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
        console.log("in addListensers");
        this.savePdfBtn.addEventListener('click', ()=>this.savePageAsPdf());
        this.saveDocxBtn.addEventListener('click', ()=>this.savePageAsDocx());
        // this.clearBtn.addEventListener('click', () => this.clearFiles());
        this.authBtn.addEventListener('click', ()=>this.handleAuth());
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
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs)=>{
            if (tabs[0]?.id) // console.log("in the tab section")
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'savePageAsPdf'
            }, (response)=>{
                console.log('Response from content script:', response);
            });
        });
    }
    async savePageAsDocx() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs)=>{
            if (tabs[0]?.id) // console.log("in the tab section")
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'savePageAsDocx'
            }, (response)=>{
                console.log('Response from content script:', response);
            });
        });
    }
    async handleAuth() {
        console.log("in the handleAuth");
        try {
            this.authBtn.disabled = true;
            this.authBtn.textContent = 'Connecting...';
            await this.oauthManager.authenticate(this.selectedProvider);
            this.showSuccess('Successfully connected!');
            this.checkAuthStatus();
        } catch (error) {
            this.showError(`Authentication failed: ${error.message}`);
        } finally{
            this.authBtn.disabled = false;
            this.authBtn.textContent = 'Connect Account';
        }
    }
    async checkAuthStatus() {
        const token = await this.oauthManager.getCachedToken(this.selectedProvider);
        const isValid = token && await this.oauthManager.isTokenValid(this.selectedProvider, token);
        if (isValid) {
            this.authStatus.textContent = "\u2713 Connected";
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
        if (current && total) this.progressText.textContent = `Uploading ${current}/${total}: ${fileName} (${Math.round(progress)}%)`;
        else this.progressText.textContent = `Uploading: ${Math.round(progress)}%`;
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
        const sizes = [
            'Bytes',
            'KB',
            'MB',
            'GB'
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
}
// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', ()=>{
    new PopupController();
});

},{"../lib/oauth-manager.js":"2RD2p","@parcel/transformer-js/src/esmodule-helpers.js":"hR5Gi"}],"2RD2p":[function(require,module,exports,__globalThis) {
// OAuth Manager - Handles authentication for multiple cloud providers
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class OAuthManager {
    constructor(){
        this.providers = {
            googleDrive: {
                authUrl: 'https://accounts.google.com/o/oauth2/auth',
                tokenUrl: 'https://oauth2.googleapis.com/token',
                clientId: '310060055305-q9mujdglrh92qk7i6ccf7a5j72ft4op8.apps.googleusercontent.com',
                scopes: [
                    'https://www.googleapis.com/auth/drive.file'
                ],
                redirectUri: chrome.identity.getRedirectURL()
            },
            onedrive: {
                authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
                tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
                clientId: 'f8590984-b525-488a-91de-8bb83be0ee37',
                scopes: [
                    'Files.ReadWrite',
                    'offline_access'
                ],
                redirectUri: chrome.identity.getRedirectURL()
            },
            dropbox: {
                authUrl: 'https://www.dropbox.com/oauth2/authorize',
                clientId: 'w9b0keymjj9m0cw',
                clientSecret: "z31vilx0gua54vc",
                scopes: [
                    'files.content.write'
                ],
                redirectUri: chrome.identity.getRedirectURL()
            }
        };
        console.log(chrome.identity.getRedirectURL());
    }
    /**
   * Authenticate with a cloud provider
   * @param {string} provider - Provider name (googleDrive, onedrive, dropbox)
   * @returns {Promise<string>} Access token
   */ async authenticate(provider) {
        try {
            const config = this.providers[provider];
            if (!config) throw new Error(`Unknown provider: ${provider}`);
            // Check if we have a cached token
            const cachedToken = await this.getCachedToken(provider);
            if (cachedToken && await this.isTokenValid(provider, cachedToken)) {
                console.log(`Using cached token for ${provider}`);
                return cachedToken;
            }
            // Get new token
            const token = await this.getNewToken(provider, config);
            // Cache the token
            await this.cacheToken(provider, token);
            return token;
        } catch (error) {
            console.error(`Authentication error for ${provider}:`, error);
            throw error;
        }
    }
    /**
   * Get a new access token via OAuth flow
   */ async getNewToken(provider, config) {
        const authUrl = this.buildAuthUrl(provider, config);
        return new Promise((resolve, reject)=>{
            chrome.identity.launchWebAuthFlow({
                url: authUrl,
                interactive: true
            }, (redirectUrl)=>{
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError.message));
                    return;
                }
                try {
                    const token = this.extractToken(redirectUrl, provider);
                    resolve(token);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    /**
   * Build OAuth authorization URL
   */ buildAuthUrl(provider, config) {
        const params = new URLSearchParams({
            client_id: config.clientId,
            redirect_uri: config.redirectUri,
            response_type: 'token',
            scope: config.scopes.join(' ')
        });
        // OneDrive uses different parameter names
        if (provider === 'onedrive') params.set('response_mode', 'fragment');
        // Dropbox doesn't use scope parameter the same way
        if (provider === 'dropbox') {
            params.set('token_access_type', 'offline');
            params.set('client_secret', config.clientSecret);
            params.set('response_type', 'code');
        }
        return `${config.authUrl}?${params.toString()}`;
    }
    /**
   * Extract access token from redirect URL
   */ extractToken(redirectUrl, provider) {
        if (!redirectUrl) throw new Error('No redirect URL received');
        // Parse the URL fragment for the access token
        const url = new URL(redirectUrl);
        console.log("Got url", url);
        const params = new URLSearchParams(url.hash.substring(1));
        var accessToken;
        // for dropbox it uses code instead of access_token
        if (provider == 'dropbox') {
            const code = url.searchParams.get("code");
            accessToken = this.getDropboxAccessToken(code);
            console.log("Token/code", accessToken);
            if (!accessToken) throw new Error('No access token in redirect URL');
        } else {
            accessToken = params.get('access_token');
            if (!accessToken) throw new Error('No access token in redirect URL');
        }
        // const accessToken = params.get('access_token');
        // if (!accessToken) {
        //   throw new Error('No access token in redirect URL');
        // }
        return accessToken;
    }
    /**
   * Cache token in Chrome storage
   */ async cacheToken(provider, token) {
        const key = `token_${provider}`;
        const data = {
            token: token,
            timestamp: Date.now()
        };
        return new Promise((resolve)=>{
            chrome.storage.local.set({
                [key]: data
            }, resolve);
        });
    }
    /**
   * Get cached token from Chrome storage
   */ async getCachedToken(provider) {
        const key = `token_${provider}`;
        return new Promise((resolve)=>{
            chrome.storage.local.get([
                key
            ], (result)=>{
                if (result[key]) resolve(result[key].token);
                else resolve(null);
            });
        });
    }
    /**
   * Check if token is still valid (basic time-based check)
   */ async isTokenValid(provider, token) {
        const key = `token_${provider}`;
        return new Promise((resolve)=>{
            chrome.storage.local.get([
                key
            ], (result)=>{
                if (!result[key]) {
                    resolve(false);
                    return;
                }
                // Consider token valid for 50 minutes (most tokens last 60 minutes)
                const maxAge = 3000000;
                const age = Date.now() - result[key].timestamp;
                resolve(age < maxAge);
            });
        });
    }
    /**
   * Remove cached token (logout)
   */ async logout(provider) {
        const key = `token_${provider}`;
        return new Promise((resolve)=>{
            chrome.storage.local.remove([
                key
            ], resolve);
        });
    }
    /**
   * Remove all cached tokens
   */ async logoutAll() {
        const keys = Object.keys(this.providers).map((p)=>`token_${p}`);
        return new Promise((resolve)=>{
            chrome.storage.local.remove(keys, resolve);
        });
    }
    async getDropboxAccessToken(code) {
        const params = new URLSearchParams();
        params.append('code', code);
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.providers.dropbox.clientId);
        params.append('client_secret', this.providers.dropbox.clientSecret);
        params.append('redirect_uri', this.providers.onedrive.redirectUri);
        const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
        if (!response.ok) throw new Error('Failed tom exchange code for token: ' + await response.text());
        const data = await response.json();
        return data.access_token;
    }
}
// Export for use in other modules
exports.default = OAuthManager;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"hR5Gi"}],"hR5Gi":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["8P8AJ"], "8P8AJ", "parcelRequire6043", {})

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXlDOztBQUN6Qzs7QUFFQSxNQUFNO0lBQ0osYUFBYztRQUNaLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBLEdBQUEsOEJBQVksQUFBRDtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUU7UUFHdkIsSUFBSSxDQUFDLFdBQVcsR0FBRztRQUVuQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBQy9CLFFBQVEsR0FBRyxDQUFDLDRCQUE0QixJQUFJLENBQUMsZ0JBQWdCO1lBQzdELElBQUksQ0FBQyxlQUFlLElBQUssOEJBQThCO1FBQ3pEO1FBR0EsSUFBSSxDQUFDLGtCQUFrQjtRQUN2QixJQUFJLENBQUMsb0JBQW9CO1FBQ3pCLElBQUksQ0FBQyxlQUFlO0lBQ3RCO0lBRUEsV0FBVyxHQUFHLEVBQUU7UUFDZCxPQUFPLElBQUksUUFBUSxDQUFDO1lBQ2xCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVcsUUFBUSxNQUFNLENBQUMsSUFBSTtRQUMvRDtJQUNGO0lBRUEsTUFBTSx1QkFBdUI7UUFDM0IsTUFBTSxXQUFXLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN2QyxTQUFTLGNBQWMsQ0FBQyxtQkFBbUIsS0FBSyxHQUFHO1FBQ25ELElBQUksQ0FBQyxnQkFBZ0IsR0FBRztJQUMxQjtJQUlBLHFCQUFxQjtRQUNuQixjQUFjO1FBQ2QsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLGNBQWMsQ0FBQztRQUM5QywwREFBMEQ7UUFDMUQsd0RBQXdEO1FBQ3hELHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsY0FBYyxDQUFDO1FBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxjQUFjLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLGNBQWMsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsY0FBYyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxjQUFjLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLGNBQWMsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsY0FBYyxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxjQUFjLENBQUM7UUFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLGNBQWMsQ0FBQztRQUM3QyxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsY0FBYyxDQUFDO0lBQy9DO0lBRUEsdUJBQXVCO1FBQ3JCLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztZQUM5QyxRQUFRLEdBQUcsQ0FBQywyQkFBMkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDNUUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDdEMsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxrQkFBa0IsRUFBRSxNQUFNLENBQUMsS0FBSztZQUFDO1lBQzVELElBQUksQ0FBQyxlQUFlO1FBQ3RCO1FBRUEsZ0JBQWdCO1FBQ2hCLHFEQUFxRDtRQUNyRCw4Q0FBOEM7UUFDOUMsTUFBTTtRQUVOLG1CQUFtQjtRQUNuQixzREFBc0Q7UUFDdEQsd0JBQXdCO1FBQ3hCLDhDQUE4QztRQUM5QyxNQUFNO1FBRU4sc0RBQXNEO1FBQ3RELGlEQUFpRDtRQUNqRCxNQUFNO1FBRU4sa0RBQWtEO1FBQ2xELHdCQUF3QjtRQUN4QixpREFBaUQ7UUFDakQsb0RBQW9EO1FBQ3BELE1BQU07UUFFTixhQUFhO1FBQ2IsUUFBUSxHQUFHLENBQUM7UUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsSUFBTSxJQUFJLENBQUMsYUFBYTtRQUNsRSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsSUFBTSxJQUFJLENBQUMsY0FBYztRQUNwRSxvRUFBb0U7UUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLElBQU0sSUFBSSxDQUFDLFVBQVU7SUFDOUQ7SUFFQSwrQkFBK0I7SUFDL0Isa0NBQWtDO0lBQ2xDLDhCQUE4QjtJQUM5QixxQ0FBcUM7SUFDckMsTUFBTTtJQUVOLDJCQUEyQjtJQUMzQiwwQkFBMEI7SUFDMUIsSUFBSTtJQUVKLHFCQUFxQjtJQUNyQixrQ0FBa0M7SUFFbEMsMkNBQTJDO0lBQzNDLDZFQUE2RTtJQUM3RSxjQUFjO0lBQ2QsTUFBTTtJQUVOLGtEQUFrRDtJQUNsRCxzREFBc0Q7SUFDdEQsd0NBQXdDO0lBRXhDLHNEQUFzRDtJQUN0RCx3Q0FBd0M7SUFFeEMsdURBQXVEO0lBQ3ZELHdDQUF3QztJQUN4Qyx3Q0FBd0M7SUFFeEMsdURBQXVEO0lBQ3ZELHdDQUF3QztJQUN4Qyw2REFBNkQ7SUFFN0Qsc0NBQXNDO0lBQ3RDLHNDQUFzQztJQUV0QywwREFBMEQ7SUFDMUQsMENBQTBDO0lBQzFDLG1DQUFtQztJQUNuQyx3REFBd0Q7SUFFeEQsc0NBQXNDO0lBQ3RDLHVDQUF1QztJQUN2QywyQ0FBMkM7SUFDM0MsUUFBUTtJQUNSLElBQUk7SUFFSixzQkFBc0I7SUFDdEIseUNBQXlDO0lBQ3pDLDJCQUEyQjtJQUMzQiwwQkFBMEI7SUFDMUIsSUFBSTtJQUVKLGlCQUFpQjtJQUNqQiw2QkFBNkI7SUFDN0IsK0JBQStCO0lBQy9CLDJCQUEyQjtJQUMzQiwwQkFBMEI7SUFDMUIseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2QixJQUFJO0lBRUosb0JBQW9CO0lBQ3BCLG9EQUFvRDtJQUNwRCw2REFBNkQ7SUFDN0QsNERBQTREO0lBQzVELElBQUk7SUFFSix5QkFBeUI7SUFDekIscUVBQXFFO0lBRXJFLDZCQUE2QjtJQUM3QiwwQkFBMEI7SUFDMUIseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUV2QixVQUFVO0lBQ1YseUVBQXlFO0lBQ3pFLGlFQUFpRTtJQUNqRSxTQUFTO0lBRVQsb0VBQW9FO0lBQ3BFLDRCQUE0QjtJQUM1QiwrQkFBK0I7SUFDL0IseUJBQXlCO0lBQ3pCLFNBQVM7SUFFVCxpQ0FBaUM7SUFDakMseUJBQXlCO0lBQ3pCLHNCQUFzQjtJQUN0QixxQ0FBcUM7SUFDckMsZ0JBQWdCO0lBQ2hCLGdDQUFnQztJQUNoQyw0QkFBNEI7SUFDNUIsMkJBQTJCO0lBQzNCLE1BQU07SUFDTixJQUFJO0lBRUosTUFBTSxnQkFBZ0I7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQUMsUUFBUTtZQUFNLGVBQWU7UUFBSSxHQUFHLENBQUM7WUFDdkQsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQ1gsb0NBQW9DO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFBRSxRQUFRO1lBQWdCLEdBQUcsQ0FBQTtnQkFDL0QsUUFBUSxHQUFHLENBQUMsaUNBQWlDO1lBQy9DO1FBRUo7SUFDRjtJQUVBLE1BQU0saUJBQWlCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFDLFFBQVE7WUFBTSxlQUFlO1FBQUksR0FBRyxDQUFDO1lBQ3RELElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUNYLG9DQUFvQztZQUNwQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQUUsUUFBUTtZQUFpQixHQUFHLENBQUE7Z0JBQ2hFLFFBQVEsR0FBRyxDQUFDLGlDQUFpQztZQUMvQztRQUVKO0lBQ0Y7SUFFQSxNQUFNLGFBQWE7UUFDakIsUUFBUSxHQUFHLENBQUM7UUFDWixJQUFJO1lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUc7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUc7WUFFM0IsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO1lBRTFELElBQUksQ0FBQyxXQUFXLENBQUM7WUFDakIsSUFBSSxDQUFDLGVBQWU7UUFDdEIsRUFBRSxPQUFPLE9BQU87WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxPQUFPLEVBQUU7UUFDMUQsU0FBVTtZQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHO1FBQzdCO0lBQ0Y7SUFFQSxNQUFNLGtCQUFrQjtRQUV0QixNQUFNLFFBQVEsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO1FBQzFFLE1BQU0sVUFBVSxTQUFTLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1FBRXJGLElBQUksU0FBUztZQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRztRQUM3QixPQUFPO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUc7WUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHO1FBQzdCO0lBQ0Y7SUFFQSxlQUFlO1FBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ3hDO0lBRUEsZUFBZTtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUc7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUc7SUFDbEM7SUFFQSxlQUFlLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUM3QyxJQUFJLFdBQVcsT0FDYixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxLQUFLLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUV2RyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV6RTtJQUVBLGFBQWE7UUFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDdEM7SUFFQSxhQUFhO1FBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHO0lBQ2pDO0lBRUEseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2Qix1Q0FBdUM7SUFFdkMsNkVBQTZFO0lBQzdFLHdFQUF3RTtJQUV4RSxtREFBbUQ7SUFDbkQsa0RBQWtEO0lBQ2xELDhGQUE4RjtJQUM5Riw2Q0FBNkM7SUFFN0MseUJBQXlCO0lBQ3pCLHdEQUF3RDtJQUN4RCw0Q0FBNEM7SUFDNUMsd0VBQXdFO0lBRXhFLG9FQUFvRTtJQUNwRSxrREFBa0Q7SUFDbEQsdUNBQXVDO0lBQ3ZDLDhEQUE4RDtJQUM5RCxzQ0FBc0M7SUFDdEMsVUFBVTtJQUVWLGtEQUFrRDtJQUNsRCxNQUFNO0lBQ04sSUFBSTtJQUVKLFlBQVksT0FBTyxFQUFFO1FBQ25CLElBQUksQ0FBQyxVQUFVO1FBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxRQUFRLE1BQU0sQ0FBQztJQUN2RjtJQUVBLFVBQVUsT0FBTyxFQUFFO1FBQ2pCLElBQUksQ0FBQyxVQUFVO1FBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyx5Q0FBeUMsRUFBRSxRQUFRLE1BQU0sQ0FBQztJQUM1RjtJQUVBLGVBQWUsS0FBSyxFQUFFO1FBQ3BCLElBQUksVUFBVSxHQUFHLE9BQU87UUFDeEIsTUFBTSxJQUFJO1FBQ1YsTUFBTSxRQUFRO1lBQUM7WUFBUztZQUFNO1lBQU07U0FBSztRQUN6QyxNQUFNLElBQUksS0FBSyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQztRQUNoRCxPQUFPLEtBQUssS0FBSyxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLE9BQU8sTUFBTSxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQ3hFO0FBQ0Y7QUFHQSwrQkFBK0I7QUFDL0IsU0FBUyxnQkFBZ0IsQ0FBQyxvQkFBb0I7SUFDNUMsSUFBSTtBQUNOOzs7QUN0VUEsc0VBQXNFOzs7QUFDdEUsTUFBTTtJQUNKLGFBQWM7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2YsYUFBYTtnQkFDWCxTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsVUFBVTtnQkFDVixRQUFRO29CQUFDO2lCQUE2QztnQkFDdEQsYUFBYSxPQUFPLFFBQVEsQ0FBQyxjQUFjO1lBQzdDO1lBQ0EsVUFBVTtnQkFDUixTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsVUFBVTtnQkFDVixRQUFRO29CQUFDO29CQUFtQjtpQkFBaUI7Z0JBQzdDLGFBQWEsT0FBTyxRQUFRLENBQUMsY0FBYztZQUM3QztZQUNBLFNBQVM7Z0JBQ1AsU0FBUztnQkFDVCxVQUFVO2dCQUNWLGNBQWM7Z0JBQ2QsUUFBUTtvQkFBQztpQkFBc0I7Z0JBQy9CLGFBQWEsT0FBTyxRQUFRLENBQUMsY0FBYztZQUM3QztRQUNGO1FBQ0EsUUFBUSxHQUFHLENBQUMsT0FBTyxRQUFRLENBQUMsY0FBYztJQUM1QztJQUVBOzs7O0dBSUMsR0FDRCxNQUFNLGFBQWEsUUFBUSxFQUFFO1FBQzNCLElBQUk7WUFDRixNQUFNLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTO1lBQ3ZDLElBQUksQ0FBQyxRQUNILE1BQU0sSUFBSSxNQUFNLENBQUMsa0JBQWtCLEVBQUUsVUFBVTtZQUdqRCxrQ0FBa0M7WUFDbEMsTUFBTSxjQUFjLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUM5QyxJQUFJLGVBQWUsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsY0FBYztnQkFDakUsUUFBUSxHQUFHLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxVQUFVO2dCQUNoRCxPQUFPO1lBQ1Q7WUFFQSxnQkFBZ0I7WUFDaEIsTUFBTSxRQUFRLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVO1lBRS9DLGtCQUFrQjtZQUNsQixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVTtZQUVoQyxPQUFPO1FBQ1QsRUFBRSxPQUFPLE9BQU87WUFDZCxRQUFRLEtBQUssQ0FBQyxDQUFDLHlCQUF5QixFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUU7WUFDdkQsTUFBTTtRQUNSO0lBQ0Y7SUFLQTs7R0FFQyxHQUNELE1BQU0sWUFBWSxRQUFRLEVBQUUsTUFBTSxFQUFFO1FBQ2xDLE1BQU0sVUFBVSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7UUFFNUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTO1lBQzNCLE9BQU8sUUFBUSxDQUFDLGlCQUFpQixDQUMvQjtnQkFDRSxLQUFLO2dCQUNMLGFBQWE7WUFDZixHQUNBLENBQUM7Z0JBQ0MsSUFBSSxPQUFPLE9BQU8sQ0FBQyxTQUFTLEVBQUU7b0JBQzVCLE9BQU8sSUFBSSxNQUFNLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPO29CQUNqRDtnQkFDRjtnQkFFQSxJQUFJO29CQUNGLE1BQU0sUUFBUSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWE7b0JBQzdDLFFBQVE7Z0JBQ1YsRUFBRSxPQUFPLE9BQU87b0JBQ2QsT0FBTztnQkFDVDtZQUNGO1FBRUo7SUFDRjtJQUVBOztHQUVDLEdBQ0QsYUFBYSxRQUFRLEVBQUUsTUFBTSxFQUFFO1FBQzdCLE1BQU0sU0FBUyxJQUFJLGdCQUFnQjtZQUNqQyxXQUFXLE9BQU8sUUFBUTtZQUMxQixjQUFjLE9BQU8sV0FBVztZQUNoQyxlQUFlO1lBQ2YsT0FBTyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDNUI7UUFFQSwwQ0FBMEM7UUFDMUMsSUFBSSxhQUFhLFlBQ2YsT0FBTyxHQUFHLENBQUMsaUJBQWlCO1FBRzlCLG1EQUFtRDtRQUNuRCxJQUFJLGFBQWEsV0FBVztZQUMxQixPQUFPLEdBQUcsQ0FBQyxxQkFBcUI7WUFDaEMsT0FBTyxHQUFHLENBQUMsaUJBQWlCLE9BQU8sWUFBWTtZQUMvQyxPQUFPLEdBQUcsQ0FBQyxpQkFBZ0I7UUFDN0I7UUFFQSxPQUFPLEdBQUcsT0FBTyxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sUUFBUSxJQUFJO0lBQ2pEO0lBRUE7O0dBRUMsR0FDRCxhQUFhLFdBQVcsRUFBRSxRQUFRLEVBQUU7UUFDbEMsSUFBSSxDQUFDLGFBQ0gsTUFBTSxJQUFJLE1BQU07UUFHbEIsOENBQThDO1FBQzlDLE1BQU0sTUFBTSxJQUFJLElBQUk7UUFDcEIsUUFBUSxHQUFHLENBQUMsV0FBVztRQUN2QixNQUFNLFNBQVMsSUFBSSxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRXRELElBQUk7UUFFSixtREFBbUQ7UUFDbkQsSUFBSSxZQUFZLFdBQVU7WUFDeEIsTUFBTSxPQUFPLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQztZQUNsQyxjQUFjLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztZQUN6QyxRQUFRLEdBQUcsQ0FBQyxjQUFjO1lBQzFCLElBQUksQ0FBQyxhQUNMLE1BQU0sSUFBSSxNQUFNO1FBRWxCLE9BRUk7WUFDSixjQUFjLE9BQU8sR0FBRyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUNILE1BQU0sSUFBSSxNQUFNO1FBRWxCO1FBRUEsa0RBQWtEO1FBQ2xELHNCQUFzQjtRQUN0Qix3REFBd0Q7UUFDeEQsSUFBSTtRQUVKLE9BQU87SUFDVDtJQUVBOztHQUVDLEdBQ0QsTUFBTSxXQUFXLFFBQVEsRUFBRSxLQUFLLEVBQUU7UUFDaEMsTUFBTSxNQUFNLENBQUMsTUFBTSxFQUFFLFVBQVU7UUFDL0IsTUFBTSxPQUFPO1lBQ1gsT0FBTztZQUNQLFdBQVcsS0FBSyxHQUFHO1FBQ3JCO1FBRUEsT0FBTyxJQUFJLFFBQVEsQ0FBQztZQUNsQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUFFLENBQUMsSUFBSSxFQUFFO1lBQUssR0FBRztRQUM1QztJQUNGO0lBRUE7O0dBRUMsR0FDRCxNQUFNLGVBQWUsUUFBUSxFQUFFO1FBQzdCLE1BQU0sTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFVO1FBRS9CLE9BQU8sSUFBSSxRQUFRLENBQUM7WUFDbEIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFBQzthQUFJLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUNiLFFBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLO3FCQUV6QixRQUFRO1lBRVo7UUFDRjtJQUNGO0lBRUE7O0dBRUMsR0FDRCxNQUFNLGFBQWEsUUFBUSxFQUFFLEtBQUssRUFBRTtRQUNsQyxNQUFNLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVTtRQUUvQixPQUFPLElBQUksUUFBUSxDQUFDO1lBQ2xCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQUM7YUFBSSxFQUFFLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO29CQUNoQixRQUFRO29CQUNSO2dCQUNGO2dCQUVBLG9FQUFvRTtnQkFDcEUsTUFBTSxTQUFTO2dCQUNmLE1BQU0sTUFBTSxLQUFLLEdBQUcsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7Z0JBQzlDLFFBQVEsTUFBTTtZQUNoQjtRQUNGO0lBQ0Y7SUFFQTs7R0FFQyxHQUNELE1BQU0sT0FBTyxRQUFRLEVBQUU7UUFDckIsTUFBTSxNQUFNLENBQUMsTUFBTSxFQUFFLFVBQVU7UUFDL0IsT0FBTyxJQUFJLFFBQVEsQ0FBQztZQUNsQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUFDO2FBQUksRUFBRTtRQUNyQztJQUNGO0lBRUE7O0dBRUMsR0FDRCxNQUFNLFlBQVk7UUFDaEIsTUFBTSxPQUFPLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUEsSUFBSyxDQUFDLE1BQU0sRUFBRSxHQUFHO1FBQzlELE9BQU8sSUFBSSxRQUFRLENBQUM7WUFDbEIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNO1FBQ3BDO0lBQ0Y7SUFDQSxNQUFNLHNCQUFzQixJQUFJLEVBQUM7UUFDL0IsTUFBTSxTQUFTLElBQUk7UUFDbkIsT0FBTyxNQUFNLENBQUMsUUFBUTtRQUN0QixPQUFPLE1BQU0sQ0FBQyxjQUFhO1FBQzNCLE9BQU8sTUFBTSxDQUFDLGFBQVksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUTtRQUN6RCxPQUFPLE1BQU0sQ0FBQyxpQkFBZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWTtRQUNqRSxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVztRQUVqRSxNQUFNLFdBQVcsTUFBTSxNQUFNLDJDQUEyQztZQUN0RSxRQUFRO1lBQ1IsU0FBUztnQkFBQyxnQkFBZTtZQUFtQztZQUM1RCxNQUFNO1FBQ1I7UUFDQSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQ2QsTUFBTSxJQUFJLE1BQU0seUNBQXdDLE1BQU0sU0FBUyxJQUFJO1FBRzdFLE1BQU0sT0FBTyxNQUFNLFNBQVMsSUFBSTtRQUNoQyxPQUFPLEtBQUssWUFBWTtJQUMxQjtBQUVGO0FBRUEsa0NBQWtDO2tCQUNuQjs7O0FDL1BmLFFBQVEsY0FBYyxHQUFHLFNBQVUsQ0FBQztJQUNsQyxPQUFPLEtBQUssRUFBRSxVQUFVLEdBQUcsSUFBSTtRQUFDLFNBQVM7SUFBQztBQUM1QztBQUVBLFFBQVEsaUJBQWlCLEdBQUcsU0FBVSxDQUFDO0lBQ3JDLE9BQU8sY0FBYyxDQUFDLEdBQUcsY0FBYztRQUFDLE9BQU87SUFBSTtBQUNyRDtBQUVBLFFBQVEsU0FBUyxHQUFHLFNBQVUsTUFBTSxFQUFFLElBQUk7SUFDeEMsT0FBTyxJQUFJLENBQUMsUUFBUSxPQUFPLENBQUMsU0FBVSxHQUFHO1FBQ3ZDLElBQ0UsUUFBUSxhQUNSLFFBQVEsZ0JBQ1IsT0FBTyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLE1BRTNDO1FBR0YsT0FBTyxjQUFjLENBQUMsTUFBTSxLQUFLO1lBQy9CLFlBQVk7WUFDWixLQUFLO2dCQUNILE9BQU8sTUFBTSxDQUFDLElBQUk7WUFDcEI7UUFDRjtJQUNGO0lBRUEsT0FBTztBQUNUO0FBRUEsUUFBUSxNQUFNLEdBQUcsU0FBVSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUc7SUFDNUMsT0FBTyxjQUFjLENBQUMsTUFBTSxVQUFVO1FBQ3BDLFlBQVk7UUFDWixLQUFLO0lBQ1A7QUFDRiIsInNvdXJjZXMiOlsic3JjL3BvcHVwL3BvcHVwLmpzIiwic3JjL2xpYi9vYXV0aC1tYW5hZ2VyLmpzIiwibm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUG9wdXAgU2NyaXB0IC0gSGFuZGxlcyBVSSBpbnRlcmFjdGlvbnNcbmltcG9ydCBPYXV0aE1hbmFnZXIgZnJvbSAnLi4vbGliL29hdXRoLW1hbmFnZXIuanMnO1xuXG5jbGFzcyBQb3B1cENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9hdXRoTWFuYWdlciA9IG5ldyBPYXV0aE1hbmFnZXIoKTtcbiAgICB0aGlzLnNlbGVjdGVkRmlsZXMgPSBbXTtcbiAgXG4gICBcbiAgICB0aGlzLmlzVXBsb2FkaW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLmxvYWRTZWxlY3RlZFByb3ZpZGVyKCkudGhlbigoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc2VsZWN0ZWRQcm92aWRlciBsb2FkZWQ6JywgdGhpcy5zZWxlY3RlZFByb3ZpZGVyKTtcbiAgICAgIHRoaXMuY2hlY2tBdXRoU3RhdHVzKCk7ICAvLyBjYWxsIGFmdGVyIGxvYWRpbmcgcHJvdmlkZXJcbiAgICB9KTtcblxuXG4gICAgdGhpcy5pbml0aWFsaXplRWxlbWVudHMoKTtcbiAgICB0aGlzLmF0dGFjaEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5jaGVja0F1dGhTdGF0dXMoKTtcbiAgfVxuXG4gIGdldFN0b3JhZ2Uoa2V5KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoa2V5LCAocmVzdWx0KSA9PiByZXNvbHZlKHJlc3VsdFtrZXldKSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBsb2FkU2VsZWN0ZWRQcm92aWRlcigpIHtcbiAgICBjb25zdCBwcm92aWRlciA9IGF3YWl0IHRoaXMuZ2V0U3RvcmFnZSgnc2VsZWN0ZWRQcm92aWRlcicpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm92aWRlci1zZWxlY3QnKS52YWx1ZSA9IHByb3ZpZGVyO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm92aWRlciA9IHByb3ZpZGVyO1xuICB9XG5cblxuXG4gIGluaXRpYWxpemVFbGVtZW50cygpIHtcbiAgICAvLyBVSSBFbGVtZW50c1xuICAgIHRoaXMucHJvdmlkZXJTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvdmlkZXItc2VsZWN0Jyk7XG4gICAgLy8gdGhpcy5maWxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZS1pbnB1dCcpO1xuICAgIC8vIHRoaXMuZHJvcFpvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvcC16b25lJyk7XG4gICAgLy8gdGhpcy5maWxlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlLWxpc3QnKTtcbiAgICB0aGlzLnNhdmVQZGZCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZS1wZGYtYnRuJyk7XG4gICAgdGhpcy5zYXZlRG9jeEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlLWRvY3gtYnRuJyk7XG4gICAgdGhpcy5jbGVhckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGVhci1idG4nKTtcbiAgICB0aGlzLmF1dGhCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aC1idG4nKTtcbiAgICB0aGlzLmF1dGhTdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aC1zdGF0dXMnKTtcbiAgICB0aGlzLnByb2dyZXNzU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcy1zZWN0aW9uJyk7XG4gICAgdGhpcy5wcm9ncmVzc0JhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcy1iYXInKTtcbiAgICB0aGlzLnByb2dyZXNzVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcy10ZXh0Jyk7XG4gICAgdGhpcy5zdGF0dXNTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXR1cy1zZWN0aW9uJyk7XG4gICAgdGhpcy5zdGF0dXNNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXR1cy1tZXNzYWdlJyk7XG4gIH1cblxuICBhdHRhY2hFdmVudExpc3RlbmVycygpIHtcbiAgICAvLyBQcm92aWRlciBzZWxlY3Rpb25cbiAgICB0aGlzLnByb3ZpZGVyU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkUHJvdmlkZXIsIHZhbHVlXCIsIHRoaXMuc2VsZWN0ZWRQcm92aWRlciwgZS50YXJnZXQudmFsdWUpXG4gICAgICB0aGlzLnNlbGVjdGVkUHJvdmlkZXIgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHNlbGVjdGVkUHJvdmlkZXI6IGUudGFyZ2V0LnZhbHVlIH0pXG4gICAgICB0aGlzLmNoZWNrQXV0aFN0YXR1cygpO1xuICAgIH0pO1xuXG4gICAgLy8gLy8gRmlsZSBpbnB1dFxuICAgIC8vIHRoaXMuZmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgLy8gICB0aGlzLmhhbmRsZUZpbGVTZWxlY3Rpb24oZS50YXJnZXQuZmlsZXMpO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gLy8gRHJhZyBhbmQgZHJvcFxuICAgIC8vIHRoaXMuZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xuICAgIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgdGhpcy5kcm9wWm9uZS5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKTtcbiAgICAvLyB9KTtcblxuICAgIC8vIHRoaXMuZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKCkgPT4ge1xuICAgIC8vICAgdGhpcy5kcm9wWm9uZS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKTtcbiAgICAvLyB9KTtcblxuICAgIC8vIHRoaXMuZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7XG4gICAgLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gICB0aGlzLmRyb3Bab25lLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpO1xuICAgIC8vICAgdGhpcy5oYW5kbGVGaWxlU2VsZWN0aW9uKGUuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAvLyB9KTtcblxuICAgIC8vIC8vIEJ1dHRvbnNcbiAgICBjb25zb2xlLmxvZyhcImluIGFkZExpc3RlbnNlcnNcIilcbiAgICB0aGlzLnNhdmVQZGZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNhdmVQYWdlQXNQZGYoKSk7XG4gICAgdGhpcy5zYXZlRG9jeEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2F2ZVBhZ2VBc0RvY3goKSlcbiAgICAvLyB0aGlzLmNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbGVhckZpbGVzKCkpO1xuICAgIHRoaXMuYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuaGFuZGxlQXV0aCgpKTtcbiAgfVxuXG4gIC8vIGhhbmRsZUZpbGVTZWxlY3Rpb24oZmlsZXMpIHtcbiAgLy8gICAvLyBBZGQgbmV3IGZpbGVzIHRvIHNlbGVjdGlvblxuICAvLyAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcbiAgLy8gICAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5wdXNoKGZpbGUpO1xuICAvLyAgIH1cblxuICAvLyAgIHRoaXMucmVuZGVyRmlsZUxpc3QoKTtcbiAgLy8gICB0aGlzLnVwZGF0ZUJ1dHRvbnMoKTtcbiAgLy8gfVxuXG4gIC8vIHJlbmRlckZpbGVMaXN0KCkge1xuICAvLyAgIHRoaXMuZmlsZUxpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgLy8gICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAvLyAgICAgdGhpcy5maWxlTGlzdC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJuby1maWxlc1wiPk5vIGZpbGVzIHNlbGVjdGVkPC9wPic7XG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuXG4gIC8vICAgdGhpcy5zZWxlY3RlZEZpbGVzLmZvckVhY2goKGZpbGUsIGluZGV4KSA9PiB7XG4gIC8vICAgICBjb25zdCBmaWxlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAvLyAgICAgZmlsZUl0ZW0uY2xhc3NOYW1lID0gJ2ZpbGUtaXRlbSc7XG5cbiAgLy8gICAgIGNvbnN0IGZpbGVJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIC8vICAgICBmaWxlSW5mby5jbGFzc05hbWUgPSAnZmlsZS1pbmZvJztcblxuICAvLyAgICAgY29uc3QgZmlsZU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIC8vICAgICBmaWxlTmFtZS5jbGFzc05hbWUgPSAnZmlsZS1uYW1lJztcbiAgLy8gICAgIGZpbGVOYW1lLnRleHRDb250ZW50ID0gZmlsZS5uYW1lO1xuXG4gIC8vICAgICBjb25zdCBmaWxlU2l6ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgLy8gICAgIGZpbGVTaXplLmNsYXNzTmFtZSA9ICdmaWxlLXNpemUnO1xuICAvLyAgICAgZmlsZVNpemUudGV4dENvbnRlbnQgPSB0aGlzLmZvcm1hdEZpbGVTaXplKGZpbGUuc2l6ZSk7XG5cbiAgLy8gICAgIGZpbGVJbmZvLmFwcGVuZENoaWxkKGZpbGVOYW1lKTtcbiAgLy8gICAgIGZpbGVJbmZvLmFwcGVuZENoaWxkKGZpbGVTaXplKTtcblxuICAvLyAgICAgY29uc3QgcmVtb3ZlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIC8vICAgICByZW1vdmVCdG4uY2xhc3NOYW1lID0gJ3JlbW92ZS1idG4nO1xuICAvLyAgICAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gJ8OXJztcbiAgLy8gICAgIHJlbW92ZUJ0bi5vbmNsaWNrID0gKCkgPT4gdGhpcy5yZW1vdmVGaWxlKGluZGV4KTtcblxuICAvLyAgICAgZmlsZUl0ZW0uYXBwZW5kQ2hpbGQoZmlsZUluZm8pO1xuICAvLyAgICAgZmlsZUl0ZW0uYXBwZW5kQ2hpbGQocmVtb3ZlQnRuKTtcbiAgLy8gICAgIHRoaXMuZmlsZUxpc3QuYXBwZW5kQ2hpbGQoZmlsZUl0ZW0pO1xuICAvLyAgIH0pO1xuICAvLyB9XG5cbiAgLy8gcmVtb3ZlRmlsZShpbmRleCkge1xuICAvLyAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAvLyAgIHRoaXMucmVuZGVyRmlsZUxpc3QoKTtcbiAgLy8gICB0aGlzLnVwZGF0ZUJ1dHRvbnMoKTtcbiAgLy8gfVxuXG4gIC8vIGNsZWFyRmlsZXMoKSB7XG4gIC8vICAgdGhpcy5zZWxlY3RlZEZpbGVzID0gW107XG4gIC8vICAgdGhpcy5maWxlSW5wdXQudmFsdWUgPSAnJztcbiAgLy8gICB0aGlzLnJlbmRlckZpbGVMaXN0KCk7XG4gIC8vICAgdGhpcy51cGRhdGVCdXR0b25zKCk7XG4gIC8vICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcbiAgLy8gICB0aGlzLmhpZGVTdGF0dXMoKTtcbiAgLy8gfVxuXG4gIC8vIHVwZGF0ZUJ1dHRvbnMoKSB7XG4gIC8vICAgY29uc3QgaGFzRmlsZXMgPSB0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoID4gMDtcbiAgLy8gICB0aGlzLnVwbG9hZEJ0bi5kaXNhYmxlZCA9ICFoYXNGaWxlcyB8fCB0aGlzLmlzVXBsb2FkaW5nO1xuICAvLyAgIHRoaXMuY2xlYXJCdG4uZGlzYWJsZWQgPSAhaGFzRmlsZXMgfHwgdGhpcy5pc1VwbG9hZGluZztcbiAgLy8gfVxuXG4gIC8vIGFzeW5jIGhhbmRsZVVwbG9hZCgpIHtcbiAgLy8gICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLmlzVXBsb2FkaW5nKSByZXR1cm47XG5cbiAgLy8gICB0aGlzLmlzVXBsb2FkaW5nID0gdHJ1ZTtcbiAgLy8gICB0aGlzLnVwZGF0ZUJ1dHRvbnMoKTtcbiAgLy8gICB0aGlzLnNob3dQcm9ncmVzcygpO1xuICAvLyAgIHRoaXMuaGlkZVN0YXR1cygpO1xuXG4gIC8vICAgdHJ5IHtcbiAgLy8gICAgIGNvbnN0IHByb2dyZXNzQ2FsbGJhY2sgPSAocHJvZ3Jlc3MsIGN1cnJlbnQsIHRvdGFsLCBmaWxlTmFtZSkgPT4ge1xuICAvLyAgICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzKHByb2dyZXNzLCBjdXJyZW50LCB0b3RhbCwgZmlsZU5hbWUpO1xuICAvLyAgICAgfTtcblxuICAvLyAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMudXBsb2FkTWFuYWdlci51cGxvYWRNdWx0aXBsZUZpbGVzKFxuICAvLyAgICAgICB0aGlzLnNlbGVjdGVkRmlsZXMsXG4gIC8vICAgICAgIHRoaXMuc2VsZWN0ZWRQcm92aWRlcixcbiAgLy8gICAgICAgcHJvZ3Jlc3NDYWxsYmFja1xuICAvLyAgICAgKTtcblxuICAvLyAgICAgdGhpcy5zaG93UmVzdWx0cyhyZXN1bHRzKTtcbiAgLy8gICAgIHRoaXMuY2xlYXJGaWxlcygpO1xuICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gIC8vICAgICB0aGlzLnNob3dFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgLy8gICB9IGZpbmFsbHkge1xuICAvLyAgICAgdGhpcy5pc1VwbG9hZGluZyA9IGZhbHNlO1xuICAvLyAgICAgdGhpcy51cGRhdGVCdXR0b25zKCk7XG4gIC8vICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGFzeW5jIHNhdmVQYWdlQXNQZGYoKSB7XG4gICAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCAodGFicykgPT4ge1xuICAgICAgaWYgKHRhYnNbMF0/LmlkKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW4gdGhlIHRhYiBzZWN0aW9uXCIpXG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHsgYWN0aW9uOiAnc2F2ZVBhZ2VBc1BkZicgfSwgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNwb25zZSBmcm9tIGNvbnRlbnQgc2NyaXB0OicsIHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgXG4gIGFzeW5jIHNhdmVQYWdlQXNEb2N4KCkge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCAodGFicykgPT4ge1xuICAgICAgaWYgKHRhYnNbMF0/LmlkKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW4gdGhlIHRhYiBzZWN0aW9uXCIpXG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHsgYWN0aW9uOiAnc2F2ZVBhZ2VBc0RvY3gnIH0sIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcG9uc2UgZnJvbSBjb250ZW50IHNjcmlwdDonLCByZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlQXV0aCgpIHtcbiAgICBjb25zb2xlLmxvZyhcImluIHRoZSBoYW5kbGVBdXRoXCIpXG4gICAgdHJ5IHtcblxuICAgICAgdGhpcy5hdXRoQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuYXV0aEJ0bi50ZXh0Q29udGVudCA9ICdDb25uZWN0aW5nLi4uJztcblxuICAgICAgYXdhaXQgdGhpcy5vYXV0aE1hbmFnZXIuYXV0aGVudGljYXRlKHRoaXMuc2VsZWN0ZWRQcm92aWRlcik7XG5cbiAgICAgIHRoaXMuc2hvd1N1Y2Nlc3MoJ1N1Y2Nlc3NmdWxseSBjb25uZWN0ZWQhJyk7XG4gICAgICB0aGlzLmNoZWNrQXV0aFN0YXR1cygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLnNob3dFcnJvcihgQXV0aGVudGljYXRpb24gZmFpbGVkOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuYXV0aEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5hdXRoQnRuLnRleHRDb250ZW50ID0gJ0Nvbm5lY3QgQWNjb3VudCc7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tBdXRoU3RhdHVzKCkge1xuXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLm9hdXRoTWFuYWdlci5nZXRDYWNoZWRUb2tlbih0aGlzLnNlbGVjdGVkUHJvdmlkZXIpO1xuICAgIGNvbnN0IGlzVmFsaWQgPSB0b2tlbiAmJiBhd2FpdCB0aGlzLm9hdXRoTWFuYWdlci5pc1Rva2VuVmFsaWQodGhpcy5zZWxlY3RlZFByb3ZpZGVyLCB0b2tlbik7XG5cbiAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgdGhpcy5hdXRoU3RhdHVzLnRleHRDb250ZW50ID0gJ+KckyBDb25uZWN0ZWQnO1xuICAgICAgdGhpcy5hdXRoU3RhdHVzLmNsYXNzTGlzdC5hZGQoJ2Nvbm5lY3RlZCcpO1xuICAgICAgdGhpcy5hdXRoQnRuLnRleHRDb250ZW50ID0gJ1JlY29ubmVjdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXV0aFN0YXR1cy50ZXh0Q29udGVudCA9ICdOb3QgYXV0aGVudGljYXRlZCc7XG4gICAgICB0aGlzLmF1dGhTdGF0dXMuY2xhc3NMaXN0LnJlbW92ZSgnY29ubmVjdGVkJyk7XG4gICAgICB0aGlzLmF1dGhCdG4udGV4dENvbnRlbnQgPSAnQ29ubmVjdCBBY2NvdW50JztcbiAgICB9XG4gIH1cblxuICBzaG93UHJvZ3Jlc3MoKSB7XG4gICAgdGhpcy5wcm9ncmVzc1NlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIH1cblxuICBoaWRlUHJvZ3Jlc3MoKSB7XG4gICAgdGhpcy5wcm9ncmVzc1NlY3Rpb24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9ICcwJSc7XG4gICAgdGhpcy5wcm9ncmVzc1RleHQudGV4dENvbnRlbnQgPSAnVXBsb2FkaW5nOiAwJSc7XG4gIH1cblxuICB1cGRhdGVQcm9ncmVzcyhwcm9ncmVzcywgY3VycmVudCwgdG90YWwsIGZpbGVOYW1lKSB7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9IGAke3Byb2dyZXNzfSVgO1xuICAgIGlmIChjdXJyZW50ICYmIHRvdGFsKSB7XG4gICAgICB0aGlzLnByb2dyZXNzVGV4dC50ZXh0Q29udGVudCA9IGBVcGxvYWRpbmcgJHtjdXJyZW50fS8ke3RvdGFsfTogJHtmaWxlTmFtZX0gKCR7TWF0aC5yb3VuZChwcm9ncmVzcyl9JSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2dyZXNzVGV4dC50ZXh0Q29udGVudCA9IGBVcGxvYWRpbmc6ICR7TWF0aC5yb3VuZChwcm9ncmVzcyl9JWA7XG4gICAgfVxuICB9XG5cbiAgc2hvd1N0YXR1cygpIHtcbiAgICB0aGlzLnN0YXR1c1NlY3Rpb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIH1cblxuICBoaWRlU3RhdHVzKCkge1xuICAgIHRoaXMuc3RhdHVzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB0aGlzLnN0YXR1c01lc3NhZ2UuaW5uZXJIVE1MID0gJyc7XG4gIH1cblxuICAvLyBzaG93UmVzdWx0cyhyZXN1bHRzKSB7XG4gIC8vICAgdGhpcy5zaG93U3RhdHVzKCk7XG4gIC8vICAgdGhpcy5zdGF0dXNNZXNzYWdlLmlubmVySFRNTCA9ICcnO1xuXG4gIC8vICAgY29uc3Qgc3VjY2Vzc0NvdW50ID0gcmVzdWx0cy5maWx0ZXIociA9PiByLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKS5sZW5ndGg7XG4gIC8vICAgY29uc3QgZmFpbENvdW50ID0gcmVzdWx0cy5maWx0ZXIociA9PiByLnN0YXR1cyA9PT0gJ2Vycm9yJykubGVuZ3RoO1xuXG4gIC8vICAgY29uc3Qgc3VtbWFyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAvLyAgIHN1bW1hcnkuY2xhc3NOYW1lID0gJ3N0YXR1cy1zdW1tYXJ5IHN1Y2Nlc3MnO1xuICAvLyAgIHN1bW1hcnkudGV4dENvbnRlbnQgPSBgVXBsb2FkZWQgJHtzdWNjZXNzQ291bnR9IG9mICR7cmVzdWx0cy5sZW5ndGh9IGZpbGVzIHN1Y2Nlc3NmdWxseWA7XG4gIC8vICAgdGhpcy5zdGF0dXNNZXNzYWdlLmFwcGVuZENoaWxkKHN1bW1hcnkpO1xuXG4gIC8vICAgaWYgKGZhaWxDb3VudCA+IDApIHtcbiAgLy8gICAgIGNvbnN0IGZhaWxlZExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgLy8gICAgIGZhaWxlZExpc3QuY2xhc3NOYW1lID0gJ2ZhaWxlZC1saXN0JztcbiAgLy8gICAgIGZhaWxlZExpc3QuaW5uZXJIVE1MID0gJzxwPjxzdHJvbmc+RmFpbGVkIHVwbG9hZHM6PC9zdHJvbmc+PC9wPic7XG5cbiAgLy8gICAgIHJlc3VsdHMuZmlsdGVyKHIgPT4gci5zdGF0dXMgPT09ICdlcnJvcicpLmZvckVhY2gocmVzdWx0ID0+IHtcbiAgLy8gICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgLy8gICAgICAgaXRlbS5jbGFzc05hbWUgPSAnZXJyb3ItaXRlbSc7XG4gIC8vICAgICAgIGl0ZW0udGV4dENvbnRlbnQgPSBgJHtyZXN1bHQuZmlsZX06ICR7cmVzdWx0LmVycm9yfWA7XG4gIC8vICAgICAgIGZhaWxlZExpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIC8vICAgICB9KTtcblxuICAvLyAgICAgdGhpcy5zdGF0dXNNZXNzYWdlLmFwcGVuZENoaWxkKGZhaWxlZExpc3QpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIHNob3dTdWNjZXNzKG1lc3NhZ2UpIHtcbiAgICB0aGlzLnNob3dTdGF0dXMoKTtcbiAgICB0aGlzLnN0YXR1c01lc3NhZ2UuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJzdGF0dXMtc3VtbWFyeSBzdWNjZXNzXCI+JHttZXNzYWdlfTwvZGl2PmA7XG4gIH1cblxuICBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMuc2hvd1N0YXR1cygpO1xuICAgIHRoaXMuc3RhdHVzTWVzc2FnZS5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cInN0YXR1cy1zdW1tYXJ5IGVycm9yXCI+RXJyb3I6ICR7bWVzc2FnZX08L2Rpdj5gO1xuICB9XG5cbiAgZm9ybWF0RmlsZVNpemUoYnl0ZXMpIHtcbiAgICBpZiAoYnl0ZXMgPT09IDApIHJldHVybiAnMCBCeXRlcyc7XG4gICAgY29uc3QgayA9IDEwMjQ7XG4gICAgY29uc3Qgc2l6ZXMgPSBbJ0J5dGVzJywgJ0tCJywgJ01CJywgJ0dCJ107XG4gICAgY29uc3QgaSA9IE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coaykpO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGJ5dGVzIC8gTWF0aC5wb3coaywgaSkgKiAxMDApIC8gMTAwICsgJyAnICsgc2l6ZXNbaV07XG4gIH1cbn1cblxuXG4vLyBJbml0aWFsaXplIHdoZW4gRE9NIGlzIHJlYWR5XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBuZXcgUG9wdXBDb250cm9sbGVyKCk7XG59KTsiLCIvLyBPQXV0aCBNYW5hZ2VyIC0gSGFuZGxlcyBhdXRoZW50aWNhdGlvbiBmb3IgbXVsdGlwbGUgY2xvdWQgcHJvdmlkZXJzXG5jbGFzcyBPQXV0aE1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb3ZpZGVycyA9IHtcbiAgICAgIGdvb2dsZURyaXZlOiB7XG4gICAgICAgIGF1dGhVcmw6ICdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCcsXG4gICAgICAgIHRva2VuVXJsOiAnaHR0cHM6Ly9vYXV0aDIuZ29vZ2xlYXBpcy5jb20vdG9rZW4nLFxuICAgICAgICBjbGllbnRJZDogJzMxMDA2MDA1NTMwNS1xOW11amRnbHJoOTJxazdpNmNjZjdhNWo3MmZ0NG9wOC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgICAgIHNjb3BlczogWydodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmZpbGUnXSxcbiAgICAgICAgcmVkaXJlY3RVcmk6IGNocm9tZS5pZGVudGl0eS5nZXRSZWRpcmVjdFVSTCgpXG4gICAgICB9LFxuICAgICAgb25lZHJpdmU6IHtcbiAgICAgICAgYXV0aFVybDogJ2h0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9jb21tb24vb2F1dGgyL3YyLjAvYXV0aG9yaXplJyxcbiAgICAgICAgdG9rZW5Vcmw6ICdodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vY29tbW9uL29hdXRoMi92Mi4wL3Rva2VuJyxcbiAgICAgICAgY2xpZW50SWQ6ICdmODU5MDk4NC1iNTI1LTQ4OGEtOTFkZS04YmI4M2JlMGVlMzcnLFxuICAgICAgICBzY29wZXM6IFsnRmlsZXMuUmVhZFdyaXRlJywgJ29mZmxpbmVfYWNjZXNzJ10sXG4gICAgICAgIHJlZGlyZWN0VXJpOiBjaHJvbWUuaWRlbnRpdHkuZ2V0UmVkaXJlY3RVUkwoKVxuICAgICAgfSxcbiAgICAgIGRyb3Bib3g6IHtcbiAgICAgICAgYXV0aFVybDogJ2h0dHBzOi8vd3d3LmRyb3Bib3guY29tL29hdXRoMi9hdXRob3JpemUnLFxuICAgICAgICBjbGllbnRJZDogJ3c5YjBrZXltamo5bTBjdycsXG4gICAgICAgIGNsaWVudFNlY3JldDogXCJ6MzF2aWx4MGd1YTU0dmNcIixcbiAgICAgICAgc2NvcGVzOiBbJ2ZpbGVzLmNvbnRlbnQud3JpdGUnXSxcbiAgICAgICAgcmVkaXJlY3RVcmk6IGNocm9tZS5pZGVudGl0eS5nZXRSZWRpcmVjdFVSTCgpXG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhjaHJvbWUuaWRlbnRpdHkuZ2V0UmVkaXJlY3RVUkwoKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBBdXRoZW50aWNhdGUgd2l0aCBhIGNsb3VkIHByb3ZpZGVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm92aWRlciAtIFByb3ZpZGVyIG5hbWUgKGdvb2dsZURyaXZlLCBvbmVkcml2ZSwgZHJvcGJveClcbiAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQWNjZXNzIHRva2VuXG4gICAqL1xuICBhc3luYyBhdXRoZW50aWNhdGUocHJvdmlkZXIpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5wcm92aWRlcnNbcHJvdmlkZXJdO1xuICAgICAgaWYgKCFjb25maWcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHByb3ZpZGVyOiAke3Byb3ZpZGVyfWApO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGEgY2FjaGVkIHRva2VuXG4gICAgICBjb25zdCBjYWNoZWRUb2tlbiA9IGF3YWl0IHRoaXMuZ2V0Q2FjaGVkVG9rZW4ocHJvdmlkZXIpO1xuICAgICAgaWYgKGNhY2hlZFRva2VuICYmIGF3YWl0IHRoaXMuaXNUb2tlblZhbGlkKHByb3ZpZGVyLCBjYWNoZWRUb2tlbikpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFVzaW5nIGNhY2hlZCB0b2tlbiBmb3IgJHtwcm92aWRlcn1gKTtcbiAgICAgICAgcmV0dXJuIGNhY2hlZFRva2VuO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgbmV3IHRva2VuXG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMuZ2V0TmV3VG9rZW4ocHJvdmlkZXIsIGNvbmZpZyk7XG4gICAgICBcbiAgICAgIC8vIENhY2hlIHRoZSB0b2tlblxuICAgICAgYXdhaXQgdGhpcy5jYWNoZVRva2VuKHByb3ZpZGVyLCB0b2tlbik7XG4gICAgICBcbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgQXV0aGVudGljYXRpb24gZXJyb3IgZm9yICR7cHJvdmlkZXJ9OmAsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG5cblxuXG4gIC8qKlxuICAgKiBHZXQgYSBuZXcgYWNjZXNzIHRva2VuIHZpYSBPQXV0aCBmbG93XG4gICAqL1xuICBhc3luYyBnZXROZXdUb2tlbihwcm92aWRlciwgY29uZmlnKSB7XG4gICAgY29uc3QgYXV0aFVybCA9IHRoaXMuYnVpbGRBdXRoVXJsKHByb3ZpZGVyLCBjb25maWcpO1xuICAgIFxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjaHJvbWUuaWRlbnRpdHkubGF1bmNoV2ViQXV0aEZsb3coXG4gICAgICAgIHtcbiAgICAgICAgICB1cmw6IGF1dGhVcmwsXG4gICAgICAgICAgaW50ZXJhY3RpdmU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgKHJlZGlyZWN0VXJsKSA9PiB7XG4gICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IHRoaXMuZXh0cmFjdFRva2VuKHJlZGlyZWN0VXJsLCBwcm92aWRlcik7XG4gICAgICAgICAgICByZXNvbHZlKHRva2VuKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgT0F1dGggYXV0aG9yaXphdGlvbiBVUkxcbiAgICovXG4gIGJ1aWxkQXV0aFVybChwcm92aWRlciwgY29uZmlnKSB7XG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICBjbGllbnRfaWQ6IGNvbmZpZy5jbGllbnRJZCxcbiAgICAgIHJlZGlyZWN0X3VyaTogY29uZmlnLnJlZGlyZWN0VXJpLFxuICAgICAgcmVzcG9uc2VfdHlwZTogJ3Rva2VuJyxcbiAgICAgIHNjb3BlOiBjb25maWcuc2NvcGVzLmpvaW4oJyAnKVxuICAgIH0pO1xuXG4gICAgLy8gT25lRHJpdmUgdXNlcyBkaWZmZXJlbnQgcGFyYW1ldGVyIG5hbWVzXG4gICAgaWYgKHByb3ZpZGVyID09PSAnb25lZHJpdmUnKSB7XG4gICAgICBwYXJhbXMuc2V0KCdyZXNwb25zZV9tb2RlJywgJ2ZyYWdtZW50Jyk7XG4gICAgfVxuXG4gICAgLy8gRHJvcGJveCBkb2Vzbid0IHVzZSBzY29wZSBwYXJhbWV0ZXIgdGhlIHNhbWUgd2F5XG4gICAgaWYgKHByb3ZpZGVyID09PSAnZHJvcGJveCcpIHtcbiAgICAgIHBhcmFtcy5zZXQoJ3Rva2VuX2FjY2Vzc190eXBlJywgJ29mZmxpbmUnKTtcbiAgICAgIHBhcmFtcy5zZXQoJ2NsaWVudF9zZWNyZXQnLCBjb25maWcuY2xpZW50U2VjcmV0KVxuICAgICAgcGFyYW1zLnNldCgncmVzcG9uc2VfdHlwZScsJ2NvZGUnKVxuICAgIH1cblxuICAgIHJldHVybiBgJHtjb25maWcuYXV0aFVybH0/JHtwYXJhbXMudG9TdHJpbmcoKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3QgYWNjZXNzIHRva2VuIGZyb20gcmVkaXJlY3QgVVJMXG4gICAqL1xuICBleHRyYWN0VG9rZW4ocmVkaXJlY3RVcmwsIHByb3ZpZGVyKSB7XG4gICAgaWYgKCFyZWRpcmVjdFVybCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyByZWRpcmVjdCBVUkwgcmVjZWl2ZWQnKTtcbiAgICB9XG5cbiAgICAvLyBQYXJzZSB0aGUgVVJMIGZyYWdtZW50IGZvciB0aGUgYWNjZXNzIHRva2VuXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChyZWRpcmVjdFVybCk7XG4gICAgY29uc29sZS5sb2coXCJHb3QgdXJsXCIsIHVybClcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybC5oYXNoLnN1YnN0cmluZygxKSk7XG4gICAgXG4gICAgdmFyIGFjY2Vzc1Rva2VuXG5cbiAgICAvLyBmb3IgZHJvcGJveCBpdCB1c2VzIGNvZGUgaW5zdGVhZCBvZiBhY2Nlc3NfdG9rZW5cbiAgICBpZiAocHJvdmlkZXIgPT0gJ2Ryb3Bib3gnKXtcbiAgICAgIGNvbnN0IGNvZGUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcImNvZGVcIilcbiAgICAgIGFjY2Vzc1Rva2VuID0gdGhpcy5nZXREcm9wYm94QWNjZXNzVG9rZW4oY29kZSlcbiAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4vY29kZVwiLCBhY2Nlc3NUb2tlbilcbiAgICAgIGlmICghYWNjZXNzVG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYWNjZXNzIHRva2VuIGluIHJlZGlyZWN0IFVSTCcpO1xuICAgIH1cbiAgICB9XG4gIFxuICAgIGVsc2V7XG4gICAgYWNjZXNzVG9rZW4gPSBwYXJhbXMuZ2V0KCdhY2Nlc3NfdG9rZW4nKTtcbiAgICBpZiAoIWFjY2Vzc1Rva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFjY2VzcyB0b2tlbiBpbiByZWRpcmVjdCBVUkwnKTtcbiAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIGNvbnN0IGFjY2Vzc1Rva2VuID0gcGFyYW1zLmdldCgnYWNjZXNzX3Rva2VuJyk7XG4gICAgLy8gaWYgKCFhY2Nlc3NUb2tlbikge1xuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY2Nlc3MgdG9rZW4gaW4gcmVkaXJlY3QgVVJMJyk7XG4gICAgLy8gfVxuXG4gICAgcmV0dXJuIGFjY2Vzc1Rva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIENhY2hlIHRva2VuIGluIENocm9tZSBzdG9yYWdlXG4gICAqL1xuICBhc3luYyBjYWNoZVRva2VuKHByb3ZpZGVyLCB0b2tlbikge1xuICAgIGNvbnN0IGtleSA9IGB0b2tlbl8ke3Byb3ZpZGVyfWA7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBba2V5XTogZGF0YSB9LCByZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY2FjaGVkIHRva2VuIGZyb20gQ2hyb21lIHN0b3JhZ2VcbiAgICovXG4gIGFzeW5jIGdldENhY2hlZFRva2VuKHByb3ZpZGVyKSB7XG4gICAgY29uc3Qga2V5ID0gYHRva2VuXyR7cHJvdmlkZXJ9YDtcbiAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChba2V5XSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0W2tleV0pIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdFtrZXldLnRva2VuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0b2tlbiBpcyBzdGlsbCB2YWxpZCAoYmFzaWMgdGltZS1iYXNlZCBjaGVjaylcbiAgICovXG4gIGFzeW5jIGlzVG9rZW5WYWxpZChwcm92aWRlciwgdG9rZW4pIHtcbiAgICBjb25zdCBrZXkgPSBgdG9rZW5fJHtwcm92aWRlcn1gO1xuICAgIFxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtrZXldLCAocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmICghcmVzdWx0W2tleV0pIHtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb25zaWRlciB0b2tlbiB2YWxpZCBmb3IgNTAgbWludXRlcyAobW9zdCB0b2tlbnMgbGFzdCA2MCBtaW51dGVzKVxuICAgICAgICBjb25zdCBtYXhBZ2UgPSA1MCAqIDYwICogMTAwMDtcbiAgICAgICAgY29uc3QgYWdlID0gRGF0ZS5ub3coKSAtIHJlc3VsdFtrZXldLnRpbWVzdGFtcDtcbiAgICAgICAgcmVzb2x2ZShhZ2UgPCBtYXhBZ2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGNhY2hlZCB0b2tlbiAobG9nb3V0KVxuICAgKi9cbiAgYXN5bmMgbG9nb3V0KHByb3ZpZGVyKSB7XG4gICAgY29uc3Qga2V5ID0gYHRva2VuXyR7cHJvdmlkZXJ9YDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZShba2V5XSwgcmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBjYWNoZWQgdG9rZW5zXG4gICAqL1xuICBhc3luYyBsb2dvdXRBbGwoKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucHJvdmlkZXJzKS5tYXAocCA9PiBgdG9rZW5fJHtwfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKGtleXMsIHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG4gIGFzeW5jIGdldERyb3Bib3hBY2Nlc3NUb2tlbihjb2RlKXtcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgcGFyYW1zLmFwcGVuZCgnY29kZScsIGNvZGUpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ2dyYW50X3R5cGUnLCdhdXRob3JpemF0aW9uX2NvZGUnKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdjbGllbnRfaWQnLHRoaXMucHJvdmlkZXJzLmRyb3Bib3guY2xpZW50SWQpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ2NsaWVudF9zZWNyZXQnLHRoaXMucHJvdmlkZXJzLmRyb3Bib3guY2xpZW50U2VjcmV0KTtcbiAgICBwYXJhbXMuYXBwZW5kKCdyZWRpcmVjdF91cmknLCB0aGlzLnByb3ZpZGVycy5vbmVkcml2ZS5yZWRpcmVjdFVyaSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkuZHJvcGJveGFwaS5jb20vb2F1dGgyL3Rva2VuXCIsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcbiAgICAgIGJvZHk6IHBhcmFtc1xuICAgIH0pO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvbSBleGNoYW5nZSBjb2RlIGZvciB0b2tlbjogJysgYXdhaXQgcmVzcG9uc2UudGV4dCgpKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiBkYXRhLmFjY2Vzc190b2tlbjtcbiAgfVxuXG59XG5cbi8vIEV4cG9ydCBmb3IgdXNlIGluIG90aGVyIG1vZHVsZXNcbmV4cG9ydCBkZWZhdWx0IE9BdXRoTWFuYWdlcjsiLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChcbiAgICAgIGtleSA9PT0gJ2RlZmF1bHQnIHx8XG4gICAgICBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fFxuICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlc3QsIGtleSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuSEFTSF9SRUZfMjNmOTlmMGY1NzI1YTNkNS5qcy5tYXAifQ==
