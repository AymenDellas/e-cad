"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { MoonLoader } from "react-spinners";
const page = () => {
  const { data: session, status } = useSession<boolean>();

  if (!session) {
    redirect("/");
  } else {
    return <div>page</div>;
  }
};

export default page;
