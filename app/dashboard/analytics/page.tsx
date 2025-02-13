"use client";

import React from "react";
import BarC from "@/components/BarC";
import PieC from "@/components/PieC";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { MoonLoader } from "react-spinners";
const page = () => {
  const { data: session, status } = useSession<boolean>();

  if (!session) {
    redirect("/");
  } else {
    return (
      <section className="mx-4 lg:mx-28 mt-16 flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold my-2">Analytics</h1>
        </div>
        <div className="flex lg:flex-row flex-col space-y-8 lg:space-x-8 ">
          <BarC />
          <PieC />
        </div>
      </section>
    );
  }
};

export default page;
