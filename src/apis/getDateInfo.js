import axios from "axios";

const apikey = process.env.REACT_APP_PUBLIC_DATA_API_KEY

//공휴일 받아오기
const getPublicHolidays = async (year) => {
  try {
    const apikey = process.env.REACT_APP_PUBLIC_DATA_API_KEY
    const url = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&ServiceKey=${apikey}`;
    const response = await axios.get(url);
    const holidays = response.data.response.body.items.item.map((item) => item.locdate);
    console.log(holidays)
    return holidays;
  } catch (err) {
    // 에러 발생
    console.log(err);
  }
};


//최근 52주 내 평일 
const getWeekdaysLast260Days = () => {
  const today = new Date();
  const last260DaysWeekdays = [];
  let weekdaysCounter = 0;

  for (let i = 0; weekdaysCounter < 260; i++) {
    const day = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    // 주말을 건너뛰고 평일만 추가합니다. (일요일은 0, 토요일은 6)
    if (day.getDay() !== 0 && day.getDay() !== 6) {
      // 날짜를 YYYYMMDD 형식으로 변경합니다.
      const formattedDate = [
        day.getFullYear(),
        ("0" + (day.getMonth() + 1)).slice(-2),
        ("0" + day.getDate()).slice(-2),
      ].join("");
      last260DaysWeekdays.push(formattedDate);
      weekdaysCounter++;
    }
  }

  return last260DaysWeekdays;
};


export const getWeekdaysLast52WeeksWithoutHolidays = async (apikey) => {
  try {
    const weekdays = getWeekdaysLast260Days();
    const currYear = new Date().getFullYear();
    const lastYear = currYear - 1;

    const publicHolidaysCurrYear = await getPublicHolidays(currYear, apikey);
    const publicHolidaysLastYear = await getPublicHolidays(lastYear, apikey);
    const publicHolidays = publicHolidaysCurrYear.concat(publicHolidaysLastYear);

    const weekdaysWithoutHolidays = weekdays.filter((date) => !publicHolidays.includes(date));
    return weekdaysWithoutHolidays;
  } catch (err) {
    console.log(err);
  }
};



// getWeekdaysLast52WeeksWithoutHolidays(apikey).then((result) => console.log(result));
