"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";

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
  LogOut,
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
          className={`absolute rounded-md  mx-4 p-1 mt-3 top-0 hover:bg-gray-600/20 transition-colors duration-300 ease-out lg:hidden`}
          size={35}
        />
      </div>

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          h-[100dvh] w-64 
          text-black shadow-xl  bg-white/70 backdrop-blur-sm
          transition-transform duration-300 ease-in-out flex flex-col rounded-r-xl
          
          
          ${
            isSideBarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          
        `}
      >
        <div
          className="fixed top-4 right-12 cursor-pointer lg:hidden"
          onClick={() => setIsSideBarOpen(false)}
        >
          <X className={`absolute rounded-lg`} size={30} />
        </div>
        <div className="min-h-full flex flex-col justify-between max-lg:text-lg  ">
          <ul className="space-y-4 mx-2">
            <h1 className="p-2 text-2xl font-semibold my-4">Admin</h1>
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 hover:bg-gray-500/20 transition-all duration-200 ease-out py-3 px-4 rounded-lg cursor-pointer"
            >
              <LayoutDashboard />
              <p>Dashboard</p>
            </Link>
            <Link
              href="/dashboard/products"
              className="flex items-center space-x-2 hover:bg-gray-500/20 transition-all duration-200 ease-out py-3 px-4 rounded-lg cursor-pointer "
            >
              <Package />
              <p>Products</p>
            </Link>
            <Link
              href="/dashboard/orders"
              className="flex items-center space-x-2 hover:bg-gray-500/20 transition-all duration-200 ease-out py-3 px-4 rounded-lg cursor-pointer "
            >
              <ShoppingCart />
              <p>Orders</p>
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center space-x-2 hover:bg-gray-500/20 transition-all duration-200 ease-out py-3 px-4 rounded-lg cursor-pointer "
            >
              <Users />
              <p>Users</p>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center space-x-2 hover:bg-gray-500/20 transition-all duration-200 ease-out py-3 px-4 rounded-lg cursor-pointer "
            >
              <ChartNoAxesColumn />
              <p>Analytics</p>
            </Link>
          </ul>
          <ul className="space-y-2 mx-2 my-8">
            <Link
              href=""
              className="flex items-center space-x-2 hover:bg-gray-500/20 transition-all duration-200 ease-out py-3 px-4 rounded-lg cursor-pointer "
            >
              <LifeBuoy />
              <p>Contact</p>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-2 hover:bg-gray-500/20 transition-all duration-200 ease-out py-3 px-4 rounded-lg cursor-pointer "
            >
              <Settings />
              <p>Settings</p>
            </Link>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
