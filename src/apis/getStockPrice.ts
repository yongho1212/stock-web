import axios from "axios";
import axiosInstance from './axiosInstance'

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


const changeDate = (dateString:string) => {
  const formattedDateString = `${dateString.slice(0,4)}-${dateString.slice(4,6)}-${dateString.slice(6,8)}`;
  let date = new Date(formattedDateString);
  if (isNaN(date.getTime())) { 
    throw new Error(`Invalid date: ${dateString}`);
  }
  date.setDate(date.getDate() - 1);
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth()+1)).slice(-2); 
  let day = ('0' + date.getDate()).slice(-2);
  return `${year}${month}${day}`;
}

export const getStockPrice = async (stockCode: string, specificDate: string): Promise<ResDataType | undefined> => {
  console.log("start", stockCode, specificDate);

  let attempts = 0; 

  while (attempts < 5) { 
    try {
      console.log(stockCode, specificDate);
      const publicdatakey = process.env.REACT_APP_PUBLIC_DATA_API_KEY;
      const res = await axiosInstance.get(`/api/go-data/${stockCode}/${specificDate}`);
      console.log(res.data);

      if (!res?.data?.response?.body?.items?.item[0]) {
        throw new Error('Data is undefined');
      }

      const resData = res.data.response.body.items.item[0];
      console.log(resData);

      return resData;
      
    } catch (err) {
        console.log(err);
        specificDate = changeDate(specificDate); 
        attempts++; 
    }
  }

   throw new Error('ERR'); 
};