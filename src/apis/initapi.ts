import axios,{AxiosResponse} from "axios";
import JSZip, {OutputType as JSZipOutputType} from "jszip";
import xml2js, {Parser, Builder, parseString} from "xml2js";
import axiosInstance from './axiosInstance'

interface Company {
  corp_code: string,
  corp_name: string,
  stock_code: string,
  modify_date: string
}


// indexedDB 초기설정
const openDB = ():Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("myDatabase", 1);
    
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const objectStore = db.createObjectStore("companies", {
        keyPath: "corp_code",
      });
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event);
    };
  });
};

// DB에 회사명-코드가 있는지 확인
export const dbChecker = async() => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
  const transaction = db.transaction(["companies"], "readonly");
  const objectStore = transaction.objectStore('companies');
  const datas = objectStore.getAll()
  datas.onsuccess = e => {
    // console.log(e.target.result=== undefined ? false : true)
    resolve(!(e.target as any).result === undefined)
  }
})
}

//indexedDB에 데이터 저장
const saveToIndexedDB =  async (companiesList: Array<Company>): Promise<void> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["companies"], "readwrite");
    const objectStore = transaction.objectStore("companies");
    
    companiesList.forEach((company) => {
      objectStore.put(company);
    });

    transaction.oncomplete = (event: Event) => {
      resolve();
    };

    transaction.onerror = (event: any) => {
      reject(event);
    };

    db.close();
  });
};

// downloadzip 함수 (app.js에서 useEffect로 마운트 시점에 실해되어야함)
export const downloadZip = async (): Promise<void> => {
  
    try {
      const response = await axiosInstance.get('/api/download-zip');
      const companiesList = response.data.result.list;
      console.log(response)
      
      if (companiesList) {
        await saveToIndexedDB(companiesList);
      }
    } catch (e) {
      console.log(e);
    }
  
};
