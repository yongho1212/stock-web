import axios,{AxiosResponse} from "axios";
import JSZip, {OutputType as JSZipOutputType} from "jszip";
import xml2js, {Parser, Builder, parseString} from "xml2js";

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
  const apiKey = process.env.REACT_APP_DART_API_KEY;
  const url = `https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${apiKey}`;

  // arraybuffer는 이진 데이터 처리 데이터 형식
  // 응답 데이터를 ArrayBuffer 형태로 가져올 수 있음
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const zip: JSZip = new JSZip();
  
  const zipData: JSZip | null = await zip.loadAsync(response.data);
  
  const xmlData: any = await zipData.file("CORPCODE.xml")?.async("text");

  
  const parser = new xml2js.Parser();

  const parseStringPromise = (xmlData: any): Promise<string> => {
    
    return new Promise<string>((resolve, reject) => {
      parser.parseString(xmlData, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          const jsonString = JSON.stringify(result);
          if (jsonString) {
            resolve(jsonString);
          } else {
            reject(new Error('JSON string is not available'));
          }
        }
      });
    });
  };
  
  async function getXmlData(xmlData: any): Promise<void> {
    try {
      const parsedXML: any = await parseStringPromise(xmlData);
      const companiesList: Array<Company> = parsedXML?.result?.list;
      if (companiesList){
        await saveToIndexedDB(companiesList);
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  getXmlData(xmlData);
};
