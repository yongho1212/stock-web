import React, { useState } from 'react';
import axios from 'axios';
import './SearchResult.scss'
import {searchByCoprCode} from '../apis/individual'
import { Link } from 'react-router-dom';

const SearchResult = ({ company }) => {

//   const searchByCoprCode = async(corpCode) => {
//     // 회사 코드가 넘어오기 전에 낧려서 언디파인드뜸
//     console.log(corpCode)
//     const apiKey = process.env.REACT_APP_DART_API_KEY;
//     const url = `https://proxy.cors.sh/https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${corpCode}`;
//     const response = await axios.get(url);
//     console.log(response.data)
// }
  
  // const clicked = () => {
  //   searchByCoprCode(company.corp_code[0])
  // }


    return (
      <Link to={`/companydetail/${company.corp_code[0]}`}>
        <div className='searchResultCtnr' > 
          <h3>{company.corp_name}</h3>
          <p>코드: {company.corp_code}</p>
        </div>
      </Link>
    );
  }

export default SearchResult;