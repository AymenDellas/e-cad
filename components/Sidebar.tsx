"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  Moon,
  Sun,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [toggleDarkMode, setToggleDarkMode] = useState<string>("dark");
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/products", label: "Products", icon: Package },
    { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },

    {
      href: "/dashboard/analytics",
      label: "Analytics",
      icon: ChartNoAxesColumn,
    },
  ];
  const toggleTheme = () => {
    setToggleDarkMode(toggleDarkMode === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };
  return (
    <>
      <div
        className={`fixed z-50 cursor-pointer ${
          isSideBarOpen ? "hidden" : "block"
        }`}
        onClick={() => setIsSideBarOpen(true)}
      >
        <Menu
          className={`absolute rounded-md  mx-4 p-1 mt-3 top-0 hover:bg-gray-600/20 transition-colors duration-300 ease-out lg:hidden `}
          size={35}
        />
      </div>

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          h-[100dvh] w-64 
           shadow-xl  bg-transparent backdrop-blur-xl
          transition-transform duration-300 ease-in-out flex flex-col rounded-r-xl bg-card-light dark:bg-card-dark text-foreground-light  dark:text-foreground-dark
          
          
          ${
            isSideBarOpen
              ? "translate-x-0"
              : "-translate-x-[110%] lg:translate-x-0"
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

            {navItems.map((item: any) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2  transition-all duration-200 ease-out py-3 px-4 rounded-lg cursor-pointer ${
                    pathname === item.href
                      ? "bg-secondary-light text-white hover:bg-secondary-light/90"
                      : "hover:bg-gray-500/20"
                  }`}
                >
                  <item.icon />
                  <p>{item.label}</p>
                </Link>
              );
            })}
          </ul>
          <ul className="space-y-2 mx-2 my-8">
            <Link
              href=""
              className="flex items-center space-x-2 hover:bg-gray-500/20 transition-all duration-200 ease-out py-3 px-4 rounded-lg cursor-pointer "
            >
              <LifeBuoy />
              <p>Contact</p>
            </Link>
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center space-x-2 bg-secondary-light/20 hover:bg-gray-500/50 transition-all duration-200 ease-out p-[23px] rounded-lg cursor-pointer w-full `}
            >
              <Moon
                className={`${
                  toggleDarkMode === "dark"
                    ? "rotate-0 opacity-100 visible"
                    : "rotate-180 opacity-0 invisible"
                } transition-all duration-300 ease-out absolute`}
              />
              <Sun
                className={`${
                  toggleDarkMode === "light"
                    ? "rotate-0 opacity-100 "
                    : "-rotate-180 opacity-0 "
                } transition-all duration-300 ease-out absolute`}
              />
            </button>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
