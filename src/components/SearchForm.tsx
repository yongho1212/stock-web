import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import SearchResult from "./SearchResult";
import useDebounce from "../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { setToggleState } from "../state/searchtoggle/searchToggleSlice";

import {fetchIndexedDB} from "../apis/fetchIndexedDB";

import { IoSearchCircleOutline } from "react-icons/io5";

interface SearchResultItem {
  corp_name: string[];
  stock_code: string;
}

const SearchForm = () => {  

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleState = useSelector((state: any) => state.toggleState);
  const dispatch = useDispatch();
  const debouncedKeyword = useDebounce(searchTerm, 500);

  const refSearch = React.useRef<HTMLDivElement>(null);
  const searchFormRef = refSearch as React.RefObject<HTMLDivElement>;

  // 
  useEffect(() => {
    getSearchResult(debouncedKeyword);
    console.log("searchResult: ", debouncedKeyword);
  },[debouncedKeyword])


  // 검색 결과 DOM 외부 클릭시 발생하는 이벤트 핸들러
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // refSearch.current => exist inside DOM element!!! 
      // refSearch.current가  truthy하고 
      // event click한 곳이 refSearch.current 영역이 아닌경우
      if (refSearch.current && !refSearch.current.contains(event.target)) {
        dispatch(setToggleState(false));
      }
    };
    // 클릭 이벤트가 발생했을 때 handleClickOutside 함수 실행
    document.addEventListener('click', handleClickOutside);
    // Search Result COMPONENT가 unmount 되는 시점에 Clear함수를 실행시킴
    return () => {
      console.log("clear function activated")
      document.removeEventListener('click', handleClickOutside);
    };
  }, [refSearch]);
  

  // 디바운스 시점에 통신 시작

  // 추천 종목을 눌렀을 때나
  // 넘겨줄 키워드, 시간 값 넘기기
  

    


  
  

  const filterCompanyName = (keyword: string, data: SearchResultItem[]): { results: SearchResultItem[]; relatedKeywords: string[] } => {
    const results: SearchResultItem[] = [];
    const relatedKeywords = new Set<string>();

    data.forEach((item: SearchResultItem) => {
      const companyName = item.corp_name[0];
 
      if (companyName.includes(keyword)) {
        results.push(item);
        relatedKeywords.add(companyName);
      } else {
        // 키워드를 포함하거나 시작하는 회사 이름을 연관 키워드로 처리.
        if (companyName?.includes(keyword) || companyName.startsWith(keyword)) {
          relatedKeywords.add(companyName);
        }
      }
    });

    return { results, relatedKeywords: Array.from(relatedKeywords)};
  };


  const getSearchResult = async(debouncedKeyword: string) => {
    if (debouncedKeyword?.length === 0){
      setSearchResults([]);
    }
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

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  const handleSubmit = async (event :React.FormEvent<HTMLFormElement>) => {
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

  




  return (
    
      <SearchFormContainer
        ref={searchFormRef}
        // onClick={handleOutsideClick}
        // onClick={(e)=>e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} style={{display: "flex", justifyContent: "center", alignItems: "center", width:'92%'}}>
          <StockNameInput
            type="text"
            // 이벤트 버블링 막음 => 이벤트 전파
            
            onFocus={() => dispatch(setToggleState(true))}
            
            value={searchTerm}
            onChange={handleInputChange}
          />
          <StockSearchBtn type="submit">
            <IoSearchCircleOutline size={40} />
          </StockSearchBtn>
        </form>

        
        {toggleState.toggleState &&
          <SearchResultsContainer>
            <SearchResultsList>
              {searchResults.map((company, index) => (
                <SearchResult key={index} company={company} />
              ))}
            </SearchResultsList>
            <FadeEffect />
          </SearchResultsContainer>
        }
        
      </SearchFormContainer>
    
  );
};

export default SearchForm;

const SearchFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color:${(props) => props.theme["--100-color"]};
  width: 55%;
  height: 60px;
`;

const StockNameInput = styled.input`
  width: 90%;
  height: 40px;
  color: ${(props) => props.theme["--900-color"]};
  border-radius: 9px;
`;

const StockSearchBtn = styled.button`
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  color: ${(props) => props.theme["--900-color"]};
  cursor: pointer;
`;



const SearchResultsContainer = styled.div`
  z-index: 999;
  height: 550px;
  width: 55%;
  top: 60px;
  background-color: aliceblue;
  overflow-y: scroll;
  position: absolute;

  border: 1px solid #8b8b8b;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

`;

const FadeEffect = styled.div`
  position: sticky;
  
  bottom: 0;
  width: 100%;
  height: 25%; // 원하는 높이에 맞게 조절
  background-image: linear-gradient(to top, rgba(255, 255, 255, 0), transparent);
  pointer-events: none; // 흐림 효과가 있는 부분 클릭 시 스크롤 가능하도록
`;


const SearchResultsList = styled.ul`
    padding-left: 0px;
    margin: 10px 0px;
`;
