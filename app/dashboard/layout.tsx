import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "...",
  description: "...",
};

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
      <body className={`${poppins.variable} antialiased`}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
