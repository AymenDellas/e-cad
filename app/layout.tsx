// app/layout.tsx
"use client";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${poppins.variable} antialiased`}>{children}</body>
      </SessionProvider>
    </html>
  );
}
