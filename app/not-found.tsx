"use client";
import React from "react";
import "./globals.css";
import Link from "next/link";
const NotFound = () => {
  return (
    <section className="flex justify-center h-screen items-center font-poppins flex-col ">
      <p className="text-8xl font-bold bg-gradient-to-r from-[#3b4735] to-black text-transparent bg-clip-text">
        404
      </p>
      <p className="underline font-semibold text-3xl">
        This page doesn't exist
      </p>
      <Link
        href="/dashboard"
        className="px-4 py-3 rounded-md outline-none bg-[#3b4735] text-white m-4 hover:bg-[#3b4735]/80 transition-all duration-300 ease-out"
      >
        Dashboard
      </Link>
    </section>
  );
};

export default NotFound;
