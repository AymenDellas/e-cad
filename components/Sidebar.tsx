"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

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
  const { data: session } = useSession();
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
          h-[100dvh] w-64 
          bg-[#181d16] text-white
          transition-transform duration-300 ease-in-out flex flex-col rounded-r-xl
          
          ${
            isSideBarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          
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
            <h1 className="p-4 text-xl font-bold my-4 text-center">
              Admin Panel
            </h1>
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out py-2 px-4 rounded-lg cursor-pointer "
            >
              <LayoutDashboard size={20} />
              <p>Dashboard</p>
            </Link>
            <Link
              href="/dashboard/products"
              className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out py-2 px-4 rounded-lg cursor-pointer "
            >
              <Package size={20} />
              <p>Products</p>
            </Link>
            <Link
              href="/dashboard/orders"
              className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out py-2 px-4 rounded-lg cursor-pointer "
            >
              <ShoppingCart size={20} />
              <p>Orders</p>
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out py-2 px-4 rounded-lg cursor-pointer "
            >
              <Users size={20} />
              <p>Users</p>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out py-2 px-4 rounded-lg cursor-pointer "
            >
              <ChartNoAxesColumn size={20} />
              <p>Analytics</p>
            </Link>
          </ul>
          <ul className="my-8">
            <Link
              href=""
              className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out py-2 px-4 rounded-lg cursor-pointer "
            >
              <LifeBuoy size={20} />
              <p>Contact</p>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out py-2 px-4 rounded-lg cursor-pointer "
            >
              <Settings size={20} />
              <p>Settings</p>
            </Link>
            {session && (
              <>
                <Link
                  onClick={() => signOut()} // sign out
                  href=""
                  className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out py-2 px-4 rounded-lg cursor-pointer "
                >
                  <LogOut size={20} />
                  <p>Sign Out</p>
                </Link>
                <div className="flex items-center space-x-2 hover:bg-white/20 transition-all duration-200 ease-out py-2 px-4 rounded-lg cursor-pointer ">
                  {session?.user?.email}
                </div>
              </>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
