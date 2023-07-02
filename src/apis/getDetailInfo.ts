
import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

import { useSelector } from "react-redux";

// const datesdata = useSelector((state: any) => state.dates.dates);
// const datesdata = localStorage.getItem('dates')

// let currDate: string;

//   if (datesdata) { 
//     const parsedDates = JSON.parse(datesdata); 
//     const currDate = parsedDates[2];
//   } else {
//     const currDate = "20230625";
//   }

  

  

export const getStockPrice = async(stockCode : string, currDate:string): Promise<AxiosResponse | undefined> => {
    try{
      console.log(currDate)
      const apiKey = process.env.REACT_APP_PUBLIC_DATA_API_KEY;
      // const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${apiKey}&numOfRows=1&pageNo=1&resultType=json&basDt=20230524&likeSrtnCd=${stockCode}`;
      const res = await axiosInstance.get(`/api/go-data/${stockCode}/${currDate}`);
      
      console.log(res)
      if (res.status == 200){
        return res
      } else{
        new Error('Error fetching stock data.')
      }   } catch(e){
      console.log(e)
    }
}

// export const getStockPrice = async (stockCode) => {
//   try {
//     const apiKey = process.env.REACT_APP_PUBLIC_DATA_API_KEY;
    
//     const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${apiKey}&numOfRows=1&pageNo=1&resultType=json&basDt=20230524&likeSrtnCd=${stockCode}`;

//     const response = await axios.get(url);

  

//     if (response.status === 200) {
//       const stockData = response.data;

//       console.log(stockData.response.body.items.item[0]);
//       return stockData.response.body.items.item[0]
//       // stockData를 필요한대로 처리하거나 반환합니다.
//     }
//   } catch (error) {
//     console.error('Error fetching stock data:', error);
//   }
// };



// export const getStockPrice = async (stockCode) => {
//   try {
//     const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${stockCode}.KS`;

//     const response = await axios.get(url);

//     if (response.status === 200) {
//       const stockData = response.data.quoteResponse.result[0];

//       console.log(stockData);
//       // stockData를 필요한대로 처리하거나 반환합니다.
//     }
//   } catch (error) {
//     console.error('Error fetching stock data:', error);
//   }
// };

// 함수 호출 예시
// getStockPrice('005930'); // 삼성전자 종목 코드