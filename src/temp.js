async function getImagesAsBase64(imageUrls) {
    
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