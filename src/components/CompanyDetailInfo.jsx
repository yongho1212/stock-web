import React, {useState, useEffect} from 'react'
import {searchByCoprCode} from '../apis/individual'
import axios from 'axios'
import {getStockPrice} from '../apis/getDetailInfo'



const CompanyDetailInfo = ({corpCode}) => {
    
    const [renderData, setRenderData] = useState(null);
    const [renderDeatilData, setRenderDetialData] = useState(null);
    const apiKey = process.env.REACT_APP_DART_API_KEY;
    
    useEffect(() => {
      getDetailLogin(corpCode)
    },[])
    // searchByCorpCode가 실행되고 난 뒤 getStockPrice가 실해될 수 있도록 순서 보장을 해줘야함
    const getDetailLogin = async(corpCode) => {
      try {
        // 변수에 할당해서 return값을 다음 함수에 전달
        const stkCode = await searchByCoprCode(corpCode);
        console.log(stkCode)
        const stkDetailInfo = await getStockPrice(stkCode);
        console.log(stkDetailInfo)
        setRenderDetialData(stkDetailInfo?.data?.response?.body?.items.item[0]);
        console.log(renderDeatilData?.data?.response?.body?.items.item[0])
      
      } catch (error) {
        console.error('Error in getDetailLogin: ', error);
      }
    }
    
    const searchByCoprCode = (corpCode) => {
      return new Promise((resolve, reject) => {
        const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${corpCode}`;
        axios.get(url)
          .then(res => {
            if(res){
              console.log("1 fin", res.data.stock_code)
              setRenderData(res.data);
              resolve(res.data.stock_code);
            } else {
              reject(new Error('Error in searchByCoprCode'));
            }
          })
      })
    }; 
    const getStockPrice = (stockCode) => {
      console.log("2")
      return new Promise((resolve, reject) => {
        const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${apiKey}&numOfRows=1&pageNo=1&resultType=json&basDt=20230524&likeSrtnCd=${stockCode}`;
        axios.get(url)
          .then(res => {
            if(res){
              // console.log(res.data.response.body?.items.item[0])
              resolve(res);
            } else {
              console.log("2 err")
              reject(new Error('Error in getStockPrice'));
            }
          })
    })
    }

    // const searchByCoprCode1 = async(corpCode) => {
    //     const apiKey = process.env.REACT_APP_DART_API_KEY;
    //     const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${corpCode}`;
    //     const response = await axios.get(url);
        
    //     setRenderData(response.data);
    //     const codeData = response.data.stock_code

    //     getStockPrice(codeData).then(res => console.log(res.data.response.body.items.item[0]))
    // }
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