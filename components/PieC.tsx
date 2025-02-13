"use client";
import React from "react";
import {
  PieChart,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PieC = () => {
  const data = [
    { name: "Page A", uv: 400, fill: "#0088FE" },
    { name: "Page B", uv: 1200, fill: "#00C49F" },
    { name: "Page C", uv: 900, fill: "#FFBB28" },
    { name: "Page D1", uv: 40, fill: "#FF8042" },
    { name: "Page D2", uv: 550, fill: "#A28BFE" },
    { name: "Page D3", uv: 320, fill: "#FF4567" },
  ];
  return (
    <div className="w-full my-12 h-[28rem] bg-white border border-black/10 shadow-xl  rounded-lg ">
      <h1 className="font-bold text-2xl m-4">Revenue (Last 30 Days)</h1>
      <ResponsiveContainer height="90%">
        <PieChart margin={{ top: 20, left: 0, right: 60, bottom: 40 }}>
          <Pie
            data={data}
            dataKey="uv"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            label
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieC;
