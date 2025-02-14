"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { MoonLoader } from "react-spinners";
const page = () => {
  const { data: session, status } = useSession<boolean>();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    redirect("/");
    return null;
  }
  return <div>page</div>;
};

export default page;
