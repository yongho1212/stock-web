import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
// styled component가 아닌 외부 라이브러리를 사용하기때문에 명시적으로 불러와야함


const StockChart = ({ data }) => {
  const minPrice = Math.min(...data.map((item) => item.price));
  const reversedData = [...data].reverse();
  const { theme } = useContext(ThemeContext); 

  const fillMissingDates = (data) => {
    const filledData = [];
    const dataLength = data.length;

    for (let i = 0; i < dataLength - 1; i++) {
      filledData.push(data[i]);

      const currentDate = new Date(data[i].date);
      const nextDate = new Date(data[i + 1].date);
      const timeDiff = (nextDate - currentDate) / (24 * 60 * 60 * 1000);

      if (timeDiff > 1) {
        for (let j = 1; j < timeDiff; j++) {
          const missingDate = new Date(currentDate);
          missingDate.setDate(missingDate.getDate() + j);
          filledData.push({ date: missingDate.toISOString().split("T")[0], price: null });
        }
      }
    }

    filledData.push(data[dataLength - 1]);
    return filledData;
  };

  const filledData = fillMissingDates(reversedData);

    // 중간에 값이 비어있는 경우 이어붙이기
    for (let i = 1; i < filledData.length - 1; i++) {
      if ( filledData[i].price == undefined) {
        filledData[i].price = filledData[i - 1].price;
      }
    }

  return (
    <ResponsiveContainer width="100%" height={400} >
      <LineChart
        width={500}
        height={400}
        data={filledData}
        margin={{
          top: 5,
          right: 30,
          left: 21,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        {/* 최솟값 이상만 출력 */}
        <YAxis domain={["dataMin => (minPrice)", "auto"]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="price"
          stroke={theme["--900-color"]}
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
