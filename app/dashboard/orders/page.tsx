"use client";

import React from "react";

import OrdersTable from "@/components/OrdersTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { MoonLoader } from "react-spinners";
const page = () => {
  const { data: session, status } = useSession<boolean>();

  if (!session) {
    redirect("/");
  } else {
    return (
      <section className="mx-28 mt-16">
        <h1 className="text-2xl font-bold my-4">Orders</h1>
        <OrdersTable />
      </section>
    );
  }
};

export default page;
