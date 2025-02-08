import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "E-commerce admin dashboard",
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Choose desired weights
  variable: "--font-poppins", // Custom CSS variable
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} `}>
        <div className="flex ">
          <Sidebar />

          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
