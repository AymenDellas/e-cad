import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/", // Change this to root since that's your login page
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    // Add other protected routes here
    // But exclude the root path since it's your login page
  ],
};
