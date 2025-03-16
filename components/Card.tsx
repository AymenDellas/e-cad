"use client";
import React, { ReactNode } from "react";

type cardProp = {
  title: string;
  amount: number;
  sign: string;
  isLoading?: boolean;
  icon: ReactNode;
};
const Card = ({ amount, title, sign, icon }: cardProp) => {
  const newAmount = isNaN(amount) ? 0 : amount;
  return (
    <article
      className="p-4 flex flex-col justify-between w-full   m-2 border border-black/20 shadow-xl rounded-lg space-y-4 bg-card-light dark:bg-card-dark "
      suppressHydrationWarning
    >
      <div className="flex items-center justify-between ">
        <h1>{title}</h1>
        {icon}
      </div>
      <div className="flex items-center text-3xl font-bold">
        {sign}

        <p>{newAmount}</p>
      </div>
      <div className="text-black/50"></div>
    </article>
  );
};

export default Card;
