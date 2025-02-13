"use client";
import React from "react";
import MainContent from "@/components/MainContent";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const page = () => {
  const { data: session, status } = useSession<boolean>();
  console.log(session, status);
  if (status === "loading") {
    return null;
  }

  if (!session) {
    redirect("/");
    return null; // Ensure nothing is rendered
  }
  return (
    <main className="font-poppins text-[#3b4735]">
      <MainContent />
    </main>
  );
};

export default page;
