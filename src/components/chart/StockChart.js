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

const StockChart = ({data}) => {

  const minPrice = Math.min(...data.map(item => item.price));
  const reversedData = [...data].reverse();



  return (
    
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={reversedData}
        margin={{
          top: 5,
          right: 30,
          left: 21,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        {/* 최솟값이상만 출력 */}
        <YAxis domain={['dataMin => (minPrice)', 'auto']} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
    
  );
};

export default StockChart;
