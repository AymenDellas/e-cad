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
import ClientOnly from "./ClientOnly";
type BarCType = {
  data: { hour: number; count: number }[];
};
const BarC = ({ data }: BarCType) => {
  return (
    <div
      className="w-full my-12 h-[28rem] bg-card-light dark:bg-card-dark border border-black/10 shadow-xl rounded-lg"
      suppressHydrationWarning
    >
      <h1 className="text-2xl p-4">Revenue (Last 30 Days)</h1>
      <ClientOnly>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={data}
            margin={{ top: 20, left: 0, right: 40, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#b7e3ca" />
          </BarChart>
        </ResponsiveContainer>
      </ClientOnly>
    </div>
  );
};

export default BarC;
