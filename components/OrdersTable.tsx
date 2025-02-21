"use client";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Order } from "@/lib/types";
import { MoonLoader } from "react-spinners";

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const productsRef = collection(db, "orders");

  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(productsRef);
      const dataWithId = data.docs.map((doc) => ({
        ...(doc.data() as Omit<Order, "id">),
        id: doc.id,
      }));
      setOrders(dataWithId);
    };
    getOrders();
  }, []);
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setLoading(true);
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setLoading(false);
    } catch (error) {
      console.error("Error updating status: ", error);
    }
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
    <section className="w-full border border-black/20 p-4 shadow-xl rounded-lg">
      <h1 className="font-bold text-2xl m-4">Recent Orders</h1>
      <div className="overflow-auto">
        <table className="w-full" key={orders.length}>
          <thead>
            <tr>
              <th className="border text-left p-3">Order</th>
              <th className="border text-left p-3">Customer</th>
              <th className="border text-left p-3 flex space-x-8 items-center">
                <p>Status</p>
                <span>{loading && <MoonLoader size={16} />}</span>
              </th>
              <th className="border text-left p-3">Total</th>
              <th className="border text-left p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.cart[0].id} className="text-center">
                <td className="border text-left p-3">
                  {order.cart
                    .map((product) => {
                      return `${product.name}, (x${product.count})`;
                    })
                    .join(", ")}
                </td>
                <td className="border text-left p-3">
                  {order.firstName} {order.lastName}
                </td>
                <td className="border text-left p-3 w-52">
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
                <td className="border text-left p-3 text-green-600">
                  ${order.total}
                </td>
                <td className="border text-left p-3 text-black/60">
                  {order.date}
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
