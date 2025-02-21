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

const PieC = ({ data }: { data: { name: string; value: any }[] }) => {
  return (
    <div className="w-full my-12 h-[28rem] bg-white border border-black/10 shadow-xl  rounded-lg ">
      <h1 className="font-bold text-2xl m-4">Revenue (Last 30 Days)</h1>
      <ResponsiveContainer height="90%">
        <PieChart margin={{ top: 20, left: 0, right: 60, bottom: 40 }}>
          <Pie
            data={data}
            dataKey="value"
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
