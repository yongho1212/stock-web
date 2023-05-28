import React, { useState } from 'react';
import axios from 'axios';
import './SearchResult.scss'
import {searchByCoprCode} from '../apis/individual'
import { Link } from 'react-router-dom';

const SearchResult = ({ company }) => {

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