import axios from 'axios'

export const getStockPrice = async(stockCode,specificDate) => {
    console.log("start", stockCode,specificDate)
    try {
        const date = specificDate;
        console.log(stockCode,specificDate)
        const publicdatakey = process.env.REACT_APP_PUBLIC_DATA_API_KEY;
        const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${publicdatakey}&numOfRows=1&pageNo=1&resultType=json&basDt=${date}&likeSrtnCd=${stockCode}`;
        const res = await axios.get(url);
        console.log(res.data)
        const resData = res?.data?.response?.body?.items?.item[0];
        console.log(resData)
        return resData;
      } catch (err) {
        console.log(err);
      }
}