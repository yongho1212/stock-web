import axios from "axios";
import axiosInstance from './axiosInstance'


//공휴일 받아오기
const getPublicHolidays = async (year: string) : Promise<Array<string>> => {
  try {
    const apikey = process.env.REACT_APP_PUBLIC_DATA_API_KEY
    // const url = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&ServiceKey=${apikey}`;
    // const response = await axios.get(url);
    const response = await axiosInstance.get(`/api/holidays/${year}`)
    
    const holidays = response.data.response.body.items.item.map((item:any) => item.locdate);
    return holidays;
  } catch (err) {
    // 에러 발생
    console.log(err);
    return [];
  }
};


//최근 00일 날짜 받아오기(월~금까지)
const getWeekdaysSomeDays = () => {
  const today = new Date();
  const lastSomeDaysWeekdays = [];
  let weekdaysCounter = 0;

  for (let i = 0; weekdaysCounter < 50; i++) {
    const day = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    // 주말을 건너뛰고 평일만 추가합니다. (일요일은 0, 토요일은 6)
    if (day.getDay() !== 0 && day.getDay() !== 6) {
      // 날짜를 YYYYMMDD 형식으로 변경합니다.
      const formattedDate = [
        day.getFullYear(),
        ("0" + (day.getMonth() + 1)).slice(-2),
        ("0" + day.getDate()).slice(-2),
      ].join("");
      lastSomeDaysWeekdays.push(formattedDate);
      weekdaysCounter++;
    }
  }

  return lastSomeDaysWeekdays;
};

//받아온 날짜 범위에서 공휴일 제외하기
export const getWeekdaysLast52WeeksWithoutHolidays = async (): Promise<Array<string> | undefined> => {
  try {
    const weekdays = getWeekdaysSomeDays();
    const yearNum = new Date().getFullYear();
    const currYear = String(yearNum);
    const lastYear = String(yearNum-1);

    const publicHolidaysCurrYear = await getPublicHolidays(currYear);
    const publicHolidaysLastYear = await getPublicHolidays(lastYear);
    const publicHolidays = publicHolidaysCurrYear?.concat(publicHolidaysLastYear);

    const weekdaysWithoutHolidays = weekdays.filter((date) => !publicHolidays.includes(date));
    return weekdaysWithoutHolidays;
  } catch (err) {
    console.log(err);
  }
};




