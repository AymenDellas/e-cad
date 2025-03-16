"use client";
import React from "react";
import { useState, useEffect } from "react";

import { MoonLoader } from "react-spinners";
import supabase from "@/supabase";
const OrdersTable = () => {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getOrders = async () => {
      const { data, error }: any = await supabase.from("orders").select("*");
      if (error) console.error("Error fetching orders : ", orders);
      setOrders(data);
    };
    getOrders();
  }, []);
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({
        status: newStatus,
      })
      .eq("id", orderId);
    if (error) console.error("Error editing status : ", error);
    setOrders((prevOrders: any) =>
      prevOrders.map((order: any) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };
  const getSelectColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";

      case "shipped":
        return "bg-blue-200 text-blue-800";

      case "delivered":
        return "bg-green-200 text-green-800";
      default:
        break;
    }
  };
  return (
    <section
      className="w-full border border-black/20 p-4 shadow-xl rounded-lg"
      suppressHydrationWarning
    >
      <h1 className="font-bold text-2xl m-4">Recent Orders</h1>
      <div className="overflow-auto">
        <table className="w-full" key={orders.length}>
          <thead>
            <tr>
              <th className="border border-border-light dark:border-border-dark text-left p-3">
                Order
              </th>
              <th className="border border-border-light dark:border-border-dark text-left p-3">
                Customer
              </th>
              <th className="border border-border-light dark:border-border-dark text-left p-3 flex space-x-8 items-center">
                <p>Status</p>
                <span>{loading && <MoonLoader size={16} />}</span>
              </th>
              <th className="border border-border-light dark:border-border-dark text-left p-3">
                Total
              </th>
              <th className="border border-border-light dark:border-border-dark text-left p-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.cart[0].id} className="text-center">
                <td className="border border-border-light dark:border-border-dark text-left p-3">
                  {order.cart
                    .map((product: any) => {
                      return `${product.name}, (x${product.count})`;
                    })
                    .join(", ")}
                </td>
                <td className="border border-border-light dark:border-border-dark text-left p-3">
                  {order.firstName} {order.lastName}
                </td>
                <td className="border border-border-light dark:border-border-dark text-left p-3 w-52">
                  <div className="flex items-center gap-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`rounded-lg ${getSelectColor(
                        order.status
                      )} transition-all duration-500 ease-out`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </td>
                <td className="border border-border-light dark:border-border-dark text-left p-3 text-green-600">
                  ${order.total}
                </td>
                <td className="border border-border-light dark:border-border-dark text-left p-3 ">
                  {`${new Date(order.created_at).toLocaleDateString("en-GB")}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersTable;
