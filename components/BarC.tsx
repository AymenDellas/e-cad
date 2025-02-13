"use client";
import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarC = () => {
  const data = [
    { name: "Page A", uv: 400 },
    { name: "Page B", uv: 1200 },
    { name: "Page C", uv: 900 },
    { name: "Page D", uv: 40 },
    { name: "Page E", uv: 550 },
    { name: "Page F", uv: 320 },
  ];

  return (
    <div className="w-full my-12 h-[28rem] bg-white border border-black/10 shadow-xl rounded-lg">
      <h1 className="font-bold text-2xl m-4">Revenue (Last 30 Days)</h1>
      <ResponsiveContainer height="90%">
        <BarChart
          data={data}
          margin={{ top: 20, left: 0, right: 60, bottom: 40 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="4 4" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="uv" fill="#FF4567" />

          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarC;
