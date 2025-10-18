// Service Worker - Background script for handling events
import OAuthManager from './oauth-manager.js';

// Initialize OAuth manager
const oauthManager = new OAuthManager();

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details.reason);
  
  if (details.reason === 'install') {
    // First time installation
    chrome.storage.local.set({
      defaultProvider: 'googleDrive',
      uploadHistory: []
    });
  }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'authenticate') {
    handleAuthentication(request.provider)
      .then(token => sendResponse({ success: true, token }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'upload') {
    handleUpload(request.file, request.provider)
      .then(result => sendResponse({ success: true, result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }

  if (request.action === 'getUploadHistory') {
    getUploadHistory()
      .then(history => sendResponse({ success: true, history }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

/**
 * Handle authentication request
 */
async function handleAuthentication(provider) {
  try {
    const token = await oauthManager.authenticate(provider);
    console.log(`Successfully authenticated with ${provider}`);
    return token;
  } catch (error) {
    console.error(`Authentication failed for ${provider}:`, error);
    throw error;
  }
}

/**
 * Handle file upload request
 */
async function handleUpload(fileData, provider) {
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
    
    return { success: true };
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}

/**
 * Get upload history from storage
 */
async function getUploadHistory() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['uploadHistory'], (result) => {
      resolve(result.uploadHistory || []);
    });
  });
}

/**
 * Add entry to upload history
 */
async function addToUploadHistory(entry) {
  const history = await getUploadHistory();
  history.unshift(entry);
  
  // Keep only last 50 entries
  if (history.length > 50) {
    history.splice(50);
  }
  
  return new Promise((resolve) => {
    chrome.storage.local.set({ uploadHistory: history }, resolve);
  });
}

// Listen for alarm events (for token refresh, etc.)
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshTokens') {
    console.log('Token refresh alarm triggered');
    // Add token refresh logic here if needed
  }
});

// Create periodic alarm for maintenance tasks
chrome.alarms.create('refreshTokens', {
  periodInMinutes: 30
});

console.log('Service worker initialized');