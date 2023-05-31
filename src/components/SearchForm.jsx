import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SearchResult from "./SearchResult";
import useDebounce from "../hooks/useDebounce";

import {fetchIndexedDB} from "../apis/fetchIndexedDB";

import { IoSearchCircleOutline } from "react-icons/io5";

const SearchForm = () => {  

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // 디바운스 시점에 통신 시작
  // handle change시점으로 하면 안될거같음

  // 추천 종목을 눌렀을 때나
  // 

  const debouncedKeyword = useDebounce(searchTerm, 500);

  useEffect(() => {
    getSearchResult(debouncedKeyword);
    console.log("searchResult: ", debouncedKeyword);
  },[debouncedKeyword])
  

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

  const getSearchResult = async(debouncedKeyword) => {
    // 얼리 리턴으로 바꾸는 편이 나음
    if (debouncedKeyword?.length >= 2){
      try {
        const indexedDBData = await fetchIndexedDB();
        const { results: filteredResults, relatedKeywords } = filterCompanyName(
          debouncedKeyword,
          indexedDBData
        );
        setSearchResults(filteredResults);
        console.log("연관 검색어: ", relatedKeywords); // 연관 검색어 출력
      } catch (error) {
        console.error("IndexedDB 요청 중 오류가 발생했습니다: ", error);
      }
    };
  }

  const handleInputChange = async (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const indexedDBData = await fetchIndexedDB();
      const { results: filteredResults, relatedKeywords } = filterCompanyName(
        searchTerm,
        indexedDBData
      );
      setSearchResults(filteredResults);
      console.log("연관 검색어: ", relatedKeywords); // 연관 검색어 출력
    } catch (error) {
      console.error("IndexedDB 요청 중 오류가 발생했습니다: ", error);
    }
  };

  // !!TODO 검색 결과 단기 저장을 통해 이전화면으로 넘어갔을 때 그대로 남아있게 하기
  // 입력 => 디바운스 => 결과렌더링

  return (
    
      <SearchFormContainer>
        <form onSubmit={handleSubmit} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <StockNameInput
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <StockSearchBtn type="submit">
            <IoSearchCircleOutline size={40} />
          </StockSearchBtn>
        </form>
        
          <SearchResultsContainer>
            <SearchResultsList>
              {searchResults.map((company, index) => (
                <SearchResult key={index} company={company} />
              ))}
            </SearchResultsList>
          </SearchResultsContainer>
        
      </SearchFormContainer>
    
  );
};

export default SearchForm;

const SearchFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  
`;

const StockNameInput = styled.input`
  width: 300px;
  height: 40px;
  border: 3px solid #33ff33;
  border-radius: 9px;
`;

const StockSearchBtn = styled.button`
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  color: #33ff33;
  cursor: pointer;
`;

const SearchResultsContainer = styled.div`
  margin-top: 10px;
  
  
`;

const SearchResultsList = styled.ul`
  
`;
