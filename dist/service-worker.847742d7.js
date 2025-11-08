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
})({"1IqZt":[function(require,module,exports,__globalThis) {
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// Service Worker - Background script for handling events
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _uploadManagerJs = require("./lib/upload-manager.js");
var _uploadManagerJsDefault = parcelHelpers.interopDefault(_uploadManagerJs);
// Initialize UploadManager
const uploadManager = new (0, _uploadManagerJsDefault.default)();
// Initialize OAuth manager
// const oauthManager = new OAuthManager();
// // Listen for messages from popup or content scripts
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'authenticate') {
//     handleAuthentication(request.provider)
//       .then(token => sendResponse({ success: true, token }))
//       .catch(error => sendResponse({ success: false, error: error.message }));
//     return true; // Keep message channel open for async response
//   }
//   if (request.action === 'upload') {
//     handleUpload(request.file, request.provider)
//       .then(result => sendResponse({ success: true, result }))
//       .catch(error => sendResponse({ success: false, error: error.message }));
//     return true;
//   }
//   if (request.action === 'getUploadHistory') {
//     getUploadHistory()
//       .then(history => sendResponse({ success: true, history }))
//       .catch(error => sendResponse({ success: false, error: error.message }));
//     return true;
//   }
// });
/**
//  * Handle authentication request
//  */ // async function handleAuthentication(provider) {
//   try {
//     const token = await oauthManager.authenticate(provider);
//     console.log(`Successfully authenticated with ${provider}`);
//     return token;
//   } catch (error) {
//     console.error(`Authentication failed for ${provider}:`, error);
//     throw error;
//   }
// }
/**
 * Handle file upload request
 */ async function handleUpload(fileData, provider) {
    try {
        // Get access token
        const token = await oauthManager.authenticate(provider);
        // Upload logic would go here
        // This is a placeholder since actual upload is handled in popup
        console.log(`Upload initiated for ${provider}`);
        // Save to upload history
        await addToUploadHistory({
            provider,
            fileName: fileData.name,
            timestamp: Date.now(),
            status: 'success'
        });
        return {
            success: true
        };
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
}
/**
 * Get upload history from storage
 */ async function getUploadHistory() {
    return new Promise((resolve)=>{
        chrome.storage.local.get([
            'uploadHistory'
        ], (result)=>{
            resolve(result.uploadHistory || []);
        });
    });
}
/**
 * Add entry to upload history
 */ async function addToUploadHistory(entry) {
    const history = await getUploadHistory();
    history.unshift(entry);
    // Keep only last 50 entries
    if (history.length > 50) history.splice(50);
    return new Promise((resolve)=>{
        chrome.storage.local.set({
            uploadHistory: history
        }, resolve);
    });
}
// // Listen for alarm events (for token refresh, etc.)
// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === 'refreshTokens') {
//     console.log('Token refresh alarm triggered');
//     // Add token refresh logic here if needed
//   }
// });
// // Create periodic alarm for maintenance tasks
// chrome.alarms.create('refreshTokens', {
//   periodInMinutes: 30
// });
console.log('Service worker initialized');
// Listen for extension installation
chrome.runtime.onInstalled.addListener((details)=>{
    console.log('Extension installed:', details.reason);
    if (details.reason === 'install') // First time installation
    chrome.storage.local.set({
        selectedProvider: 'googleDrive',
        uploadHistory: []
    });
});
// adds opption for conetxtMenus
chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        id: "saveImageToCloud",
        title: "Save Image to Cloud",
        contexts: [
            "image"
        ]
    });
    chrome.contextMenus.create({
        id: "saveSelectionToCloud",
        title: "Save selection to Cloud",
        contexts: [
            "selection"
        ]
    });
// chrome.contextMenus.create({
//   id: "savePageAsPdf",
//   title: "Save Page as Pdf to cloud",
//   contexts: ["page"]
// });
});
// Handler for pdf
chrome.contextMenus.onClicked.addListener(async (info, tab)=>{
    if (info.menuItemId === "savePageAsPdf") {
        console.log("In the click from content-menu");
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs)=>{
            if (tabs[0]?.id) {
                console.log("in the tab section");
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'convertHtmlToDocx'
                }, (response)=>{
                    console.log('Response from content script:', response);
                });
            }
        });
    // const content = document.body;
    // const canvas = await html2canvas(content, { scale: 2});
    // const pdf = new jsPDF('p', 'mm', 'a4');
    // const imgData = canvas.toDataURL('image/png');
    // pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    // const pdfBlob = pdf.output('blob');
    // // upload pdf Blob
    // chrome.storage.local.get(['selectedProvider'], (result) => {
    //   const provider = result.selectedProvider;
    //   // Use your uploadManager to upload the blob
    //   uploadManager.uploadFile(pdfBlob, provider, (progress) => {
    //     console.log('Upload progress:', progress);
    //   });
    // });
    }
});
// Handle context menu clicks
// Needs to implement it
chrome.contextMenus.onClicked.addListener((info, tab)=>{
    if (info.menuItemId === "saveSelectionToCloud" && info.selectionText) {
        //const selectedText = info.selectionText;
        //  uploadManager.uploadFile(selectedText, )
        chrome.tabs.sendMessage(tab.id, {
            action: "saveSelectionToCloud"
        });
        console.log('Selected text:', selectedText);
    }
});
chrome.contextMenus.onClicked.addListener((info, tab)=>{
    if (info.menuItemId === "saveImageToCloud" && info.srcUrl) {
        const imageUrl = info.srcUrl;
        // You can now process this image URL for upload
        console.log('Image URL to save:', imageUrl);
        // have to implement to save for image data urls not just internet urls
        // Example: Inject a content script to fetch the image as blob in page context (with cookies)
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            func: async (url)=>{
                const response = await fetch(url);
                const blob = await response.blob();
                // Convert blob to ArrayBuffer so it can be passed via message safely
                const buffer = await blob.arrayBuffer();
                const array = Array.from(new Uint8Array(buffer));
                // Send message from page context to background
                chrome.runtime.sendMessage({
                    action: 'IMAGE_DATA',
                    data: array,
                    name: url.split('/').pop()
                });
            },
            args: [
                imageUrl
            ]
        });
    }
});
//Handle image uploads
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse)=>{
    console.log("Got the message for upload");
    if (message.action === 'IMAGE_DATA') {
        const { data, name } = message;
        // Convert array back to blob
        const uint8Array = new Uint8Array(data);
        const blob = new Blob([
            uint8Array
        ]);
        // Get provider setting asynchronously
        chrome.storage.local.get([
            'selectedProvider'
        ], (result)=>{
            const provider = result.selectedProvider;
            // Use your uploadManager to upload the blob
            uploadManager.uploadFile(blob, provider, (progress)=>{
                console.log('Upload progress:', progress);
            });
        });
    } else if (message.action === 'PDF_DATA') {
        // console.log("Got message for pdf upload")
        const { data, name } = message;
        //convert array back to blob
        const uint8Array = new Uint8Array(data);
        const blob = new Blob([
            uint8Array
        ]);
        chrome.storage.local.get([
            'selectedProvider'
        ], (result)=>{
            const provider = result.selectedProvider;
            // Use your uploadManager to upload the blob
            uploadManager.uploadFile(blob, provider, (progress)=>{
                console.log('Upload progress:', progress);
            });
        });
    } else if (message.action === 'DOCX_DATA') {
        const { data, name } = message;
        //convert array back to blob
        const uint8Array = new Uint8Array(data);
        const blob = new Blob([
            uint8Array
        ]);
        chrome.storage.local.get([
            'selectedProvider'
        ], (result)=>{
            const provider = result.selectedProvider;
            // Use your uploadManager to upload the blob
            uploadManager.uploadFile(blob, provider, (progress)=>{
                console.log('Upload progress:', progress);
            });
        });
    } else if (message.action === 'process_images') {
        (async ()=>{
            console.log("Got the request for the images");
            const base64Map = await getImagesAsBase64(message.imageUrls);
            console.log(base64Map);
            sendResponse(base64Map);
        })();
        return true; // Keep the message channel open
    }
});
// To get images as base64
/**
 * Converts a list of image URLs to Base64 Data URLs using the background script's 
 * elevated permissions to bypass potential CORS restrictions.
 * @param {string[]} imageUrls - Array of remote image URLs.
 * @returns {Promise<Object<string, string>>} A map of original URL to Base64 Data URL.
 */ async function getImagesAsBase64(imageUrls) {
    const base64Map = {};
    const promises = imageUrls.map(async (url)=>{
        try {
            // Fetch operation from the background script is often not restricted by CORS.
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
            const blob = await response.blob();
            // Convert Blob to Base64 Data URL
            const base64 = await new Promise((resolve, reject)=>{
                const reader = new FileReader();
                reader.onloadend = ()=>resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
            base64Map[url] = base64;
        } catch (e) {
            console.warn(`Failed to process image ${url}:`, e);
            base64Map[url] = ''; // Use empty string for failure
        }
    });
    await Promise.all(promises);
    return base64Map;
}
// Update the chrome.runtime.onMessage listener in background.js
// to include this new action:
/* ... (Existing authentication and convert_and_upload handlers) ... */ // base64 images
// State of the proivider
function getState() {
    chrome.storage.local.get([
        'selectedProvider'
    ], (result)=>{
        const provider = result.selectedProvider;
        console.log("Provoder", provider);
    });
}
getState();

},{"./lib/upload-manager.js":"kX6kd","@parcel/transformer-js/src/esmodule-helpers.js":"hCtEe"}],"kX6kd":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _oauthManagerJs = require("./oauth-manager.js");
var _oauthManagerJsDefault = parcelHelpers.interopDefault(_oauthManagerJs);
class UploadManager {
    constructor(){
        this.oauthManager = new (0, _oauthManagerJsDefault.default)();
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
        const metadata = {
            name: file.name,
            mimeType: file.type || 'application/octet-stream'
        };
        const formData = new FormData();
        formData.append('metadata', new Blob([
            JSON.stringify(metadata)
        ], {
            type: 'application/json'
        }));
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
        return {
            success: true,
            fileId: data.id,
            fileName: data.name,
            webViewLink: data.webViewLink
        };
    }
    async uploadToOneDrive(file, accessToken, progressCallback) {
        if (file.size < 4194304) return this.uploadToOneDriveSimple(file, accessToken, progressCallback);
        else return this.uploadToOneDriveResumable(file, accessToken, progressCallback);
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
        return {
            success: true,
            fileId: data.id,
            fileName: data.name,
            webUrl: data.webUrl
        };
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
                item: {
                    '@microsoft.graph.conflictBehavior': 'rename'
                }
            })
        });
        if (!sessionResponse.ok) throw new Error(`Failed to create upload session: ${sessionResponse.statusText}`);
        const sessionData = await sessionResponse.json();
        const uploadUrl = sessionData.uploadUrl;
        const chunkSize = 3276800; // 3.2 MB
        let offset = 0;
        while(offset < file.size){
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
            if (!response.ok && response.status !== 202) throw new Error(`Chunk upload failed: ${response.statusText}`);
            offset += chunkBuffer.byteLength;
            if (progressCallback) progressCallback(offset / file.size * 100);
            if (response.status === 201 || response.status === 200) {
                const result = await response.json();
                return {
                    success: true,
                    fileId: result.id,
                    fileName: result.name,
                    webUrl: result.webUrl
                };
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
            } catch  {
                errorMessage = response.statusText;
            }
            throw new Error(`Upload failed: ${errorMessage}`);
        }
        const data = await response.json();
        return {
            success: true,
            fileId: data.id,
            fileName: data.name,
            pathDisplay: data.path_display
        };
    }
}
exports.default = UploadManager;

},{"./oauth-manager.js":"7DrNc","@parcel/transformer-js/src/esmodule-helpers.js":"hCtEe"}],"7DrNc":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"hCtEe"}],"hCtEe":[function(require,module,exports,__globalThis) {
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

},{}]},["1IqZt"], "1IqZt", "parcelRequire6043", {})

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VSxNQUFNLEVBQUUsSUFBSTtJQUN4QyxPQUFPLElBQUksQ0FBQyxRQUFRLE9BQU8sQ0FBQyxTQUFVLEdBQUc7UUFDdkMsSUFDRSxRQUFRLGFBQ1IsUUFBUSxnQkFDUixPQUFPLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sTUFFM0M7UUFHRixPQUFPLGNBQWMsQ0FBQyxNQUFNLEtBQUs7WUFDL0IsWUFBWTtZQUNaLEtBQUs7Z0JBQ0gsT0FBTyxNQUFNLENBQUMsSUFBSTtZQUNwQjtRQUNGO0lBQ0Y7SUFFQSxPQUFPO0FBQ1Q7QUFFQSxRQUFRLE1BQU0sR0FBRyxTQUFVLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRztJQUM1QyxPQUFPLGNBQWMsQ0FBQyxNQUFNLFVBQVU7UUFDcEMsWUFBWTtRQUNaLEtBQUs7SUFDUDtBQUNGIiwic291cmNlcyI6WyJzcmMvc2VydmljZS13b3JrZXIuanMiLCJzcmMvbGliL3VwbG9hZC1tYW5hZ2VyLmpzIiwic3JjL2xpYi9vYXV0aC1tYW5hZ2VyLmpzIiwibm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IGh0bWwyY2FudmFzIGZyb20gJ2h0bWwyY2FudmFzJztcbi8vIGltcG9ydCBqc1BERiBmcm9tICdqc3BkZic7XG5cbi8vIFNlcnZpY2UgV29ya2VyIC0gQmFja2dyb3VuZCBzY3JpcHQgZm9yIGhhbmRsaW5nIGV2ZW50c1xuaW1wb3J0IFVwbG9hZE1hbmFnZXIgZnJvbSAnLi9saWIvdXBsb2FkLW1hbmFnZXIuanMnXG5cbi8vIEluaXRpYWxpemUgVXBsb2FkTWFuYWdlclxuY29uc3QgdXBsb2FkTWFuYWdlciA9IG5ldyBVcGxvYWRNYW5hZ2VyKCk7XG5cblxuLy8gSW5pdGlhbGl6ZSBPQXV0aCBtYW5hZ2VyXG4vLyBjb25zdCBvYXV0aE1hbmFnZXIgPSBuZXcgT0F1dGhNYW5hZ2VyKCk7XG5cblxuXG5cblxuLy8gLy8gTGlzdGVuIGZvciBtZXNzYWdlcyBmcm9tIHBvcHVwIG9yIGNvbnRlbnQgc2NyaXB0c1xuLy8gY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuLy8gICBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdhdXRoZW50aWNhdGUnKSB7XG4vLyAgICAgaGFuZGxlQXV0aGVudGljYXRpb24ocmVxdWVzdC5wcm92aWRlcilcbi8vICAgICAgIC50aGVuKHRva2VuID0+IHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUsIHRva2VuIH0pKVxuLy8gICAgICAgLmNhdGNoKGVycm9yID0+IHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KSk7XG4vLyAgICAgcmV0dXJuIHRydWU7IC8vIEtlZXAgbWVzc2FnZSBjaGFubmVsIG9wZW4gZm9yIGFzeW5jIHJlc3BvbnNlXG4vLyAgIH1cbiAgXG4vLyAgIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ3VwbG9hZCcpIHtcbi8vICAgICBoYW5kbGVVcGxvYWQocmVxdWVzdC5maWxlLCByZXF1ZXN0LnByb3ZpZGVyKVxuLy8gICAgICAgLnRoZW4ocmVzdWx0ID0+IHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUsIHJlc3VsdCB9KSlcbi8vICAgICAgIC5jYXRjaChlcnJvciA9PiBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSkpO1xuLy8gICAgIHJldHVybiB0cnVlO1xuLy8gICB9XG5cbi8vICAgaWYgKHJlcXVlc3QuYWN0aW9uID09PSAnZ2V0VXBsb2FkSGlzdG9yeScpIHtcbi8vICAgICBnZXRVcGxvYWRIaXN0b3J5KClcbi8vICAgICAgIC50aGVuKGhpc3RvcnkgPT4gc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSwgaGlzdG9yeSB9KSlcbi8vICAgICAgIC5jYXRjaChlcnJvciA9PiBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSkpO1xuLy8gICAgIHJldHVybiB0cnVlO1xuLy8gICB9XG4vLyB9KTtcblxuLyoqXG4vLyAgKiBIYW5kbGUgYXV0aGVudGljYXRpb24gcmVxdWVzdFxuLy8gICovXG4vLyBhc3luYyBmdW5jdGlvbiBoYW5kbGVBdXRoZW50aWNhdGlvbihwcm92aWRlcikge1xuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IHRva2VuID0gYXdhaXQgb2F1dGhNYW5hZ2VyLmF1dGhlbnRpY2F0ZShwcm92aWRlcik7XG4vLyAgICAgY29uc29sZS5sb2coYFN1Y2Nlc3NmdWxseSBhdXRoZW50aWNhdGVkIHdpdGggJHtwcm92aWRlcn1gKTtcbi8vICAgICByZXR1cm4gdG9rZW47XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgY29uc29sZS5lcnJvcihgQXV0aGVudGljYXRpb24gZmFpbGVkIGZvciAke3Byb3ZpZGVyfTpgLCBlcnJvcik7XG4vLyAgICAgdGhyb3cgZXJyb3I7XG4vLyAgIH1cbi8vIH1cblxuLyoqXG4gKiBIYW5kbGUgZmlsZSB1cGxvYWQgcmVxdWVzdFxuICovXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVVcGxvYWQoZmlsZURhdGEsIHByb3ZpZGVyKSB7XG4gIHRyeSB7XG4gICAgLy8gR2V0IGFjY2VzcyB0b2tlblxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgb2F1dGhNYW5hZ2VyLmF1dGhlbnRpY2F0ZShwcm92aWRlcik7XG4gICAgXG4gICAgLy8gVXBsb2FkIGxvZ2ljIHdvdWxkIGdvIGhlcmVcbiAgICAvLyBUaGlzIGlzIGEgcGxhY2Vob2xkZXIgc2luY2UgYWN0dWFsIHVwbG9hZCBpcyBoYW5kbGVkIGluIHBvcHVwXG4gICAgY29uc29sZS5sb2coYFVwbG9hZCBpbml0aWF0ZWQgZm9yICR7cHJvdmlkZXJ9YCk7XG4gICAgXG4gICAgLy8gU2F2ZSB0byB1cGxvYWQgaGlzdG9yeVxuICAgIGF3YWl0IGFkZFRvVXBsb2FkSGlzdG9yeSh7XG4gICAgICBwcm92aWRlcixcbiAgICAgIGZpbGVOYW1lOiBmaWxlRGF0YS5uYW1lLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgc3RhdHVzOiAnc3VjY2VzcydcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignVXBsb2FkIGZhaWxlZDonLCBlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgdXBsb2FkIGhpc3RvcnkgZnJvbSBzdG9yYWdlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldFVwbG9hZEhpc3RvcnkoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbJ3VwbG9hZEhpc3RvcnknXSwgKHJlc3VsdCkgPT4ge1xuICAgICAgcmVzb2x2ZShyZXN1bHQudXBsb2FkSGlzdG9yeSB8fCBbXSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIEFkZCBlbnRyeSB0byB1cGxvYWQgaGlzdG9yeVxuICovXG5hc3luYyBmdW5jdGlvbiBhZGRUb1VwbG9hZEhpc3RvcnkoZW50cnkpIHtcbiAgY29uc3QgaGlzdG9yeSA9IGF3YWl0IGdldFVwbG9hZEhpc3RvcnkoKTtcbiAgaGlzdG9yeS51bnNoaWZ0KGVudHJ5KTtcbiAgXG4gIC8vIEtlZXAgb25seSBsYXN0IDUwIGVudHJpZXNcbiAgaWYgKGhpc3RvcnkubGVuZ3RoID4gNTApIHtcbiAgICBoaXN0b3J5LnNwbGljZSg1MCk7XG4gIH1cbiAgXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHVwbG9hZEhpc3Rvcnk6IGhpc3RvcnkgfSwgcmVzb2x2ZSk7XG4gIH0pO1xufVxuXG4vLyAvLyBMaXN0ZW4gZm9yIGFsYXJtIGV2ZW50cyAoZm9yIHRva2VuIHJlZnJlc2gsIGV0Yy4pXG4vLyBjaHJvbWUuYWxhcm1zLm9uQWxhcm0uYWRkTGlzdGVuZXIoKGFsYXJtKSA9PiB7XG4vLyAgIGlmIChhbGFybS5uYW1lID09PSAncmVmcmVzaFRva2VucycpIHtcbi8vICAgICBjb25zb2xlLmxvZygnVG9rZW4gcmVmcmVzaCBhbGFybSB0cmlnZ2VyZWQnKTtcbi8vICAgICAvLyBBZGQgdG9rZW4gcmVmcmVzaCBsb2dpYyBoZXJlIGlmIG5lZWRlZFxuLy8gICB9XG4vLyB9KTtcblxuLy8gLy8gQ3JlYXRlIHBlcmlvZGljIGFsYXJtIGZvciBtYWludGVuYW5jZSB0YXNrc1xuLy8gY2hyb21lLmFsYXJtcy5jcmVhdGUoJ3JlZnJlc2hUb2tlbnMnLCB7XG4vLyAgIHBlcmlvZEluTWludXRlczogMzBcbi8vIH0pO1xuXG5jb25zb2xlLmxvZygnU2VydmljZSB3b3JrZXIgaW5pdGlhbGl6ZWQnKTtcblxuXG5cblxuLy8gTGlzdGVuIGZvciBleHRlbnNpb24gaW5zdGFsbGF0aW9uXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoZGV0YWlscykgPT4ge1xuICBjb25zb2xlLmxvZygnRXh0ZW5zaW9uIGluc3RhbGxlZDonLCBkZXRhaWxzLnJlYXNvbik7XG4gIFxuICBpZiAoZGV0YWlscy5yZWFzb24gPT09ICdpbnN0YWxsJykge1xuICAgIC8vIEZpcnN0IHRpbWUgaW5zdGFsbGF0aW9uXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICAgIHNlbGVjdGVkUHJvdmlkZXI6ICdnb29nbGVEcml2ZScsXG4gICAgICB1cGxvYWRIaXN0b3J5OiBbXVxuICAgIH0pO1xuICB9XG59KTtcblxuLy8gYWRkcyBvcHB0aW9uIGZvciBjb25ldHh0TWVudXNcbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgY2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoe1xuICAgIGlkOiBcInNhdmVJbWFnZVRvQ2xvdWRcIixcbiAgICB0aXRsZTogXCJTYXZlIEltYWdlIHRvIENsb3VkXCIsXG4gICAgY29udGV4dHM6IFtcImltYWdlXCJdXG4gIH0pO1xuICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgaWQ6IFwic2F2ZVNlbGVjdGlvblRvQ2xvdWRcIixcbiAgICB0aXRsZTogXCJTYXZlIHNlbGVjdGlvbiB0byBDbG91ZFwiLFxuICAgIGNvbnRleHRzOiBbXCJzZWxlY3Rpb25cIl1cbiAgfSk7XG4gIC8vIGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgLy8gICBpZDogXCJzYXZlUGFnZUFzUGRmXCIsXG4gIC8vICAgdGl0bGU6IFwiU2F2ZSBQYWdlIGFzIFBkZiB0byBjbG91ZFwiLFxuICAvLyAgIGNvbnRleHRzOiBbXCJwYWdlXCJdXG4gIC8vIH0pO1xufSk7XG5cblxuXG4vLyBIYW5kbGVyIGZvciBwZGZcbmNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKGFzeW5jIChpbmZvLCB0YWIpID0+IHtcbiAgaWYgKGluZm8ubWVudUl0ZW1JZCA9PT0gXCJzYXZlUGFnZUFzUGRmXCIpe1xuICAgIGNvbnNvbGUubG9nKFwiSW4gdGhlIGNsaWNrIGZyb20gY29udGVudC1tZW51XCIpXG4gICAgICBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgKHRhYnMpID0+IHtcbiAgICAgIGlmICh0YWJzWzBdPy5pZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImluIHRoZSB0YWIgc2VjdGlvblwiKVxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7IGFjdGlvbjogJ2NvbnZlcnRIdG1sVG9Eb2N4JyB9LCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3BvbnNlIGZyb20gY29udGVudCBzY3JpcHQ6JywgcmVzcG9uc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuYm9keTtcbiAgICAvLyBjb25zdCBjYW52YXMgPSBhd2FpdCBodG1sMmNhbnZhcyhjb250ZW50LCB7IHNjYWxlOiAyfSk7XG4gICAgLy8gY29uc3QgcGRmID0gbmV3IGpzUERGKCdwJywgJ21tJywgJ2E0Jyk7XG4gICAgLy8gY29uc3QgaW1nRGF0YSA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICAgIC8vIHBkZi5hZGRJbWFnZShpbWdEYXRhLCAnUE5HJywgMCwgMCwgMjEwLCAyOTcpO1xuICAgIC8vIGNvbnN0IHBkZkJsb2IgPSBwZGYub3V0cHV0KCdibG9iJyk7XG5cbiAgICAvLyAvLyB1cGxvYWQgcGRmIEJsb2JcbiAgICAvLyBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoWydzZWxlY3RlZFByb3ZpZGVyJ10sIChyZXN1bHQpID0+IHtcbiAgICAvLyAgIGNvbnN0IHByb3ZpZGVyID0gcmVzdWx0LnNlbGVjdGVkUHJvdmlkZXI7XG5cbiAgICAvLyAgIC8vIFVzZSB5b3VyIHVwbG9hZE1hbmFnZXIgdG8gdXBsb2FkIHRoZSBibG9iXG4gICAgLy8gICB1cGxvYWRNYW5hZ2VyLnVwbG9hZEZpbGUocGRmQmxvYiwgcHJvdmlkZXIsIChwcm9ncmVzcykgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnVXBsb2FkIHByb2dyZXNzOicsIHByb2dyZXNzKTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH0pO1xuICB9XG59KVxuXG5cblxuLy8gSGFuZGxlIGNvbnRleHQgbWVudSBjbGlja3Ncbi8vIE5lZWRzIHRvIGltcGxlbWVudCBpdFxuY2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoKGluZm8sIHRhYikgPT4ge1xuICBpZiAoaW5mby5tZW51SXRlbUlkID09PSBcInNhdmVTZWxlY3Rpb25Ub0Nsb3VkXCIgJiYgaW5mby5zZWxlY3Rpb25UZXh0KSB7XG4gICAgLy9jb25zdCBzZWxlY3RlZFRleHQgPSBpbmZvLnNlbGVjdGlvblRleHQ7XG4gICAgLy8gIHVwbG9hZE1hbmFnZXIudXBsb2FkRmlsZShzZWxlY3RlZFRleHQsIClcbiAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiLmlkLCB7IGFjdGlvbjogXCJzYXZlU2VsZWN0aW9uVG9DbG91ZFwiIH0pO1xuICAgIGNvbnNvbGUubG9nKCdTZWxlY3RlZCB0ZXh0OicsIHNlbGVjdGVkVGV4dCk7XG4gIH1cbn0pO1xuXG5jaHJvbWUuY29udGV4dE1lbnVzLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcigoaW5mbywgdGFiKSA9PiB7XG4gIGlmIChpbmZvLm1lbnVJdGVtSWQgPT09IFwic2F2ZUltYWdlVG9DbG91ZFwiICYmIGluZm8uc3JjVXJsKSB7XG4gICAgY29uc3QgaW1hZ2VVcmwgPSBpbmZvLnNyY1VybDtcbiAgICBcbiAgICAvLyBZb3UgY2FuIG5vdyBwcm9jZXNzIHRoaXMgaW1hZ2UgVVJMIGZvciB1cGxvYWRcbiAgICBjb25zb2xlLmxvZygnSW1hZ2UgVVJMIHRvIHNhdmU6JywgaW1hZ2VVcmwpO1xuICAgIC8vIGhhdmUgdG8gaW1wbGVtZW50IHRvIHNhdmUgZm9yIGltYWdlIGRhdGEgdXJscyBub3QganVzdCBpbnRlcm5ldCB1cmxzXG4gICAgLy8gRXhhbXBsZTogSW5qZWN0IGEgY29udGVudCBzY3JpcHQgdG8gZmV0Y2ggdGhlIGltYWdlIGFzIGJsb2IgaW4gcGFnZSBjb250ZXh0ICh3aXRoIGNvb2tpZXMpXG4gICAgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcbiAgICAgICAgdGFyZ2V0OiB7IHRhYklkOiB0YWIuaWQgfSxcbiAgICAgICAgZnVuYzogYXN5bmMgKHVybCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgICAgICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuXG4gICAgICAgICAgLy8gQ29udmVydCBibG9iIHRvIEFycmF5QnVmZmVyIHNvIGl0IGNhbiBiZSBwYXNzZWQgdmlhIG1lc3NhZ2Ugc2FmZWx5XG4gICAgICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgYmxvYi5hcnJheUJ1ZmZlcigpO1xuICAgICAgICAgIGNvbnN0IGFycmF5ID0gQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShidWZmZXIpKTtcblxuICAgICAgICAgIC8vIFNlbmQgbWVzc2FnZSBmcm9tIHBhZ2UgY29udGV4dCB0byBiYWNrZ3JvdW5kXG4gICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBhY3Rpb246ICdJTUFHRV9EQVRBJywgZGF0YTogYXJyYXksIG5hbWU6IHVybC5zcGxpdCgnLycpLnBvcCgpIH0pO1xuICAgICAgICB9LFxuICAgICAgICBhcmdzOiBbaW1hZ2VVcmxdXG4gICAgICB9KTtcbiAgfVxufSk7XG4vL0hhbmRsZSBpbWFnZSB1cGxvYWRzXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoYXN5bmMgKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiR290IHRoZSBtZXNzYWdlIGZvciB1cGxvYWRcIilcbiAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAnSU1BR0VfREFUQScpIHtcbiAgICBjb25zdCB7IGRhdGEsIG5hbWUgfSA9IG1lc3NhZ2U7XG4gICAgLy8gQ29udmVydCBhcnJheSBiYWNrIHRvIGJsb2JcbiAgICBjb25zdCB1aW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFt1aW50OEFycmF5XSk7XG5cbiAgICAvLyBHZXQgcHJvdmlkZXIgc2V0dGluZyBhc3luY2hyb25vdXNseVxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbJ3NlbGVjdGVkUHJvdmlkZXInXSwgKHJlc3VsdCkgPT4ge1xuICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXN1bHQuc2VsZWN0ZWRQcm92aWRlcjtcblxuICAgICAgLy8gVXNlIHlvdXIgdXBsb2FkTWFuYWdlciB0byB1cGxvYWQgdGhlIGJsb2JcbiAgICAgIHVwbG9hZE1hbmFnZXIudXBsb2FkRmlsZShibG9iLCBwcm92aWRlciwgKHByb2dyZXNzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVcGxvYWQgcHJvZ3Jlc3M6JywgcHJvZ3Jlc3MpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBlbHNlIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gJ1BERl9EQVRBJykge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiR290IG1lc3NhZ2UgZm9yIHBkZiB1cGxvYWRcIilcbiAgICBjb25zdCB7ZGF0YSwgbmFtZX0gPSBtZXNzYWdlO1xuICAgIC8vY29udmVydCBhcnJheSBiYWNrIHRvIGJsb2JcbiAgICBjb25zdCB1aW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFt1aW50OEFycmF5XSk7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsnc2VsZWN0ZWRQcm92aWRlciddLCAocmVzdWx0KSA9PiB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IHJlc3VsdC5zZWxlY3RlZFByb3ZpZGVyO1xuXG4gICAgICAvLyBVc2UgeW91ciB1cGxvYWRNYW5hZ2VyIHRvIHVwbG9hZCB0aGUgYmxvYlxuICAgICAgdXBsb2FkTWFuYWdlci51cGxvYWRGaWxlKGJsb2IsIHByb3ZpZGVyLCAocHJvZ3Jlc3MpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1VwbG9hZCBwcm9ncmVzczonLCBwcm9ncmVzcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGVsc2UgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAnRE9DWF9EQVRBJykge1xuICAgIGNvbnN0IHtkYXRhLCBuYW1lfSA9IG1lc3NhZ2U7XG4gICAgIC8vY29udmVydCBhcnJheSBiYWNrIHRvIGJsb2JcbiAgICBjb25zdCB1aW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFt1aW50OEFycmF5XSk7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsnc2VsZWN0ZWRQcm92aWRlciddLCAocmVzdWx0KSA9PiB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IHJlc3VsdC5zZWxlY3RlZFByb3ZpZGVyO1xuXG4gICAgICAvLyBVc2UgeW91ciB1cGxvYWRNYW5hZ2VyIHRvIHVwbG9hZCB0aGUgYmxvYlxuICAgICAgdXBsb2FkTWFuYWdlci51cGxvYWRGaWxlKGJsb2IsIHByb3ZpZGVyLCAocHJvZ3Jlc3MpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1VwbG9hZCBwcm9ncmVzczonLCBwcm9ncmVzcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBlbHNlIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gJ3Byb2Nlc3NfaW1hZ2VzJykge1xuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkdvdCB0aGUgcmVxdWVzdCBmb3IgdGhlIGltYWdlc1wiKTtcbiAgICAgICAgY29uc3QgYmFzZTY0TWFwID0gYXdhaXQgZ2V0SW1hZ2VzQXNCYXNlNjQobWVzc2FnZS5pbWFnZVVybHMpO1xuICAgICAgICBjb25zb2xlLmxvZyhiYXNlNjRNYXApO1xuICAgICAgICBzZW5kUmVzcG9uc2UoYmFzZTY0TWFwKTtcbiAgICB9KSgpO1xuICAgIHJldHVybiB0cnVlOyAvLyBLZWVwIHRoZSBtZXNzYWdlIGNoYW5uZWwgb3BlblxuICB9XG5cbn0pO1xuXG5cblxuLy8gVG8gZ2V0IGltYWdlcyBhcyBiYXNlNjRcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGxpc3Qgb2YgaW1hZ2UgVVJMcyB0byBCYXNlNjQgRGF0YSBVUkxzIHVzaW5nIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdCdzIFxuICogZWxldmF0ZWQgcGVybWlzc2lvbnMgdG8gYnlwYXNzIHBvdGVudGlhbCBDT1JTIHJlc3RyaWN0aW9ucy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGltYWdlVXJscyAtIEFycmF5IG9mIHJlbW90ZSBpbWFnZSBVUkxzLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0PHN0cmluZywgc3RyaW5nPj59IEEgbWFwIG9mIG9yaWdpbmFsIFVSTCB0byBCYXNlNjQgRGF0YSBVUkwuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldEltYWdlc0FzQmFzZTY0KGltYWdlVXJscykge1xuICAgIGNvbnN0IGJhc2U2NE1hcCA9IHt9O1xuICAgIGNvbnN0IHByb21pc2VzID0gaW1hZ2VVcmxzLm1hcChhc3luYyAodXJsKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGZXRjaCBvcGVyYXRpb24gZnJvbSB0aGUgYmFja2dyb3VuZCBzY3JpcHQgaXMgb2Z0ZW4gbm90IHJlc3RyaWN0ZWQgYnkgQ09SUy5cbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaDogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuXG4gICAgICAgICAgICAvLyBDb252ZXJ0IEJsb2IgdG8gQmFzZTY0IERhdGEgVVJMXG4gICAgICAgICAgICBjb25zdCBiYXNlNjQgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4gcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZWFkZXIub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBiYXNlNjRNYXBbdXJsXSA9IGJhc2U2NDtcblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEZhaWxlZCB0byBwcm9jZXNzIGltYWdlICR7dXJsfTpgLCBlKTtcbiAgICAgICAgICAgIGJhc2U2NE1hcFt1cmxdID0gJyc7IC8vIFVzZSBlbXB0eSBzdHJpbmcgZm9yIGZhaWx1cmVcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIHJldHVybiBiYXNlNjRNYXA7XG59XG5cbi8vIFVwZGF0ZSB0aGUgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlIGxpc3RlbmVyIGluIGJhY2tncm91bmQuanNcbi8vIHRvIGluY2x1ZGUgdGhpcyBuZXcgYWN0aW9uOlxuXG4vKiAuLi4gKEV4aXN0aW5nIGF1dGhlbnRpY2F0aW9uIGFuZCBjb252ZXJ0X2FuZF91cGxvYWQgaGFuZGxlcnMpIC4uLiAqL1xuXG5cblxuXG4vLyBiYXNlNjQgaW1hZ2VzXG5cblxuLy8gU3RhdGUgb2YgdGhlIHByb2l2aWRlclxuZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbJ3NlbGVjdGVkUHJvdmlkZXInXSwgKHJlc3VsdCkgPT4ge1xuICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXN1bHQuc2VsZWN0ZWRQcm92aWRlcjtcbiAgICBjb25zb2xlLmxvZyhcIlByb3ZvZGVyXCIsIHByb3ZpZGVyKVxuICAgICBcbiAgfSlcbn1cblxuZ2V0U3RhdGUoKVxuXG5cblxuXG5cblxuXG4iLCJpbXBvcnQgT0F1dGhNYW5hZ2VyIGZyb20gJy4vb2F1dGgtbWFuYWdlci5qcyc7XG5cbmNsYXNzIFVwbG9hZE1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9hdXRoTWFuYWdlciA9IG5ldyBPQXV0aE1hbmFnZXIoKTtcbiAgICB0aGlzLnVwbG9hZGVycyA9IHtcbiAgICAgIGdvb2dsZURyaXZlOiB0aGlzLnVwbG9hZFRvR29vZ2xlRHJpdmUuYmluZCh0aGlzKSxcbiAgICAgIG9uZWRyaXZlOiB0aGlzLnVwbG9hZFRvT25lRHJpdmUuYmluZCh0aGlzKSxcbiAgICAgIGRyb3Bib3g6IHRoaXMudXBsb2FkVG9Ecm9wYm94LmJpbmQodGhpcylcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgdXBsb2FkRmlsZShmaWxlLCBwcm92aWRlciwgcHJvZ3Jlc3NDYWxsYmFjaykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHRoaXMub2F1dGhNYW5hZ2VyLmF1dGhlbnRpY2F0ZShwcm92aWRlcik7XG4gICAgICBjb25zdCB1cGxvYWRlciA9IHRoaXMudXBsb2FkZXJzW3Byb3ZpZGVyXTtcbiAgICAgIGlmICghdXBsb2FkZXIpIHRocm93IG5ldyBFcnJvcihgTm8gdXBsb2FkZXIgZm9yICR7cHJvdmlkZXJ9YCk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1cGxvYWRlcihmaWxlLCB0b2tlbiwgcHJvZ3Jlc3NDYWxsYmFjayk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBVcGxvYWQgZXJyb3IgZm9yICR7cHJvdmlkZXJ9OmAsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwbG9hZCBHb29nbGUgRHJpdmUgdXNpbmcgZmV0Y2ggd2l0aCBtdWx0aXBhcnQgZm9ybWRhdGEgYW5kIHByb2dyZXNzIHZpYSBYTUxIdHRwUmVxdWVzdCB3b3JrYXJvdW5kIChsaW1pdGVkIHN1cHBvcnQpXG4gIGFzeW5jIHVwbG9hZFRvR29vZ2xlRHJpdmUoZmlsZSwgYWNjZXNzVG9rZW4sIHByb2dyZXNzQ2FsbGJhY2spIHtcbiAgICBjb25zdCBtZXRhZGF0YSA9IHsgbmFtZTogZmlsZS5uYW1lLCBtaW1lVHlwZTogZmlsZS50eXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nIH07XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ21ldGFkYXRhJywgbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KG1ldGFkYXRhKV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcblxuICAgIC8vIFVuZm9ydHVuYXRlbHkgZmV0Y2ggdXBsb2FkIHByb2dyZXNzIGlzIG5vdCB3aWRlbHkgc3VwcG9ydGVkIGluIHNlcnZpY2Ugd29ya2VyXG4gICAgLy8gWW91IGNhbiBvbWl0IHByb2dyZXNzQ2FsbGJhY2sgb3IgaW1wbGVtZW50IHVzaW5nIFhNTEh0dHBSZXF1ZXN0IGluIFVJIGNvbnRleHQgaWYgbmVlZGVkXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS91cGxvYWQvZHJpdmUvdjMvZmlsZXM/dXBsb2FkVHlwZT1tdWx0aXBhcnQmZmllbGRzPWlkLG5hbWUsd2ViVmlld0xpbmsnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YFxuICAgICAgfSxcbiAgICAgIGJvZHk6IGZvcm1EYXRhXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYFVwbG9hZCBmYWlsZWQ6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZmlsZUlkOiBkYXRhLmlkLCBmaWxlTmFtZTogZGF0YS5uYW1lLCB3ZWJWaWV3TGluazogZGF0YS53ZWJWaWV3TGluayB9O1xuICB9XG5cbiAgYXN5bmMgdXBsb2FkVG9PbmVEcml2ZShmaWxlLCBhY2Nlc3NUb2tlbiwgcHJvZ3Jlc3NDYWxsYmFjaykge1xuICAgIGlmIChmaWxlLnNpemUgPCA0ICogMTAyNCAqIDEwMjQpIHtcbiAgICAgIHJldHVybiB0aGlzLnVwbG9hZFRvT25lRHJpdmVTaW1wbGUoZmlsZSwgYWNjZXNzVG9rZW4sIHByb2dyZXNzQ2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy51cGxvYWRUb09uZURyaXZlUmVzdW1hYmxlKGZpbGUsIGFjY2Vzc1Rva2VuLCBwcm9ncmVzc0NhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyB1cGxvYWRUb09uZURyaXZlU2ltcGxlKGZpbGUsIGFjY2Vzc1Rva2VuLCBwcm9ncmVzc0NhbGxiYWNrKSB7XG4gICAgY29uc3QgdXBsb2FkVXJsID0gYGh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS92MS4wL21lL2RyaXZlL3Jvb3Q6LyR7ZW5jb2RlVVJJQ29tcG9uZW50KGZpbGUubmFtZSl9Oi9jb250ZW50YDtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXBsb2FkVXJsLCB7XG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogZmlsZS50eXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nXG4gICAgICB9LFxuICAgICAgYm9keTogZmlsZVxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBVcGxvYWQgZmFpbGVkOiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGZpbGVJZDogZGF0YS5pZCwgZmlsZU5hbWU6IGRhdGEubmFtZSwgd2ViVXJsOiBkYXRhLndlYlVybCB9O1xuICB9XG5cbiAgYXN5bmMgdXBsb2FkVG9PbmVEcml2ZVJlc3VtYWJsZShmaWxlLCBhY2Nlc3NUb2tlbiwgcHJvZ3Jlc3NDYWxsYmFjaykge1xuICAgIGNvbnN0IGNyZWF0ZVNlc3Npb25VcmwgPSBgaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL3YxLjAvbWUvZHJpdmUvcm9vdDovJHtlbmNvZGVVUklDb21wb25lbnQoZmlsZS5uYW1lKX06L2NyZWF0ZVVwbG9hZFNlc3Npb25gO1xuXG4gICAgY29uc3Qgc2Vzc2lvblJlc3BvbnNlID0gYXdhaXQgZmV0Y2goY3JlYXRlU2Vzc2lvblVybCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2FjY2Vzc1Rva2VufWAsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGl0ZW06IHsgJ0BtaWNyb3NvZnQuZ3JhcGguY29uZmxpY3RCZWhhdmlvcic6ICdyZW5hbWUnIH1cbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlc3Npb25SZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gY3JlYXRlIHVwbG9hZCBzZXNzaW9uOiAke3Nlc3Npb25SZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuXG4gICAgY29uc3Qgc2Vzc2lvbkRhdGEgPSBhd2FpdCBzZXNzaW9uUmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IHVwbG9hZFVybCA9IHNlc3Npb25EYXRhLnVwbG9hZFVybDtcblxuICAgIGNvbnN0IGNodW5rU2l6ZSA9IDMyMCAqIDEwMjQgKiAxMDsgLy8gMy4yIE1CXG4gICAgbGV0IG9mZnNldCA9IDA7XG5cbiAgICB3aGlsZSAob2Zmc2V0IDwgZmlsZS5zaXplKSB7XG4gICAgICBjb25zdCBjaHVuayA9IGZpbGUuc2xpY2Uob2Zmc2V0LCBNYXRoLm1pbihvZmZzZXQgKyBjaHVua1NpemUsIGZpbGUuc2l6ZSkpO1xuICAgICAgY29uc3QgY2h1bmtCdWZmZXIgPSBhd2FpdCBjaHVuay5hcnJheUJ1ZmZlcigpO1xuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVwbG9hZFVybCwge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogY2h1bmtCdWZmZXIuYnl0ZUxlbmd0aC50b1N0cmluZygpLFxuICAgICAgICAgICdDb250ZW50LVJhbmdlJzogYGJ5dGVzICR7b2Zmc2V0fS0ke29mZnNldCArIGNodW5rQnVmZmVyLmJ5dGVMZW5ndGggLSAxfS8ke2ZpbGUuc2l6ZX1gXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IGNodW5rQnVmZmVyXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vayAmJiByZXNwb25zZS5zdGF0dXMgIT09IDIwMikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENodW5rIHVwbG9hZCBmYWlsZWQ6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgIH1cblxuICAgICAgb2Zmc2V0ICs9IGNodW5rQnVmZmVyLmJ5dGVMZW5ndGg7XG5cbiAgICAgIGlmIChwcm9ncmVzc0NhbGxiYWNrKSB7XG4gICAgICAgIHByb2dyZXNzQ2FsbGJhY2soKG9mZnNldCAvIGZpbGUuc2l6ZSkgKiAxMDApO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDEgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBmaWxlSWQ6IHJlc3VsdC5pZCwgZmlsZU5hbWU6IHJlc3VsdC5uYW1lLCB3ZWJVcmw6IHJlc3VsdC53ZWJVcmwgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyB1cGxvYWRUb0Ryb3Bib3goZmlsZSwgYWNjZXNzVG9rZW4sIHByb2dyZXNzQ2FsbGJhY2spIHtcbiAgICBjb25zdCBhcnJheUJ1ZmZlciA9IGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKTtcbiAgICAvLyBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMub2F1dGhNYW5hZ2VyLmdldERyb3Bib3hBY2Nlc3NUb2tlbihjb2RlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2NvbnRlbnQuZHJvcGJveGFwaS5jb20vMi9maWxlcy91cGxvYWQnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICAgICAnRHJvcGJveC1BUEktQXJnJzogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHBhdGg6ICcvQXBwcy9Eb3duZHJpdmUnICsgZmlsZS5uYW1lLFxuICAgICAgICAgIG1vZGU6ICdhZGQnLFxuICAgICAgICAgIGF1dG9yZW5hbWU6IHRydWUsXG4gICAgICAgICAgbXV0ZTogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBib2R5OiBhcnJheUJ1ZmZlclxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShlcnJvckRhdGEsIG51bGwsIDIpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVXBsb2FkIGZhaWxlZDogJHtlcnJvck1lc3NhZ2V9YCk7XG4gIH1cblxuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGZpbGVJZDogZGF0YS5pZCwgZmlsZU5hbWU6IGRhdGEubmFtZSwgcGF0aERpc3BsYXk6IGRhdGEucGF0aF9kaXNwbGF5IH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXBsb2FkTWFuYWdlcjtcbiIsIi8vIE9BdXRoIE1hbmFnZXIgLSBIYW5kbGVzIGF1dGhlbnRpY2F0aW9uIGZvciBtdWx0aXBsZSBjbG91ZCBwcm92aWRlcnNcbmNsYXNzIE9BdXRoTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvdmlkZXJzID0ge1xuICAgICAgZ29vZ2xlRHJpdmU6IHtcbiAgICAgICAgYXV0aFVybDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoJyxcbiAgICAgICAgdG9rZW5Vcmw6ICdodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbicsXG4gICAgICAgIGNsaWVudElkOiAnMzEwMDYwMDU1MzA1LXE5bXVqZGdscmg5MnFrN2k2Y2NmN2E1ajcyZnQ0b3A4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICAgICAgc2NvcGVzOiBbJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuZmlsZSddLFxuICAgICAgICByZWRpcmVjdFVyaTogY2hyb21lLmlkZW50aXR5LmdldFJlZGlyZWN0VVJMKClcbiAgICAgIH0sXG4gICAgICBvbmVkcml2ZToge1xuICAgICAgICBhdXRoVXJsOiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2NvbW1vbi9vYXV0aDIvdjIuMC9hdXRob3JpemUnLFxuICAgICAgICB0b2tlblVybDogJ2h0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9jb21tb24vb2F1dGgyL3YyLjAvdG9rZW4nLFxuICAgICAgICBjbGllbnRJZDogJ2Y4NTkwOTg0LWI1MjUtNDg4YS05MWRlLThiYjgzYmUwZWUzNycsXG4gICAgICAgIHNjb3BlczogWydGaWxlcy5SZWFkV3JpdGUnLCAnb2ZmbGluZV9hY2Nlc3MnXSxcbiAgICAgICAgcmVkaXJlY3RVcmk6IGNocm9tZS5pZGVudGl0eS5nZXRSZWRpcmVjdFVSTCgpXG4gICAgICB9LFxuICAgICAgZHJvcGJveDoge1xuICAgICAgICBhdXRoVXJsOiAnaHR0cHM6Ly93d3cuZHJvcGJveC5jb20vb2F1dGgyL2F1dGhvcml6ZScsXG4gICAgICAgIGNsaWVudElkOiAndzliMGtleW1qajltMGN3JyxcbiAgICAgICAgY2xpZW50U2VjcmV0OiBcInozMXZpbHgwZ3VhNTR2Y1wiLFxuICAgICAgICBzY29wZXM6IFsnZmlsZXMuY29udGVudC53cml0ZSddLFxuICAgICAgICByZWRpcmVjdFVyaTogY2hyb21lLmlkZW50aXR5LmdldFJlZGlyZWN0VVJMKClcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKGNocm9tZS5pZGVudGl0eS5nZXRSZWRpcmVjdFVSTCgpKVxuICB9XG5cbiAgLyoqXG4gICAqIEF1dGhlbnRpY2F0ZSB3aXRoIGEgY2xvdWQgcHJvdmlkZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3ZpZGVyIC0gUHJvdmlkZXIgbmFtZSAoZ29vZ2xlRHJpdmUsIG9uZWRyaXZlLCBkcm9wYm94KVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBBY2Nlc3MgdG9rZW5cbiAgICovXG4gIGFzeW5jIGF1dGhlbnRpY2F0ZShwcm92aWRlcikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLnByb3ZpZGVyc1twcm92aWRlcl07XG4gICAgICBpZiAoIWNvbmZpZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcHJvdmlkZXI6ICR7cHJvdmlkZXJ9YCk7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgYSBjYWNoZWQgdG9rZW5cbiAgICAgIGNvbnN0IGNhY2hlZFRva2VuID0gYXdhaXQgdGhpcy5nZXRDYWNoZWRUb2tlbihwcm92aWRlcik7XG4gICAgICBpZiAoY2FjaGVkVG9rZW4gJiYgYXdhaXQgdGhpcy5pc1Rva2VuVmFsaWQocHJvdmlkZXIsIGNhY2hlZFRva2VuKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNpbmcgY2FjaGVkIHRva2VuIGZvciAke3Byb3ZpZGVyfWApO1xuICAgICAgICByZXR1cm4gY2FjaGVkVG9rZW47XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBuZXcgdG9rZW5cbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5nZXROZXdUb2tlbihwcm92aWRlciwgY29uZmlnKTtcbiAgICAgIFxuICAgICAgLy8gQ2FjaGUgdGhlIHRva2VuXG4gICAgICBhd2FpdCB0aGlzLmNhY2hlVG9rZW4ocHJvdmlkZXIsIHRva2VuKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBBdXRoZW50aWNhdGlvbiBlcnJvciBmb3IgJHtwcm92aWRlcn06YCwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cblxuXG5cbiAgLyoqXG4gICAqIEdldCBhIG5ldyBhY2Nlc3MgdG9rZW4gdmlhIE9BdXRoIGZsb3dcbiAgICovXG4gIGFzeW5jIGdldE5ld1Rva2VuKHByb3ZpZGVyLCBjb25maWcpIHtcbiAgICBjb25zdCBhdXRoVXJsID0gdGhpcy5idWlsZEF1dGhVcmwocHJvdmlkZXIsIGNvbmZpZyk7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNocm9tZS5pZGVudGl0eS5sYXVuY2hXZWJBdXRoRmxvdyhcbiAgICAgICAge1xuICAgICAgICAgIHVybDogYXV0aFVybCxcbiAgICAgICAgICBpbnRlcmFjdGl2ZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICAocmVkaXJlY3RVcmwpID0+IHtcbiAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5leHRyYWN0VG9rZW4ocmVkaXJlY3RVcmwsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgIHJlc29sdmUodG9rZW4pO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBPQXV0aCBhdXRob3JpemF0aW9uIFVSTFxuICAgKi9cbiAgYnVpbGRBdXRoVXJsKHByb3ZpZGVyLCBjb25maWcpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgIGNsaWVudF9pZDogY29uZmlnLmNsaWVudElkLFxuICAgICAgcmVkaXJlY3RfdXJpOiBjb25maWcucmVkaXJlY3RVcmksXG4gICAgICByZXNwb25zZV90eXBlOiAndG9rZW4nLFxuICAgICAgc2NvcGU6IGNvbmZpZy5zY29wZXMuam9pbignICcpXG4gICAgfSk7XG5cbiAgICAvLyBPbmVEcml2ZSB1c2VzIGRpZmZlcmVudCBwYXJhbWV0ZXIgbmFtZXNcbiAgICBpZiAocHJvdmlkZXIgPT09ICdvbmVkcml2ZScpIHtcbiAgICAgIHBhcmFtcy5zZXQoJ3Jlc3BvbnNlX21vZGUnLCAnZnJhZ21lbnQnKTtcbiAgICB9XG5cbiAgICAvLyBEcm9wYm94IGRvZXNuJ3QgdXNlIHNjb3BlIHBhcmFtZXRlciB0aGUgc2FtZSB3YXlcbiAgICBpZiAocHJvdmlkZXIgPT09ICdkcm9wYm94Jykge1xuICAgICAgcGFyYW1zLnNldCgndG9rZW5fYWNjZXNzX3R5cGUnLCAnb2ZmbGluZScpO1xuICAgICAgcGFyYW1zLnNldCgnY2xpZW50X3NlY3JldCcsIGNvbmZpZy5jbGllbnRTZWNyZXQpXG4gICAgICBwYXJhbXMuc2V0KCdyZXNwb25zZV90eXBlJywnY29kZScpXG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2NvbmZpZy5hdXRoVXJsfT8ke3BhcmFtcy50b1N0cmluZygpfWA7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBhY2Nlc3MgdG9rZW4gZnJvbSByZWRpcmVjdCBVUkxcbiAgICovXG4gIGV4dHJhY3RUb2tlbihyZWRpcmVjdFVybCwgcHJvdmlkZXIpIHtcbiAgICBpZiAoIXJlZGlyZWN0VXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHJlZGlyZWN0IFVSTCByZWNlaXZlZCcpO1xuICAgIH1cblxuICAgIC8vIFBhcnNlIHRoZSBVUkwgZnJhZ21lbnQgZm9yIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlZGlyZWN0VXJsKTtcbiAgICBjb25zb2xlLmxvZyhcIkdvdCB1cmxcIiwgdXJsKVxuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsLmhhc2guc3Vic3RyaW5nKDEpKTtcbiAgICBcbiAgICB2YXIgYWNjZXNzVG9rZW5cblxuICAgIC8vIGZvciBkcm9wYm94IGl0IHVzZXMgY29kZSBpbnN0ZWFkIG9mIGFjY2Vzc190b2tlblxuICAgIGlmIChwcm92aWRlciA9PSAnZHJvcGJveCcpe1xuICAgICAgY29uc3QgY29kZSA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiY29kZVwiKVxuICAgICAgYWNjZXNzVG9rZW4gPSB0aGlzLmdldERyb3Bib3hBY2Nlc3NUb2tlbihjb2RlKVxuICAgICAgY29uc29sZS5sb2coXCJUb2tlbi9jb2RlXCIsIGFjY2Vzc1Rva2VuKVxuICAgICAgaWYgKCFhY2Nlc3NUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY2Nlc3MgdG9rZW4gaW4gcmVkaXJlY3QgVVJMJyk7XG4gICAgfVxuICAgIH1cbiAgXG4gICAgZWxzZXtcbiAgICBhY2Nlc3NUb2tlbiA9IHBhcmFtcy5nZXQoJ2FjY2Vzc190b2tlbicpO1xuICAgIGlmICghYWNjZXNzVG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYWNjZXNzIHRva2VuIGluIHJlZGlyZWN0IFVSTCcpO1xuICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gY29uc3QgYWNjZXNzVG9rZW4gPSBwYXJhbXMuZ2V0KCdhY2Nlc3NfdG9rZW4nKTtcbiAgICAvLyBpZiAoIWFjY2Vzc1Rva2VuKSB7XG4gICAgLy8gICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFjY2VzcyB0b2tlbiBpbiByZWRpcmVjdCBVUkwnKTtcbiAgICAvLyB9XG5cbiAgICByZXR1cm4gYWNjZXNzVG9rZW47XG4gIH1cblxuICAvKipcbiAgICogQ2FjaGUgdG9rZW4gaW4gQ2hyb21lIHN0b3JhZ2VcbiAgICovXG4gIGFzeW5jIGNhY2hlVG9rZW4ocHJvdmlkZXIsIHRva2VuKSB7XG4gICAgY29uc3Qga2V5ID0gYHRva2VuXyR7cHJvdmlkZXJ9YDtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IFtrZXldOiBkYXRhIH0sIHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjYWNoZWQgdG9rZW4gZnJvbSBDaHJvbWUgc3RvcmFnZVxuICAgKi9cbiAgYXN5bmMgZ2V0Q2FjaGVkVG9rZW4ocHJvdmlkZXIpIHtcbiAgICBjb25zdCBrZXkgPSBgdG9rZW5fJHtwcm92aWRlcn1gO1xuICAgIFxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtrZXldLCAocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHRba2V5XSkge1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0W2tleV0udG9rZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRva2VuIGlzIHN0aWxsIHZhbGlkIChiYXNpYyB0aW1lLWJhc2VkIGNoZWNrKVxuICAgKi9cbiAgYXN5bmMgaXNUb2tlblZhbGlkKHByb3ZpZGVyLCB0b2tlbikge1xuICAgIGNvbnN0IGtleSA9IGB0b2tlbl8ke3Byb3ZpZGVyfWA7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW2tleV0sIChyZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKCFyZXN1bHRba2V5XSkge1xuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnNpZGVyIHRva2VuIHZhbGlkIGZvciA1MCBtaW51dGVzIChtb3N0IHRva2VucyBsYXN0IDYwIG1pbnV0ZXMpXG4gICAgICAgIGNvbnN0IG1heEFnZSA9IDUwICogNjAgKiAxMDAwO1xuICAgICAgICBjb25zdCBhZ2UgPSBEYXRlLm5vdygpIC0gcmVzdWx0W2tleV0udGltZXN0YW1wO1xuICAgICAgICByZXNvbHZlKGFnZSA8IG1heEFnZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2FjaGVkIHRva2VuIChsb2dvdXQpXG4gICAqL1xuICBhc3luYyBsb2dvdXQocHJvdmlkZXIpIHtcbiAgICBjb25zdCBrZXkgPSBgdG9rZW5fJHtwcm92aWRlcn1gO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKFtrZXldLCByZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIGNhY2hlZCB0b2tlbnNcbiAgICovXG4gIGFzeW5jIGxvZ291dEFsbCgpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5wcm92aWRlcnMpLm1hcChwID0+IGB0b2tlbl8ke3B9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoa2V5cywgcmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgZ2V0RHJvcGJveEFjY2Vzc1Rva2VuKGNvZGUpe1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdjb2RlJywgY29kZSk7XG4gICAgcGFyYW1zLmFwcGVuZCgnZ3JhbnRfdHlwZScsJ2F1dGhvcml6YXRpb25fY29kZScpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ2NsaWVudF9pZCcsdGhpcy5wcm92aWRlcnMuZHJvcGJveC5jbGllbnRJZCk7XG4gICAgcGFyYW1zLmFwcGVuZCgnY2xpZW50X3NlY3JldCcsdGhpcy5wcm92aWRlcnMuZHJvcGJveC5jbGllbnRTZWNyZXQpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ3JlZGlyZWN0X3VyaScsIHRoaXMucHJvdmlkZXJzLm9uZWRyaXZlLnJlZGlyZWN0VXJpKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5kcm9wYm94YXBpLmNvbS9vYXV0aDIvdG9rZW5cIiwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxuICAgICAgYm9keTogcGFyYW1zXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG9tIGV4Y2hhbmdlIGNvZGUgZm9yIHRva2VuOiAnKyBhd2FpdCByZXNwb25zZS50ZXh0KCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGRhdGEuYWNjZXNzX3Rva2VuO1xuICB9XG5cbn1cblxuLy8gRXhwb3J0IGZvciB1c2UgaW4gb3RoZXIgbW9kdWxlc1xuZXhwb3J0IGRlZmF1bHQgT0F1dGhNYW5hZ2VyOyIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKFxuICAgICAga2V5ID09PSAnZGVmYXVsdCcgfHxcbiAgICAgIGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8XG4gICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGVzdCwga2V5KVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJzZXJ2aWNlLXdvcmtlci5IQVNIX1JFRl9iOTU4MGZjYTY4NTNlMGEzLmpzLm1hcCJ9
