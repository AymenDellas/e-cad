"use client";
import BarC from "@/components/BarC";
import PieC from "@/components/PieC";
import { useState, useEffect, JSXElementConstructor } from "react";
import supabase from "@/supabase";
import { Diff, Pyramid } from "lucide-react";
import { Order, Product } from "@/lib/types";
import Card from "@/components/Card";
import { useGetOrders, useGetProducts } from "@/store";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const orders = useGetOrders((state) => state.orders);
  const getOrders = useGetOrders((state) => state.getOrders);
  const products = useGetProducts((state) => state.products);
  const getProducts = useGetProducts((state) => state.getProducts);
  const [pieData, setPieData] = useState<{ name: string; value: any }[]>([]);
  const [aov, setAov] = useState<number>(0);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [peakOrderTimes, setPeakOrderTimes] = useState<
    { hour: number; count: number }[]
  >([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const getMonth = (date: string) => new Date(date).getMonth();
  const getFullYear = (date: string) => new Date(date).getFullYear();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  useEffect(() => {
    getOrders();
  }, [getOrders]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const currentMonthRevenue = orders
    .filter(
      (order) =>
        order.status === "delivered" &&
        getMonth(order.created_at) === currentMonth &&
        getFullYear(order.created_at) === currentYear
    )
    .reduce((acc, order) => acc + order.total, 0);
  const lastMonthRevenue = orders
    .filter(
      (order) =>
        order.status === "delivered" &&
        getMonth(order.created_at) === lastMonth &&
        getFullYear(order.created_at) ===
          (currentMonth === 0 ? currentYear - 1 : currentYear)
    )
    .reduce((acc, order) => acc + order.total, 0);

  const revenueGrowth = (
    lastMonthRevenue > 0
      ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : 100
  ).toFixed(2);

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

  useEffect(() => {
    //calculating totalSales and totalOrders
    const totalSales = orders.reduce(
      (acc, order) => (order.status === "delivered" ? acc + order.total : acc),
      0
    );
    const totalOrders = orders.length;
    setTotalOrders(totalOrders);
    setTotalSales(totalSales);
  }, [orders]);
  useEffect(() => {
    // calculating the aov
    const newAov = totalOrders > 0 ? totalSales / totalOrders : 0;
    setAov(Number(newAov.toFixed(1)));
  }, [totalSales, totalOrders]);
  useEffect(() => {
    // calculating low stock products
    if (products) {
      const lowStock = products.filter((product: Product) => product.stock < 5);
      setLowStockProducts(lowStock);
    }
  }, [products]);
  useEffect(() => {
    //calculating peak order hours
    const ordersCount: Record<number, number> = {};

    orders.forEach((order) => {
      const hour = new Date(order.created_at).getHours();
      if (!ordersCount[hour]) {
        ordersCount[hour] = 0;
      }
      ordersCount[hour]++;
    });
    const formattedOrdersCount = Object.entries(ordersCount).map(
      ([hour, count]) => ({
        hour: parseInt(hour),
        count,
      })
    );
    const filteredOrdersCount = formattedOrdersCount
      .sort((a, b) => a.count - b.count)
      .slice(0, 5);
    setPeakOrderTimes(filteredOrdersCount);
  }, [orders]);
  return (
    <section className="mx-4 lg:mx-28 mt-16 flex flex-col text-primary">
      <div className="absolute inset-0 opacity-50 -z-10">
        <div className="relative h-full w-full bg-red [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <div></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold my-2">Analytics</h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center">
        <Card
          title="Revenue Comparison: Last Month vs. This Month"
          sign="%"
          amount={Number(revenueGrowth)}
          icon={<Diff />}
        />
        <Card
          title="Average Order Value (AOV)"
          sign="%"
          amount={aov}
          icon={<Pyramid />}
        />
      </div>
      <div className="flex lg:flex-row flex-col space-y-8 lg:space-x-8 lg:space-y-0 items-center ">
        <BarC data={peakOrderTimes} />
        <PieC data={pieData} />
      </div>
      <section
        className="w-full border border-black/20 p-4 shadow-xl rounded-lg bg-card-light dark:bg-card-dark"
        suppressHydrationWarning
      >
        <div className="m-2 space-y-2">
          <h1 className="font-bold text-2xl ">Stock & Inventory Status</h1>
          <h3 className=" text-xl opacity-80">
            Alert for low-stock or out-of-stock products
          </h3>
        </div>
        <div key={159} className="space-y-4 mt-8">
          {lowStockProducts.map((product, index) => {
            return (
              <div key={index}>
                {product.stock > 0 ? (
                  <div className="flex justify-between items-center ">
                    <p>{product.name}</p>
                    <div className="flex space-x-2 items-center text-sm">
                      <p className="text-yellow-800 bg-yellow-100 rounded-2xl px-2 py-1">
                        Low Stock
                      </p>
                      <p>{product.stock} Units</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center ">
                    <p>{product.name}</p>
                    <div className="flex space-x-2 items-center text-sm">
                      <p className="text-red-800 bg-red-100 rounded-2xl px-2 py-1">
                        Out of Stock
                      </p>
                      <p>{product.stock} Units</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default page;
