"use client";

import React from "react";

import OrdersTable from "@/components/OrdersTable";

const page = () => {
  return (
    <section className="mx-28 mt-16">
      <h1 className="text-2xl font-bold my-4">Orders</h1>
      <OrdersTable />
    </section>
  );
};

export default page;
