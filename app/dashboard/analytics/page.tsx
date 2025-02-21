"use client";

import BarC from "@/components/BarC";
import PieC from "@/components/PieC";
import { useState, useEffect } from "react";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import { Order, Product } from "@/lib/types";

const page = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pieData, setPieData] = useState<{ name: string; value: any }[]>([]);
  const ordersRef = collection(db, "orders");
  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(ordersRef);
      const dataWithId = data.docs.map((doc) => ({
        ...(doc.data() as Omit<Order, "id">), // Tell TypeScript to trust that doc.data() matches Product type (except id)
        id: doc.id,
      }));
      setOrders(dataWithId);
    };
    getOrders();
  }, []);
  const getMonth = (date: string) => new Date(date).getMonth();
  const getFullYear = (date: string) => new Date(date).getFullYear();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const currentMonthRevenue = orders
    .filter(
      (order) =>
        getMonth(order.date) === currentMonth &&
        getFullYear(order.date) === currentYear
    )
    .reduce((acc, order) => acc + order.total, 0);
  const lastMonthRevenue = orders
    .filter(
      (order) =>
        getMonth(order.date) === lastMonth &&
        getFullYear(order.date) ===
          (currentMonth === 0 ? currentYear - 1 : currentYear)
    )
    .reduce((acc, order) => acc + order.total, 0);

  const revenueGrowth =
    lastMonthRevenue > 0
      ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : 100;
  useEffect(() => {
    const categoryRevenue: any = {};
    try {
      orders.forEach((order) => {
        order.cart.forEach((product: Product) => {
          if (!categoryRevenue[product.type]) {
            categoryRevenue[product.type] = 0;
          }
          categoryRevenue[product.type] += product.count * product.price;
        });
      });
      const formattedPieData = Object.entries(categoryRevenue).map(
        ([type, revenue]) => ({
          name: type,
          value: revenue,
        })
      );
      setPieData(formattedPieData);
    } catch (error) {
      console.log("error recieving data", error);
    }
  }, [orders]);
  return (
    <section className="mx-4 lg:mx-28 mt-16 flex flex-col text-primary">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold my-2">Analytics</h1>
      </div>
      <div className="flex lg:flex-row flex-col space-y-8 lg:space-x-8 ">
        <BarC />
        <PieC data={pieData} />
      </div>
      <div>last month revenue vs current month revenu: {revenueGrowth}%</div>
    </section>
  );
};

export default page;
