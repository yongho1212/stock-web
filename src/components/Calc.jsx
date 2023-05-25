import React, { useState } from "react";


function SearchResult({ company }) {
  return (
    <div>
      <h3>{company.corp_name}</h3>
      <p>코드: {company.corp_code}</p>
    </div>
  );
}

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterCompanyName = (keyword, data) => {
    const results = [];
    const relatedKeywords = new Set();
  
    data.forEach((item) => {
      const companyName = item.corp_name[0];
  
      if (companyName.includes(keyword)) {
        results.push(item);
        relatedKeywords.add(companyName);
      } else {
        // 키워드를 포함하거나 시작하는 회사 이름을 연관 키워드로 처리합니다.
        if (companyName?.includes(keyword) || companyName.startsWith(keyword)) {
            relatedKeywords.add(companyName);
        }
      }
    });
    return { results, relatedKeywords: Array.from(relatedKeywords) };
  };
  

  const fetchIndexedDB = async () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const indexedDBData = await fetchIndexedDB();
      const { results: filteredResults, relatedKeywords } = filterCompanyName(searchTerm, indexedDBData);
      setSearchResults(filteredResults);
      console.log("연관 검색어: ", relatedKeywords); // 연관 검색어 출력
    } catch (error) {
      console.error("IndexedDB 요청 중 오류가 발생했습니다: ", error);
    }
  };
  
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleInputChange} />
        <button type="submit">검색</button>
      </form>
      <div>
        {searchResults.map((company, index) => (
          <SearchResult key={index} company={company} />
        ))}
      </div>
    </div>
  );
}

export default SearchForm;
