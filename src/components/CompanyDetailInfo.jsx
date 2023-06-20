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
  const [ad, setad] = useState([]);

  const datesdata = useSelector((state) => state.dates.dates);

  const currDate = datesdata[2];

  const publicdatakey = process.env.REACT_APP_PUBLIC_DATA_API_KEY;

  // renderDeatilData안찍힘
  console.log(renderDeatilData);

  // 이부분 수정해야함
  async function getPriceByEachDay(stkCode, currDate) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${publicdatakey}&numOfRows=1&pageNo=1&resultType=json&basDt=${currDate}&likeSrtnCd=${stkCode}`
        );
        const eachPrice = res?.data?.response?.body?.items?.item[0]?.mkp;
        const eachDate = res?.data?.response?.body?.items?.item[0]?.basDt;
        // console.log(res?.data?.response?.body?.items?.item[0].basDt)
        if (res) {
          return resolve({ date: eachDate, price: eachPrice });
        }
      } catch (e) {
        console.log(e);
        return reject("");
      }
    });
  }

  const allSettledPromises = async (stkCode) => {
    const promises = datesdata?.map((x) => getPriceByEachDay(stkCode, x));
    const result = [];
    try {
      const promiseResult = await Promise.allSettled(promises);
      for (const i of promiseResult) {
        if (i.status === "fulfilled") {
          result.push(i.value); // Add the resolved value if the promise is fulfilled
        }
      }
    } catch (e) {
      console.error(`error on ${e}`);
    }
    setad(result);
  };

  useEffect(() => {
    console.log(ad);
  }, [ad]);

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
      const stkCode = dartData.stock_code;
      setRenderData(dartData);
      console.log(stkCode);
      const stkData = await getStockPrice(stkCode, currDate);
      console.log(stkData);
      setRenderDetialData(stkData);
      allSettledPromises(stkCode);
    } catch (error) {
      console.error("Error in callCombinedAPI: ", error);
    }
  };

  // const fetchStockPrices = async (dates) => {
  //   try {
  //     const promises = dates.map((date) =>
  //       axios.get(`https://api.example.com/stock-price?date=${date}`)
  //     );

  //     const responseArray = await Promise.allSettled(promises);

  //     const stockPrices = await Promise.all(
  //       responseArray.map(async (result) => {
  //         // 각 요청에 대한 처리를 진행합니다.
  //         if (result.status === "fulfilled") {
  //           // 요청이 성공한 경우, JSON 형식으로 변환합니다.
  //           return await result.value.json();
  //         } else {
  //           // 요청이 실패한 경우, 오류를 기록하고 null 반환합니다.
  //           console.error("Error fetching stock price: ", result.reason);
  //           return null;
  //         }
  //       })
  //     );

  //     return stockPrices;
  //   } catch (error) {
  //     console.error("Error fetching stock prices: ", error);
  //     return [];
  //   }
  // };

  // // 사용 방법:
  // fetchStockPrices(dates).then((prices) => {
  //   console.log(prices);
  // });

  // 각 날짜에 대한 주식 가격 정보 받오기

  return (
    <Container>
      {/* renderData가 있는 경우에만 render되도록  */}
      {renderData && (
        <FirstRowCtnr>
          <FirstRowLeft>
            <Item style={{fontSize:'25px', fontWeight:'bold'}}>{renderData?.stock_name}</Item>
            <Item style={{ fontWeight:'bold'}}>{renderData?.stock_code}</Item>
          </FirstRowLeft>
          <FirtstRowRight>
            <Item>{renderData?.corp_name}</Item>
            <Item>{renderData?.corp_name_eng}</Item>
            <Item>{renderData?.adres}</Item>
            <Item>{renderData?.corp}</Item>
            <Item><a href={renderData?.hm_url}>{renderData?.hm_url}</a></Item>
          </FirtstRowRight>
        </FirstRowCtnr>
      )}

      {renderData && renderDeatilData ? (
        <PriceContainer>
          <PriceCard>
            <PriceLabel>시가</PriceLabel>
            <StockPrice>{renderDeatilData?.mkp}원</StockPrice>
          </PriceCard>

          <PriceCard>
            <PriceLabel>전일대비 등락</PriceLabel>
            <StockPrice>{renderDeatilData?.vs}원</StockPrice>
          </PriceCard>

          <PriceCard>
            <PriceLabel>가격 최고치</PriceLabel>
            <StockPrice>{renderDeatilData?.hipr}원</StockPrice>
          </PriceCard>

          <PriceCard>
            <PriceLabel>가격 최저치</PriceLabel>
            <StockPrice>{renderDeatilData?.lopr}원</StockPrice>
          </PriceCard>

          <PriceCard>
            <PriceLabel>시가총액</PriceLabel>
            <StockPrice>{renderDeatilData?.mrktTotAmt}원</StockPrice>
          </PriceCard>

          <StockChart data={ad} />
        </PriceContainer>
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
  margin-bottom: 20px;
`;

const FirstRowCtnr = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 55px;
  
`;

const FirstRowLeft = styled.div`
  flex: 1;
  margin-right: 20px;

  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FirtstRowRight = styled.div`
  flex: 1;
  margin-left: 20px;

  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Item = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const PriceCard = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  text-align: center;
`;

const PriceLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #777;
  margin-bottom: 5px;
`;

const StockPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ff5500;
`;
