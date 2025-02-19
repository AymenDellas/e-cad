"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import dynamic from "next/dynamic";
const LineC = dynamic(() => import("./LineC"), { ssr: false });
import RecentOrdersTable from "./RecentOrdersTable";
import TopSellingProducts from "./TopSellingProducts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order } from "@/lib/types";
import { subDays, format } from "date-fns";
const MainContent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState<{ name: string; uv: number }[]>(
    []
  );
  useEffect(() => {
    const orderRef = collection(db, "orders");
    const getOrders = async () => {
      const data = await getDocs(orderRef);
      const dataWithId = data.docs.map((doc) => ({
        ...(doc.data() as Omit<Order, "id">),
        id: doc.id,
      }));
      setOrders(dataWithId);
    };
    getOrders();
    console.log(orders);
  }, []);

  const totalSales = orders.reduce(
    (acc, order) => (order.status === "delivered" ? acc + order.total : acc),
    0
  );
  const totalOrders = orders.length;
  useEffect(() => {
    const last7Days: { [key: string]: number } = {};
    for (let i = 6; i >= 0; i--) {
      const date = format(subDays(new Date(), i), "MM/dd");
      last7Days[date] = 0;
    }
    orders.forEach((order) => {
      const orderDate = format(new Date(order.date), "MM/dd");
      if (last7Days[orderDate] !== undefined) {
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
  }, [orders]);

  return (
    <section className="mx-4 lg:mx-24 mt-16 font-poppins  ">
      <h1 className="text-2xl font-bold my-4">Dashboard </h1>

      <div className="flex flex-col lg:flex-row items-center">
        <Card title="Total Sales" dolarSign="$" amount={totalSales} />
        <Card title="Total Orders" dolarSign="" amount={totalOrders} />
      </div>
      <LineC chartData={chartData} />
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        <RecentOrdersTable />
        <TopSellingProducts />
      </div>
    </section>
  );
};

export default MainContent;
