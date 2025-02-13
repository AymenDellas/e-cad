"use client";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineC = () => {
  const data = [
    { name: "Page A", uv: 400 },
    { name: "Page B", uv: 1200 },
    { name: "Page C", uv: 900 },
    { name: "Page D", uv: 40 },
    { name: "Page D", uv: 550 },
    { name: "Page D", uv: 320 },
  ];
  return (
    <div className="overflow-auto">
      <div className="w-full min-w-[700px] my-12 h-[28rem] bg-white border border-black/20 shadow-xl  rounded-lg ">
        <h1 className="font-bold text-2xl m-4">Revenue (Last 30 Days)</h1>
        <ResponsiveContainer height="90%">
          <LineChart
            data={data}
            margin={{ top: 20, left: 0, right: 60, bottom: 40 }}
          >
            <Line type="monotone" dataKey="uv" stroke="#3b4735" />
            <CartesianGrid stroke="#ccc" strokeDasharray="4 4 " />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineC;
