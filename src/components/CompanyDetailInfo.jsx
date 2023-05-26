import React, {useState, useEffect} from 'react'
import {searchByCoprCode} from '../apis/individual'
import axios from 'axios'
import {getStockPrice} from '../apis/getDetailInfo'



const CompanyDetailInfo = ({corpCode}) => {
    
    const [renderData, setRenderData] = useState(null);
    
    useEffect(() => {
        searchByCoprCode(corpCode)
    },[])

    const searchByCoprCode = async(corpCode) => {
        const apiKey = process.env.REACT_APP_DART_API_KEY;
        const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${corpCode}`;
        const response = await axios.get(url);
        
        setRenderData(response.data);
        const codeData = response.data.stock_code

        getStockPrice(codeData)
    }
    // 데이터가 없을 때는 로딩화면 보여주기
    // setState이용해서 뒤로갔을 때

    // detail page 비동기처리 
    // 종목코드 받아오기 => 그 코드로 주가 정보 보여주기
    

  return (
    <div>
        <div>{renderData?.adres}</div>
        <div>{renderData?.corp_name}</div>
        <div>{renderData?.corp_name_eng}</div>
        <div>{renderData?.stock_name}</div>
        <div>{renderData?.stock_code}</div>
    </div>
  )
}

export default CompanyDetailInfo