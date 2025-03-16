"use client";
import React, { useEffect, useState } from "react";
import { useGetOrders } from "@/store";
import dynamic from "next/dynamic";
const LineC = dynamic(() => import("./LineC"), { ssr: false });

const Card = dynamic(() => import("./Card"), { ssr: false });
const RecentOrdersTable = dynamic(() => import("./RecentOrdersTable"), {
  ssr: false,
});
const TopSellingProducts = dynamic(() => import("./TopSellingProducts"), {
  ssr: false,
});

import { Order } from "@/lib/types";
import { subDays, format } from "date-fns";
import supabase from "@/supabase";
import { DollarSign } from "lucide-react";
const MainContent = () => {
  const getOrders = useGetOrders((state) => state.getOrders);
  const orders = useGetOrders((state) => state.orders);
  const [chartData, setChartData] = useState<{ name: string; uv: number }[]>(
    []
  );
  useEffect(() => {
    getOrders();
  }, [getOrders]);
  const totalSales = orders.reduce(
    (acc, order) => (order.status === "delivered" ? acc + order.total : acc),
    0
  );
  const totalOrders = orders.length;
  useEffect(() => {
    try {
      const last7Days: { [key: string]: number } = {};
      for (let i = 14; i >= 0; i--) {
        const date = format(subDays(new Date(), i), "MM/dd");
        last7Days[date] = 0;
      }
      orders.forEach((order) => {
        const orderDate = format(new Date(order.created_at), "MM/dd");
        if (
          last7Days[orderDate] !== undefined &&
          order.status === "delivered"
        ) {
          last7Days[orderDate] += order.total;
        }
      });
      const formattedChartData = Object.entries(last7Days).map(
        ([date, revenue]) => ({
          name: date,
          uv: Number(revenue),
        })
      );
      setChartData(formattedChartData);
    } catch (error) {
      console.log("Error", error);
    }
  }, [orders]);

  return (
    <section className="mx-4 lg:mx-24 mt-16 font-poppins ">
      <h1 className="text-2xl font-bold my-4 ">Dashboard </h1>

      <div className="flex flex-col lg:flex-row items-center">
        <Card
          title="Total Sales"
          sign="$"
          amount={totalSales}
          icon={<DollarSign />}
        />
        <Card
          title="Total Orders"
          sign=""
          amount={totalOrders}
          icon={<DollarSign />}
        />
      </div>
      <LineC chartData={chartData} />
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0 ">
        <RecentOrdersTable orders={orders} />
        <TopSellingProducts orders={orders} />
      </div>
    </section>
  );
};

export default MainContent;
