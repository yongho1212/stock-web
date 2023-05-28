import React, { useState, useEffect } from "react";
import { searchByCoprCode } from "../apis/individual";
import axios from "axios";
import { getStockPrice } from "../apis/getDetailInfo";
import styled from "styled-components";
import Indicator from "../components/common/Indicator";

const CompanyDetailInfo = ({ corpCode }) => {
  const [renderData, setRenderData] = useState(null);
  const [renderDeatilData, setRenderDetialData] = useState(null);
  const apiKey = process.env.REACT_APP_DART_API_KEY;

  // 마운트 될 때
  // !! TODO 언마운트 시점에 clear함수 적용하기
  useEffect(() => {
    callCombinedAPI(corpCode);
    return () => callCombinedAPI(corpCode);
  }, []);

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
      console.log("1 fin", res.data.stock_code);
      setRenderData(res.data);
      return res.data.stock_code;
    } else {
      throw new Error("Error in searchByCoprCode");
    }
  };

  // 종목 코드로 주식 정보 검색
  // !!TODO 검색 날짜 파라미터로 만들어서 넘기기
  // !!TODO 통신중이라 데이터가 비어있는 경우엔 로딩 인디케이터 보여주기
  //
  const getStockPrice = async (stockCode) => {
    try {
      const date = "20230525";
      // const date = await getDateToString();
      console.log(date);
      const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${apiKey}&numOfRows=1&pageNo=1&resultType=json&basDt=${date}&likeSrtnCd=${stockCode}`;
      const res = await axios.get(url);
      console.log(res);
      const resData = res?.data?.response?.body?.items?.item[0];

      console.log(resData);
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
      if (currDate.getMonth() < 9) {
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
      {/* 이거 정말 중요해요!! 까먹지 마세여 */}
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
        <StockPrice>{renderDeatilData?.mkp}원</StockPrice>
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
