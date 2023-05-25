import axios from "axios";



export const searchByCoprCode = async({corpCode}) => {
    // 회사 코드가 넘어오기 전에 낧려서 언디파인드뜸

    const receivedCorpCode = await corpCode;
    const apiKey = process.env.REACT_APP_DART_API_KEY;
    
    const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}?corp_code=${corpCode}`;
    const response = await axios.get(url);
    
}