import React from "react";

const RecentOrdersTable = () => {
  return (
    <section className="w-full border border-black/10 p-4 shadow-xl rounded-lg">
      <h1 className="font-bold text-2xl m-4">Recent Orders</h1>
      <table className="w-full">
        <thead>
          <tr className="">
            <th className="border p-3 text-left">Order ID</th>
            <th className="border p-3 text-left">Customer</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Total</th>
            <th className="border p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-3 text-left">1</td>
            <td className="border p-3 text-left">John Doe</td>
            <td className="border p-3 text-left">Delivered</td>
            <td className="border p-3 text-left">$120.50</td>
            <td className="border p-3 text-left">
              {new Date().getUTCFullYear()}
            </td>
          </tr>
          <tr>
            <td className="border p-3 text-left">1</td>
            <td className="border p-3 text-left">John Doe</td>
            <td className="border p-3 text-left">Delivered</td>
            <td className="border p-3 text-left">$120.50</td>
            <td className="border p-3 text-left">
              {new Date().getUTCFullYear()}
            </td>
          </tr>
          <tr>
            <td className="border p-3 text-left">1</td>
            <td className="border p-3 text-left">John Doe</td>
            <td className="border p-3 text-left">Delivered</td>
            <td className="border p-3 text-left">$120.50</td>
            <td className="border p-3 text-left">
              {new Date().getUTCFullYear()}
            </td>
          </tr>
          <tr>
            <td className="border p-3 text-left">1</td>
            <td className="border p-3 text-left">John Doe</td>
            <td className="border p-3 text-left">Delivered</td>
            <td className="border p-3 text-left">$120.50</td>
            <td className="border p-3 text-left">
              {new Date().getUTCFullYear()}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default RecentOrdersTable;
