"use client";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${poppins.variable} antialiased`}>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden">{children}</main>
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
