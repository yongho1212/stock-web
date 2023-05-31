import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
//apis
import { searchByCoprCode } from "../apis/individual";
import { getStockPrice } from "../apis/getDetailInfo";
//cmpts
import Indicator from "../components/common/Indicator";
import StockChart from "./chart/StockChart";

import { useSelector } from "react-redux";



const CompanyDetailInfo = ({ corpCode }) => {
  const [renderData, setRenderData] = useState(null);
  const [renderDeatilData, setRenderDetialData] = useState(null);
  const [dateData, setDateData] = useState([]); 
  const apiKey = process.env.REACT_APP_DART_API_KEY;
  const publicdatakey= process.env.REACT_APP_PUBLIC_DATA_API_KEY

  const days = useSelector((state) => state.dates);
  console.log(days)

  const stockData = [
    { date: "2022-01-01", price: 100 },
    { date: "2022-01-02", price: 110 },
    { date: "2022-01-03", price: 95 },
    { date: "2022-01-04", price: 120 },
    { date: "2022-01-05", price: 105 },
    { date: "2022-01-06", price: 130 },
    { date: "2022-01-07", price: 115 },
    { date: "2022-01-10", price: 150 },
    { date: "2022-01-11", price: 200 },
    { date: "2022-01-12", price: 120 },
    { date: "2022-01-13", price: 105 },
    { date: "2022-01-14", price: 130 },
    { date: "2022-01-15", price: 115 },
    { date: "2022-01-16", price: 120 },
  ];

  const currDateFiftyTwo = []

  // !! TODO 날짜 관련 함수 적용 

  // 공공데이터 api로 공휴일이 아닌 날짜만 받아서 
  
  // 각 날짜에 대한 가격을 { date / price } 형태로 배열에 저장




  // 마운트 될 때
  // !! TODO 언마운트 시점에 clear함수 적용하기
  useEffect(() => {
    callCombinedAPI(corpCode);
    return () => callCombinedAPI(corpCode);
  },[]);

  // Dart의 자료를 통해 종목 코드를 받아서 => 그 코드를 공공데이터에 검색 하는 함수
  const callCombinedAPI = async (corpCode) => {
    try {
      // 변수에 할당해서 return값을 다음 함수에 전달
      const stkCode = await searchByCoprCode(corpCode);
      await getStockPrice(stkCode);
      // const stkDetailInfo =
    } catch (error) {
      console.error("Error in callCombinedAPI: ", error);
    }
  };

  // DART 검색
  const searchByCoprCode = async (corpCode) => {
    const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${corpCode}`;
    const res = await axios.get(url);
    if (res) {
      setRenderData(res.data);
      return res.data.stock_code;
    } else {
      throw new Error("Error in searchByCoprCode");
    }
  };

  // 종목 코드로 주식 정보 검색
  // !!TODO 검색 날짜 파라미터로 만들어서 넘기기
  // !!TODO api 컴포넌트 분리하기
  // !!TODO Type 지정하기
  // !!TODO ui 짜기
  // !!TODO 수치 시각화하기


  // 공공데이터 금융위원회_주식시세정보 조회
  const getStockPrice = async (stockCode) => {
    try {
      const date = "20230525";
      
      const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${publicdatakey}&numOfRows=1&pageNo=1&resultType=json&basDt=${date}&likeSrtnCd=${stockCode}`;
      const res = await axios.get(url);
      
      const resData = res?.data?.response?.body?.items?.item[0];
      
      setRenderDetialData(resData);
      return resData;
    } catch (err) {
      console.log(err);
    }
  };

  //날짜 string 제조 함수
  const getDateToString = () => {
    try {
      const currDate = new Date();
      const curryear = currDate.getFullYear();
      let currmonth;
      if (currDate.getMonth() < 10) {
        currmonth = `0${currDate.getMonth() + 1}`;
      } else {
        currmonth = currDate.getMonth() + 1;
      }
      const currdate = currDate.getDate();
      return `${curryear}${currmonth}${currdate}`;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {/* renderData가 있는 경우에만 render되도록  */}
      {renderData && (
        <>
          <Item>{renderData?.adres}</Item>
          <Item>{renderData?.corp}</Item>
          <Item>{renderData?.corp_name}</Item>
          <Item>{renderData?.corp_name_eng}</Item>
          <Item>{renderData?.stock_name}</Item>
          <Item>{renderData?.stock_code}</Item>
        </>
      )}

      {renderData && renderDeatilData ? (
        <>
          {/* 시가 */}
          <StockPrice>{renderDeatilData?.mkp}원</StockPrice>
          {/* 전일대비 등락 */}
          <StockPrice>{renderDeatilData?.vs}원</StockPrice>
          {/* 가격 최고치 */}
          <StockPrice>{renderDeatilData?.hipr}원</StockPrice>
          {/* 가격 최저치 */}
          <StockPrice>{renderDeatilData?.lopr}원</StockPrice>
          {/* 시가총액 */}
          <StockPrice>{renderDeatilData?.mrktTotAmt}원</StockPrice>
        </>
      ) : (
        <div>
          <Indicator />
        </div>
      )}
            

    </Container>
  );
};

export default CompanyDetailInfo;

const Container = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Item = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;

const StockPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ff5500;
`;
