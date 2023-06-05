import axios from 'axios'

export const getStockPrice = async(stockCode,specificDate) => {
    
    try {
        const date = specificDate;
        const publicdatakey = process.env.REACT_APP_PUBLIC_DATA_API_KEY;
        const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${publicdatakey}&numOfRows=1&pageNo=1&resultType=json&basDt=${date}&likeSrtnCd=${stockCode}`;
        const res = await axios.get(url);
        const resData = res?.data?.response?.body?.items?.item[0];
        return resData;
      } catch (err) {
        console.log(err);
      }
}