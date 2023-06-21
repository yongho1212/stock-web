import React, { useState } from "react";
import axios from "axios";


import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setToggleState } from "../state/searchtoggle/searchToggleSlice";

import styled from "styled-components";

const SearchResult = ({ company }) => {

  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setToggleState(false));
  };

  console.log(company.corp_code[0])
  
  return (
    <SearchResultCtnr>
      <Link
        to={`/companydetail/${company.corp_code[0]}`}
        replace
        style={{ textDecoration: "none", color: "black" }}
        // onClick={handleClick}    
      >
        <SearchResultItem className="searchResultCtnr">
          <h3>{company.corp_name}</h3>
          {
            company.stock_code != ' ' &&
            <p>코드: {company.stock_code}</p>
          }
        </SearchResultItem>
      </Link>
    </SearchResultCtnr>
  );
};

export default SearchResult;

const SearchResultCtnr = styled.div`
  width: 100%;
  text-decoration: none;
  
`;

const SearchResultItem = styled.div`
  border: 2px solid #ccc;
  border-radius: 10px;
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  align-items: center;
  height: 50px;
  z-index: 9999;
`;
