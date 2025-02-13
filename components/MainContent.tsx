import React from "react";
import Card from "./Card";
import LineC from "./LineC";
import RecentOrdersTable from "./RecentOrdersTable";
import TopSellingProducts from "./TopSellingProducts";

const MainContent = () => {
  return (
    <section className="mx-4 lg:mx-24 mt-16 font-poppins  ">
      <h1 className="text-2xl font-bold my-4">Dashboard</h1>
      <div className="flex flex-col lg:flex-row items-center">
        <Card amount={1600} title="Total Sales" dolarSign="$" />
        <Card amount={850} title="Total Orders" dolarSign="" />
      </div>
      <LineC />
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        <RecentOrdersTable />
        <TopSellingProducts />
      </div>
    </section>
  );
};

export default MainContent;
