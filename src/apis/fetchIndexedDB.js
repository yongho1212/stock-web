export const fetchIndexedDB = async () => {
    const openRequest = indexedDB.open("myDatabase", 1);

    return new Promise((resolve, reject) => {
      openRequest.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(["companies"], "readonly");
        const objectStore = transaction.objectStore("companies");
        const readAllRequest = objectStore.getAll();

        readAllRequest.onsuccess = function (event) {
          resolve(event.target.result);
        };

        readAllRequest.onerror = function (event) {
          reject(event);
        };
      };

      openRequest.onerror = function (event) {
        reject(event);
      };
    });
  };