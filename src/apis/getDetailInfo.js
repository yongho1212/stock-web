
import axios from 'axios';

export const getStockPrice = async (stockCode) => {
  try {
    const apiKey = process.env.REACT_APP_PUBLIC_DATA_API_KEY;
    
    const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=QF0D0%2BJzKDhqvaAA2DsmkNHnLRaZs%2FA9u29oTdCSSDGIsdQxC%2Fxd3UvLI9yrKflZith0AqLJdPx2L4cl3uv2Xg%3D%3D&numOfRows=1&pageNo=1&resultType=json&basDt=20230524&likeSrtnCd=${stockCode}`;

    const response = await axios.get(url);
    //     , {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     params: {
    //       returnType: 'json',
    //       serviceKey: apiKey,
    //       likeSrtnCd: stockCode,
    //       numOfRows: 1,
    //       pageNo: 1
    //     },
    //   });
  

    if (response.status === 200) {
      const stockData = response.data;

      console.log(stockData);
      // stockData를 필요한대로 처리하거나 반환합니다.
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};



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