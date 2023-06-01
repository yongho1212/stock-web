import React, { useState } from "react";
import axios from "axios";

import { searchByCoprCode } from "../apis/individual";
import { Link } from "react-router-dom";

import styled from "styled-components";

const SearchResult = ({ company }) => {
  console.log(company.stock_code)
  return (
    <SearchResultCtnr>
      <Link
        to={`/companydetail/${company.corp_code[0]}`}
        style={{ textDecoration: "none", color: "black" }}
        
      >
        <SearchResultItem className="searchResultCtnr">
          <h3>{company.corp_name}</h3>
          <p>코드: {company.stock_code}</p>
          
          
          
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
  border: 2px solid #666;
  border-radius: 10px;
  margin: 0px 20px;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  align-items: center;
  height: 50px;
  z-index: 9999;
`;
