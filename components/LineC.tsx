"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineC = ({
  chartData,
}: {
  chartData: { name: string; uv: number }[];
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <div className="overflow-auto" suppressHydrationWarning>
      <div className="w-full min-w-[700px] my-12 h-[28rem]  border border-black/20 shadow-xl  rounded-lg overflow-y-hidden bg-card-light dark:bg-card-dark">
        <h1 className="font-bold text-2xl m-4">Revenue (Last 15 Days)</h1>
        <ResponsiveContainer height="90%">
          <LineChart
            key={JSON.stringify(chartData)}
            data={chartData}
            margin={{ top: 20, left: 0, right: 40, bottom: 40 }}
          >
            <Line type="monotone" dataKey="uv" stroke="#3b82f6" />
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
