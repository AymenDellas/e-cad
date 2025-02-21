"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import dynamic from "next/dynamic";
const LineC = dynamic(() => import("./LineC"), { ssr: false });
import RecentOrdersTable from "./RecentOrdersTable";
import TopSellingProducts from "./TopSellingProducts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order, Product } from "@/lib/types";
import { subDays, format, getMonth } from "date-fns";
import { MoonLoader } from "react-spinners";
import { de } from "date-fns/locale";
const MainContent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState<{ name: string; uv: number }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    try {
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
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching the orders", error);
    }
  }, []);

  const totalSales = orders.reduce(
    (acc, order) => (order.status === "delivered" ? acc + order.total : acc),
    0
  );
  const totalOrders = orders.length;
  useEffect(() => {
    setIsLoading(true);
    try {
      const last7Days: { [key: string]: number } = {};
      for (let i = 29; i >= 0; i--) {
        const date = format(subDays(new Date(), i), "MM/dd");
        last7Days[date] = 0;
      }
      orders.forEach((order) => {
        const orderDate = format(new Date(order.date), "MM/dd");
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
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  }, [orders]);

  return (
    <section className="mx-4 lg:mx-24 mt-16 font-poppins text-primary ">
      <h1 className="text-2xl font-bold my-4">Dashboard </h1>

      <div className="flex flex-col lg:flex-row items-center">
        <Card
          title="Total Sales"
          dolarSign="$"
          amount={totalSales}
          isLoading={isLoading}
        />
        <Card
          title="Total Orders"
          dolarSign=""
          amount={totalOrders}
          isLoading={isLoading}
        />
      </div>
      <LineC chartData={chartData} />
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        <RecentOrdersTable orders={orders} />
        <TopSellingProducts orders={orders} />
      </div>
    </section>
  );
};

export default MainContent;
