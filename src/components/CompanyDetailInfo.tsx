import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from 'react-router-dom'

//apis
import { getStockDataFromDart } from "../apis/getStockDataFromDart";
import { getStockPrice } from "../apis/getStockPrice";
//cmpts
import Indicator from "./common/Indicator";
import StockChart from "./chart/StockChart";

import { useSelector } from "react-redux";

import axiosInstance  from '../apis/axiosInstance';

interface Props {
  corpCode: string | undefined;
}

interface DartData {
  stock_code: string;
  //? 는 해당 속성이 있을 수도 없을 수도 있음을 뜻한다. OPTIONAL
  stock_name?: string;
  corp_name?: string;
  corp_name_eng?: string;
  adres?: string;
  corp?: string;
  hm_url?: string;
}

interface CommonApiData {
  mkp?: string;
  vs?: string;
  hipr?: string;
  lopr?: string;
  mrktTotAmt?: string;
}

const CompanyDetailInfo: React.FC<Props> = ({ corpCode }) => {
  const [renderData, setRenderData] = useState<DartData | null>(null);
  const [renderDeatilData, setRenderDetialData] = useState<CommonApiData | null>(null);
  const [currDate, setCurrDate] = useState<string | undefined>();
  const [dateData, setDateData] = useState<string[]>([]);
  const [ad, setSettledData] = useState<any[]>([]);


  // const datesdata = useSelector((state: any) => state.dates.dates);
  useEffect(() => {
    const datesdataFromLocalStorage = localStorage.getItem("dates");
    if (datesdataFromLocalStorage) {
      const parsedDates = JSON.parse(datesdataFromLocalStorage);
      setDateData(parsedDates);
      setCurrDate(parsedDates[2]);
    } else {
      setCurrDate("20230625");
    }
  },[])

    // TS useEffect에서 corpCode, currDate 감지하여 참일경우 api call
    useEffect(() => {
      (async () => {
        if (corpCode && currDate) {
          await callCombinedAPI(corpCode, currDate);
        }
      })();
    }, [corpCode, currDate]);
 


  
  async function getPriceByEachDay(stkCode: string, startDate: string) {
    return new Promise(async (resolve, reject) => {
      try {
       console.log('1')
        const res = await axiosInstance.get(`/api/go-data-term/${startDate}/${stkCode}`);
        console.log(res)
        // const eachPrice = res?.data?.response?.body?.items?.item[0]?.mkp;
        // const eachDate = res?.data?.response?.body?.items?.item[0]?.basDt;
        // console.log(res?.data?.response?.body?.items?.item[0].basDt)
        if (res) {
          return resolve( res);
        }  else {
          return resolve(null); //  응답이 없는 경우.
        }
      } catch (e) {
        console.log(e);
        return reject("");
      }
    });
  }


  const allSettledPromises = async (stkCode: string) => {
    const startDate:string|undefined = dateData.at(-1)
    console.log(startDate)
    const result : any = []
    
    if(startDate){
      const data:any = await getPriceByEachDay(stkCode, startDate)
      const dataArr = data?.data?.response?.body?.items?.item
      console.log(dataArr)
      for (const i of dataArr){
        const eachDate = i.basDt;
        const eachPrice = i.mkp;
        
        console.log(i)  
        result.push({ date: eachDate, price: eachPrice })
        
      }
      setSettledData(result)
    }
    // const promises = dateData?.map((x: string) => getPriceByEachDay(stkCode, x));
    // const result = [];
    // try {
    //   const promiseResult = await Promise.allSettled(promises);
    //   for (const i of promiseResult) {
    //     if (i.status === "fulfilled") {
    //       result.push(i.value); // Add the resolved value if the promise is fulfilled
    //     }
    //   }
    // } catch (e) {
    //   console.error(`error on ${e}`);
    // }
    setSettledData(result);
  };




  // Dart의 자료를 통해 종목 코드를 받아서 => 그 코드를 공공데이터에 검색 하는 함수
  const callCombinedAPI = async (corpCode: string, currDate:string): Promise<void> => {
    try {
      // 변수에 할당해서 return값을 다음 함수에 전달
      const dartData = await getStockDataFromDart(corpCode);
      const stkCode: string | undefined = dartData.stock_code;
      setRenderData(dartData);
      console.log(stkCode);
      if (stkCode) {
        const stkData = await getStockPrice(stkCode, currDate);
        if (stkData) {
          setRenderDetialData(stkData);
          allSettledPromises(stkCode);
        }
      }
    } catch (error) {
      console.error("Error in callCombinedAPI: ", error);
    }
  };


  return (
    <Container>
      {/* renderData가 있는 경우에만 render되도록  */}
      {renderData && (
        <FirstRowCtnr>
          <FirstRowLeft>
            <Item style={{ fontSize: '25px', fontWeight: 'bold' }}>{renderData?.stock_name}</Item>
            <Item style={{ fontWeight: 'bold' }}>{renderData?.stock_code}</Item>
          </FirstRowLeft>
          <FirtstRowRight>
            <Item>{renderData?.corp_name}</Item>
            <Item>{renderData?.corp_name_eng}</Item>
            <Item>{renderData?.adres}</Item>
            <Item>{renderData?.corp}</Item>
            <Item>
              {/* https없으면 그 정확한 Link로 이동을 안함 */}
              <a
                href={renderData?.hm_url?.startsWith('http') 
                  ? renderData.hm_url 
                  : `https://${renderData?.hm_url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{}}
              >
                {renderData?.hm_url}
              </a>
            </Item>
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
  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: auto;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme["--100-color"]};
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

  background-color: ${(props) => props.theme["--300-color"]};
  color: ${(props) => props.theme["--800-color"]};
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FirtstRowRight = styled.div`
  flex: 1;
  margin-left: 20px;
  color: ${(props) => props.theme["--800-color"]};
  background-color: ${(props) => props.theme["--300-color"]};
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
  background-color: ${(props) => props.theme["--300-color"]};
  color: ${(props) => props.theme["--800-color"]};
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  text-align: center;
`;

const PriceLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const StockPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme["--900-color"]};
`;
