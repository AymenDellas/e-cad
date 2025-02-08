import React from "react";

const TopSellingProducts = () => {
  return (
    <section className="w-full border border-black/10 p-4  shadow-xl rounded-lg ">
      <h1 className="font-bold text-2xl m-4">Top Selling Products</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p>Product A</p>
          <p className="text-black/50">120 sales</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Product B</p>
          <p className="text-black/50">80 sales</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Product C</p>
          <p className="text-black/50">60 sales</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Product D</p>
          <p className="text-black/50">40 sales</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Product E</p>
          <p className="text-black/50">20 sales</p>
        </div>
      </div>
    </section>
  );
};

export default TopSellingProducts;
