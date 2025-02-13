import React from "react";

const OrdersTable = () => {
  return (
    <section className="w-full border border-black/20 p-4 shadow-xl rounded-lg">
      <h1 className="font-bold text-2xl m-4">Recent Orders</h1>
      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border  text-left p-3">Order ID</th>
              <th className="border  text-left p-3">Customer</th>
              <th className="border  text-left p-3">Status</th>
              <th className="border  text-left p-3">Total</th>
              <th className="border  text-left p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border  text-left p-3">ImagePlaceholder</td>
              <td className="border  text-left p-3">Product A</td>
              <td className="border  text-left p-3">
                <select name="status" id="status">
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td className="border  text-left p-3">50</td>
              <td className="border  text-left p-3">Edit/Delete</td>
            </tr>
            <tr>
              <td className="border  text-left p-3">ImagePlaceholder</td>
              <td className="border  text-left p-3">Product A</td>
              <td className="border  text-left p-3">
                <select name="status" id="status">
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td className="border  text-left p-3">50</td>
              <td className="border  text-left p-3">Edit/Delete</td>
            </tr>
            <tr>
              <td className="border  text-left p-3">ImagePlaceholder</td>
              <td className="border  text-left p-3">Product A</td>
              <td className="border  text-left p-3">
                <select name="status" id="status">
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td className="border  text-left p-3">50</td>
              <td className="border  text-left p-3">Edit/Delete</td>
            </tr>
            <tr>
              <td className="border  text-left p-3">ImagePlaceholder</td>
              <td className="border  text-left p-3">Product A</td>
              <td className="border  text-left p-3">
                <select name="status" id="status">
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td className="border  text-left p-3">50</td>
              <td className="border  text-left p-3">Edit/Delete</td>
            </tr>
            <tr>
              <td className="border  text-left p-3">ImagePlaceholder</td>
              <td className="border  text-left p-3">Product A</td>
              <td className="border  text-left p-3">
                <select name="status" id="status">
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td className="border  text-left p-3">50</td>
              <td className="border  text-left p-3">Edit/Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersTable;
