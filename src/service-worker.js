// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// Service Worker - Background script for handling events
import UploadManager from './lib/upload-manager.js'

// Initialize UploadManager
const uploadManager = new UploadManager();


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
//  */
// async function handleAuthentication(provider) {
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
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details.reason);
  
  if (details.reason === 'install') {
    // First time installation
    chrome.storage.local.set({
      selectedProvider: 'googleDrive',
      uploadHistory: []
    });
  }
});

// adds opption for conetxtMenus
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveImageToCloud",
    title: "Save Image to Cloud",
    contexts: ["image"]
  });
  chrome.contextMenus.create({
    id: "saveSelectionToCloud",
    title: "Save selection to Cloud",
    contexts: ["selection"]
  });
  // chrome.contextMenus.create({
  //   id: "savePageAsPdf",
  //   title: "Save Page as Pdf to cloud",
  //   contexts: ["page"]
  // });
});



// Handler for pdf
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "savePageAsPdf"){
    console.log("In the click from content-menu")
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]?.id) {
        console.log("in the tab section")
        chrome.tabs.sendMessage(tabs[0].id, { action: 'convertHtmlToDocx' }, response => {
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
})



// Handle context menu clicks
// Needs to implement it
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveSelectionToCloud" && info.selectionText) {
    //const selectedText = info.selectionText;
    //  uploadManager.uploadFile(selectedText, )
     chrome.tabs.sendMessage(tab.id, { action: "saveSelectionToCloud" });
    console.log('Selected text:', selectedText);
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveImageToCloud" && info.srcUrl) {
    const imageUrl = info.srcUrl;
    
    // You can now process this image URL for upload
    console.log('Image URL to save:', imageUrl);
    // have to implement to save for image data urls not just internet urls
    // Example: Inject a content script to fetch the image as blob in page context (with cookies)
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async (url) => {
          const response = await fetch(url);
          const blob = await response.blob();

          // Convert blob to ArrayBuffer so it can be passed via message safely
          const buffer = await blob.arrayBuffer();
          const array = Array.from(new Uint8Array(buffer));

          // Send message from page context to background
          chrome.runtime.sendMessage({ action: 'IMAGE_DATA', data: array, name: url.split('/').pop() });
        },
        args: [imageUrl]
      });
  }
});
//Handle image uploads
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log("Got the message for upload")
  if (message.action === 'IMAGE_DATA') {
    const { data, name } = message;
    // Convert array back to blob
    const uint8Array = new Uint8Array(data);
    const blob = new Blob([uint8Array]);

    // Get provider setting asynchronously
    chrome.storage.local.get(['selectedProvider'], (result) => {
      const provider = result.selectedProvider;

      // Use your uploadManager to upload the blob
      uploadManager.uploadFile(blob, provider, (progress) => {
        console.log('Upload progress:', progress);
      });
    });
  }

  else if (message.action === 'PDF_DATA') {
    // console.log("Got message for pdf upload")
    const {data, name} = message;
    //convert array back to blob
    const uint8Array = new Uint8Array(data);
    const blob = new Blob([uint8Array]);
    chrome.storage.local.get(['selectedProvider'], (result) => {
      const provider = result.selectedProvider;

      // Use your uploadManager to upload the blob
      uploadManager.uploadFile(blob, provider, (progress) => {
        console.log('Upload progress:', progress);
      });
    });
  }

  else if (message.action === 'DOCX_DATA') {
    const {data, name} = message;
     //convert array back to blob
    const uint8Array = new Uint8Array(data);
    const blob = new Blob([uint8Array]);
    chrome.storage.local.get(['selectedProvider'], (result) => {
      const provider = result.selectedProvider;

      // Use your uploadManager to upload the blob
      uploadManager.uploadFile(blob, provider, (progress) => {
        console.log('Upload progress:', progress);
      });
    });
  }
  else if (message.action === 'process_images') {
    (async () => {
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
 */
async function getImagesAsBase64(imageUrls) {
    const base64Map = {};
    const promises = imageUrls.map(async (url) => {
        try {
            // Fetch operation from the background script is often not restricted by CORS.
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }
            
            const blob = await response.blob();

            // Convert Blob to Base64 Data URL
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
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

/* ... (Existing authentication and convert_and_upload handlers) ... */




// base64 images


// State of the proivider
function getState() {
  chrome.storage.local.get(['selectedProvider'], (result) => {
      const provider = result.selectedProvider;
    console.log("Provoder", provider)
     
  })
}

getState()







