import axios from "axios";

interface ResDataType {
  basDt: string;
  clpr: string;
  fltRt: string;
  hipr: string;
  isinCd: string;
  itmsNm: string;
  lopr: string;
  lstgStCnt: string;
  mkp: string;
  mrktCtg: string;
  mrktTotAmt: string;
  srtnCd: string;
  trPrc: string;
  trqu: string;
  vs: string;
}

export const getStockPrice = async (stockCode: string,specificDate: string): Promise<ResDataType | undefined> => {
  console.log("start", stockCode, specificDate);
  try {
    console.log(stockCode, specificDate);
    const publicdatakey = process.env.REACT_APP_PUBLIC_DATA_API_KEY;
    const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${publicdatakey}&numOfRows=1&pageNo=1&resultType=json&basDt=${specificDate}&likeSrtnCd=${stockCode}`;
    const res = await axios.get(url);
    console.log(res.data);
    const resData = res?.data?.response?.body?.items?.item[0];
    console.log(resData);
    return resData;
  } catch (err) {
    console.log(err);
  }
};
