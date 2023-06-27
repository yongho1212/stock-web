import axios from "axios";
import axiosInstance from './axiosInstance'

export const getStockDataFromDart = async(corpCode: string) => {

    const apiKey = process.env.REACT_APP_DART_API_KEY;
    // const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${corpCode}`;
    // const res = await axios.get(url);
    const res = await axiosInstance.get(`/api/open-dart/${corpCode}`);
    console.log(res, "DARTINFO")
    if (res) {
      return res.data;
    } else {
      throw new Error("Error in searchByCoprCode");
    }
}