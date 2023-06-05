import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

//apis
import { getStockDataFromDart } from "../apis/getStockDataFromDart";
import { getStockPrice } from "../apis/getStockPrice";
//cmpts
import Indicator from "../components/common/Indicator";
import StockChart from "./chart/StockChart";

import { useSelector } from "react-redux";

const CompanyDetailInfo = ({ corpCode }) => {
  const [renderData, setRenderData] = useState(null);
  const [renderDeatilData, setRenderDetialData] = useState(null);
  const [dateData, setDateData] = useState([]);
  const apiKey = process.env.REACT_APP_DART_API_KEY;

  const days = useSelector((state) => state.dates);
  const currDate = days.dates[1];

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
      const dartData = await getStockDataFromDart(corpCode);
      const stkCode = dartData.stock_code
      await setRenderData(dartData);
      const stkData = await getStockPrice(stkCode, currDate);
      setRenderDetialData(stkData);
    } catch (error) {
      console.error("Error in callCombinedAPI: ", error);
    }
  };

  // 각 날짜에 대한 주식 가격 정보 받오기

  const chartdata = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  // 종목 코드로 주식 정보 검색
  // !!TODO 검색 날짜 파라미터로 만들어서 넘기기
  // !!TODO api 컴포넌트 분리하기
  // !!TODO Type 지정하기
  // !!TODO ui 짜기
  // !!TODO 수치 시각화하기

  

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
          <StockChart data={chartdata}/>
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
  height: auto;
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
