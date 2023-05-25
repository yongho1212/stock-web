import axios from "axios";
import JSZip from "jszip";
import xml2js from "xml2js";

// indexedDB 초기설정
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('myDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore('companies', { keyPath: 'corp_code' });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event);
    };
  });
};

//indexedDB에 데이터 저장
const saveToIndexedDB = async (companiesList) => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['companies'], 'readwrite');
    const objectStore = transaction.objectStore('companies');

    companiesList.forEach((company) => {
      objectStore.put(company);
    });

    transaction.oncomplete = (event) => {
      resolve(event);
    };

    transaction.onerror = (event) => {
      reject(event);
    };

    db.close();
  });
};

// downloadzip 함수 (app.js에서 useEffect로 마운트 시점에 실해되어야함)
export const downloadZip = async () => {
  const apiKey = process.env.REACT_APP_DART_API_KEY;
  const url = `https://cors-anywhere.herokuapp.com/https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${apiKey}`;

  // arraybuffer는 이진 데이터 처리 데이터 형식 
  // 응답 데이터를 ArrayBuffer 형태로 가져올 수 있음
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const zip = new JSZip();
  const zipData = await zip.loadAsync(response.data);
  const xmlData = await zipData.file("CORPCODE.xml").async("text");

  const parser = new xml2js.Parser();

  const parseStringPromise = new Promise((resolve, reject) => {
    parser.parseString(xmlData, (err, result) => {
      if (err) reject(err);
      resolve(result);
      console.log(result);
    });
  });


  const parsedXML = await parseStringPromise;
  const companiesList = parsedXML.result.list;

  // Save the companiesList to indexedDB
  await saveToIndexedDB(companiesList);
};
