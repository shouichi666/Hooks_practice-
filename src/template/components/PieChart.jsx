import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const PieChartComponent = (props) => {
  const review = Number(props.review);
  const unKnowun = 10 - review;
  const COLORS = ["#abff74", "#352c2c7e"];
  const data = [
    {
      name: "Review",
      value: review,
    },
    {
      name: "oo",
      value: unKnowun,
    },
  ];
  return (
    <PieChart width={props.width} height={props.height}>
      <Pie
        data={data}
        dataKey='value'
        nameKey='name'
        cx='50%'
        cy='50%'
        innerRadius={props.inner}
        outerRadius={props.outer}
        labelLine={true}
        startAngle={90}
        endAngle={-270}
        paddingAngle={0}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            strokeWidth={0}
          />
        ))}
        
      </Pie>
    </PieChart>
  );
};

export default PieChartComponent;
