"use client";
import React from "react";
import dynamic from "next/dynamic";
const MainContent = dynamic(() => import("@/components/MainContent"), {
  ssr: false,
});

const page = () => {
  return (
    <main className="font-poppins text-[#3b4735]">
      <MainContent />
    </main>
  );
};

export default page;
