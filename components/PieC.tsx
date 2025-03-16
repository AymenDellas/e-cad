"use client";
import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import ClientOnly from "./ClientOnly";

const PieC = ({ data }: { data: { name: string; value: any }[] }) => {
  const COLORS = ["#aba8ff", "#ffcefd", "#b7e3ca"];

  return (
    <div
      className="w-full my-12 h-[28rem] bg-card-light dark:bg-card-dark border border-black/10 shadow-xl rounded-lg"
      suppressHydrationWarning
    >
      <h1 className="text-2xl p-4">Revenue By category</h1>
      <ClientOnly>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ClientOnly>
    </div>
  );
};

export default PieC;
