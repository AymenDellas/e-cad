"use client";
import React, { useEffect, useState } from "react";
import { Order } from "@/lib/types";
import { useRouter } from "next/navigation";

const TopSellingProducts = ({ orders }: { orders: Order[] }) => {
  const router = useRouter();
  const [topProducts, setTopProducts] = useState<
    { name: string; sales: number }[]
  >([]);

  useEffect(() => {
    const productSales: Record<string, number> = {};
    orders.map((order) => {
      order.cart.forEach((product) => {
        if (!productSales[product.name]) {
          productSales[product.name] = 0;
        }
        productSales[product.name] += product.count;
      });
    });
    const sortedProducts = Object.entries(productSales)
      .map(([name, sales]) => ({
        name,
        sales,
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
    setTopProducts(sortedProducts);
  }, [orders]);
  return (
    <section
      className="w-full border border-black/20 p-4 shadow-xl rounded-lg bg-card-light dark:bg-card-dark"
    >
      <h1 className="font-bold text-2xl m-4">Top Selling Products</h1>
      <div className="space-y-4 mt-8">
        {topProducts.map((item) => (
          <div key={`product-${item.name}`} className="flex items-center justify-between">
            <p>{item.name}</p>
            <p className="">{item.sales} sales</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSellingProducts;
