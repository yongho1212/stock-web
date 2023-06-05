import axios from "axios";

export const getStockDataFromDart = async(corpCode) => {

    const apiKey = process.env.REACT_APP_DART_API_KEY;
    const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${corpCode}`;
    const res = await axios.get(url);
    if (res) {
      
      return res.data;
    } else {
      throw new Error("Error in searchByCoprCode");
    }
}