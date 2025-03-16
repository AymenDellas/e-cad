"use client";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
export const dynamic = "force-dynamic";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const suppressHydrationWarning = `
  (function() {
    if (typeof window !== 'undefined') {
      window.__NEXT_HYDRATION_MARK_MISMATCH__ = true;
    }
  })();
`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: suppressHydrationWarning }}
        />
      </head>
      <body
        className={`${poppins.variable} antialiased bg-background-light text-foreground-light dark:text-foreground-dark dark:bg-background-dark`}
      >
        {children}
      </body>
    </html>
  );
}
