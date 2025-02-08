import React from "react";
import { ShoppingCart, DollarSign } from "lucide-react";

type cardProp = {
  title: string;
  amount: number;
};
const Card = ({ amount, title }: cardProp) => {
  return (
    <article className="p-4 flex flex-col justify-between w-full lg:w-72  m-2 border border-black/10 shadow-xl rounded-lg space-y-4">
      <div className="flex items-center justify-between ">
        <h1>{title}</h1>
        <DollarSign />
      </div>
      <div className="flex items-center text-3xl font-bold">
        $<p>{amount}</p>
      </div>
      <div className="text-black/50">
        <p>+20.1% from last month</p>
      </div>
    </article>
  );
};

export default Card;
