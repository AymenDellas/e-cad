import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "E-commerce admin dashboard",
  description:
    "Comprehensive admin interface for managing e-commerce operations and analytics.",
  other: {
    "react-hydration": "suppress-hydration-warning",
  },
};

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
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: suppressHydrationWarning }}
        />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden">
            <div className="mx-4 lg:mx-8 xl:mx-16 py-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
