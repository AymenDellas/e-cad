"use client";

import React from "react";
import { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  LifeBuoy,
  Package,
  ShoppingCart,
  Users,
  ChartNoAxesColumn,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className="fixed  cursor-pointer"
        onClick={() => setIsSideBarOpen(true)}
      >
        <Menu
          className={`absolute rounded-lg border  mx-4 p-1 mt-3 top-0  lg:hidden${
            isSideBarOpen
              ? "text-white border-white/30"
              : "text-black border-black/30"
          }`}
          size={35}
        />
      </div>

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          h-screen w-64 
          bg-neutral-800 text-white
          transition-transform duration-300 ease-in-out
          ${
            isSideBarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          flex flex-col
          p-6
        `}
      >
        <div
          className="fixed top-4 left-4 cursor-pointer lg:hidden"
          onClick={() => setIsSideBarOpen(false)}
        >
          <X
            className={`absolute rounded-lg border ${
              isSideBarOpen
                ? "text-white border-white/30"
                : "text-black border-black/30"
            }`}
            size={30}
          />
        </div>
        <div className="min-h-full flex flex-col justify-between max-lg:text-xl">
          <ul className="space-y-4 ">
            <h1 className="p-4 text-2xl font-bold mb-8">Hello , Aymen</h1>
            <li className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out p-2 rounded-lg cursor-pointer">
              <LayoutDashboard />
              <p>Dashboard</p>
            </li>
            <li className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out p-2 rounded-lg cursor-pointer">
              <Package />
              <p>Products</p>
            </li>
            <li className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out p-2 rounded-lg cursor-pointer">
              <ShoppingCart />
              <p>Orders</p>
            </li>
            <li className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out p-2 rounded-lg cursor-pointer">
              <Users />
              <p>Users</p>
            </li>
            <li className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out p-2 rounded-lg cursor-pointer">
              <ChartNoAxesColumn />
              <p>Analytics</p>
            </li>
          </ul>
          <ul className="">
            <li className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out p-2 rounded-lg cursor-pointer">
              <LifeBuoy />
              <p>Contact</p>
            </li>
            <li className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out p-2 rounded-lg cursor-pointer">
              <Settings />
              <p>Settings</p>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
