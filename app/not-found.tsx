"use client";
import React from "react";
import "./globals.css";
const NotFound = () => {
  return (
    <section className="flex justify-center h-screen items-center font-poppins flex-col ">
      <p className="text-8xl font-bold bg-gradient-to-r from-[#3b4735] to-black text-transparent bg-clip-text">
        404
      </p>
      <p className="underline font-semibold text-3xl">
        This page doesn't exist
      </p>
    </section>
  );
};

export default NotFound;
