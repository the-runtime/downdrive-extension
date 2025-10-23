function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FileStorageDB', 1);
    request.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'name' });
      }
    };
    request.onsuccess = e => resolve(e.target.result);
    request.onerror = e => reject(e.target.error);
  });
}

async function storeFileInIndexedDB(fileBlob, fileName) {
  const db = await openDB();
  const tx = db.transaction(['files'], 'readwrite');
  const store = tx.objectStore('files');

  store.put({ name: fileName, data: fileBlob });

  return tx.complete;
}

function saveToCloud() {
    // code to transfer file saved in local storage to cloud
}