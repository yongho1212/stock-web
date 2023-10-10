import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getStockDataFromDart } from "../apis/getStockDataFromDart";
import { getStockPrice } from "../apis/getStockPrice";

import Indicator from "./common/Indicator";
import StockChart from "./chart/StockChart";
import Spacer from '../components/common/Spacer';
import DetailHeader from '../components/companydetails/DetailHeader';

import axiosInstance  from '../apis/axiosInstance';

interface Props {
  corpCode: string | undefined;
}

interface DartData {
  stock_code: string;
  stock_name?: string;
  corp_name?: string;
  corp_name_eng?: string;
  adres?: string;
  corp?: string;
  hm_url?: string;
}

// interface CommonApiData {
//   vs?: string; // 전일 등락 대비
//   fltRt?: string; //전일 대비 등락비
//   mkp?: string; //시가
//   clpr?: string; //종가
//   hipr?: string; // 가격 최고치 꼬리 상단
//   lopr?: string; // 가격 최저치 꼬리 하단
//   mrktTotAmt?: string; //시가총액
//   trqu?: string; //거래량
//   trPrc? : string; //거래대금
// }

type KeyType = "vs"|"fltRt"|"mkp"|"clpr"|"hipr"|"lopr"|"mrktTotAmt"|"trqu"| "trPrc";

type CommonApiData = Record<KeyType, string | undefined>;

const keyToLabel: Record<KeyType, string> = {
  vs: "전일 등락 대비",
  fltRt: "전일 대비 등락비",
  mkp: "시가",
  clpr: "종가",
  hipr: "가격 최고치 꼬리 상단",
  lopr: "가격 최저치 꼬리 하단",
  mrktTotAmt: "시가총액",
  trqu: "거래량",
  trPrc : "거래대금"
};

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
        const res = await axiosInstance.get(`/api/go-data-term/${startDate}/${stkCode}`);
        if (res) {
          return resolve( res);
        }  else {
          return resolve(null); 
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
        result.push({ date: eachDate, price: eachPrice })
        
      }
      setSettledData(result)
    }
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
      <LeftContainer>
      {renderData && (
          <>
          <DetailHeader 
            stock_name={renderData?.stock_name} 
            stock_code={renderData?.stock_code}
            price={renderDeatilData?.clpr}
            vs={renderDeatilData?.vs}
            vsp={renderDeatilData?.fltRt}
          />
          <Spacer height={20}/>
          <StockChart data={ad} />
          </>
          )}
          </LeftContainer>
          <RightContainer>

      {renderData && renderDeatilData ? (
        <PriceContainer>
          <PriceTable>
            {Object.entries(renderDeatilData).map(([key, value], index) => {
              if (key in keyToLabel) {
                return (
                  <PriceRow key={index}>
                    <PriceLabel>{keyToLabel[key as KeyType]}</PriceLabel>
                    <StockPrice>
                      {parseFloat(value || '0').toLocaleString()}
                      {key === 'fltRt' ? '%' : key === 'trqu' ? ' ' : '원'}
                      </StockPrice>
                  </PriceRow>
                );
              }
              return null;
            })}
          </ PriceTable >

          <CompanyBasicInfoContainer>
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
          </CompanyBasicInfoContainer>
          
        </PriceContainer>
      ) : (
        <div>
          <Indicator />
        </div>
      )}
          </RightContainer>

    </Container>
  );
};

export default CompanyDetailInfo;

const Container = styled.div`
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  height: 100vh ;
  padding: 20px 0px;
  background-color: ${(props) => props.theme["--100-color"]};
  display: flex;
  
  
  max-width: none; 
  /* @media (min-width:868px) { 
      width: auto;
      max-width:868px; 
      margin-left:auto;
      margin-right:auto; 
  } */
`;

const LeftContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;

`

const RightContainer = styled.div`
  flex: 2;
`


const CompanyBasicInfoContainer = styled.div`
  width: 90%;
  height: 200px;
  margin-left: 5%;
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

const PriceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const PriceRow = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme["--300-color"]};
`;

const PriceLabel = styled.td`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme["--800-color"]};
`;

const StockPrice = styled.td`
  font-size: 24px;
  text-align: right;
  color: ${(props) => props.theme["--800-color"]};
`;