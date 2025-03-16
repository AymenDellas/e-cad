"use client";
import React from "react";

import { Order } from "@/lib/types";

const RecentOrdersTable = ({ orders }: { orders: Order[] }) => {
  return (
    <section
      className="w-full border border-black/20 p-4 shadow-xl rounded-lg bg-card-light dark:bg-card-dark"
      suppressHydrationWarning
    >
      <h1 className="font-bold text-2xl m-4">Recent Orders</h1>
      <div className="overflow-auto">
        <table className="w-full border-collapse border border-border-light dark:border-border-dark">
          <thead>
            <tr className="">
              <th className="border border-border-light dark:border-border-dark p-4 text-left">
                Order ID
              </th>
              <th className="border border-border-light dark:border-border-dark p-3 text-left">
                Customer
              </th>
              <th className="border border-border-light dark:border-border-dark p-3 text-left">
                Status
              </th>
              <th className="border border-border-light dark:border-border-dark p-3 text-left">
                Total
              </th>
              <th className="border border-border-light dark:border-border-dark p-3 text-left">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders
              ?.sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .slice(0, 4)
              .map((order) => {
                return (
                  <tr key={order.id}>
                    <td className="border border-border-light dark:border-border-dark p-3 text-left">
                      {order.cart[0].name}
                    </td>
                    <td className="border border-border-light dark:border-border-dark p-3 text-left">
                      {order.firstName} {order.lastName}
                    </td>
                    <td className="border border-border-light dark:border-border-dark p-3 text-left">
                      {order.status}
                    </td>
                    <td className="border border-border-light dark:border-border-dark p-3 text-left">
                      {order.total}
                    </td>
                    <td className="border border-border-light dark:border-border-dark p-3 text-left">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentOrdersTable;
