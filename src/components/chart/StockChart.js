// import React, { useRef, useEffect } from "react";
// import * as d3 from "d3";

// const StockChart = ({ data, width, height }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     if (!data) return;
//     // select = 태그 하나 선택
//     const svg = d3.select(svgRef.current);

//     // 설정 x, y 스케일
//     const xScale = d3
//       .scaleTime()
//       .domain(d3.extent(data, (d) => new Date(d.date)))
//       .range([0, width]);

//     const yScale = d3
//       .scaleLinear()
//       .domain(d3.extent(data, (d) => d.price))
//       .range([height, 0]);

//     // 라인 생성
//     const lineGenerator = d3
//       .line()
//       .x((d) => xScale(new Date(d.date)))
//       .y((d) => yScale(d.price))
//       .curve(d3.curveMonotoneX);

//     // 라인 그리기
//     svg
//     //selectall은 태그 전체 선택
//       .selectAll(".line")
//       //데이터 로딩
//       .data([data])
//       .join("path")
//       .attr("class", "line")
//       .attr("d", lineGenerator)
//       .attr("fill", "none")
//       .attr("stroke", "steelblue")
//       .attr("stroke-width", 1.5);

//     // 축 생성
//     const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d"));
//     const yAxis = d3.axisLeft(yScale);

//     // 축 그리기
//     svg
//       .select(".x-axis")
//       .attr("transform", `translate(0, ${height})`)
//       .call(xAxis);
      

//     svg.select(".y-axis").call(yAxis);
//   }, [data, height, width]);

//   return (
//     <svg ref={svgRef} width={width} height={height}>
//       <g className="x-axis" />
//       <g className="y-axis" />
//     </svg>
//   );
// };

// export default StockChart;
