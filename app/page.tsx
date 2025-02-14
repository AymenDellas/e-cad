"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import { HashLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import "./globals.css";
const LoginPage = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (session) {
    router.replace("/dashboard");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false, // Prevents automatic redirect
        email,
        password,
      });

      console.log("Login response:", res);

      if (!res || res.error) {
        console.error("Auth error:", res?.error);
        setError("Invalid email or password.");
      } else {
        router.push("/dashboard"); // Redirect if login is successful
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="z-50 pt-36 mx-6 text-['#181d16']">
      <div className="flex flex-col justify-between border-black/20 border bg-white shadow-xl w-full max-w-[400px] px-12 py-8 mx-auto rounded-lg">
        <div className="space-y-1 mb-4 flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p>Login to your account</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="name@example.com"
              className="px-4 py-2 rounded-xl border border-text/20 focus:ring-2 transition-all duration-100 ease-out outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Password"
              className="px-4 py-2 rounded-xl border border-text/20 focus:ring-2 transition-all duration-100 ease-out outline-none"
            />
          </div>

          {error && (
            <div className="text-red-500 bg-red-200 p-4 rounded-lg border border-red-500 flex items-center space-x-2">
              <Info size={20} />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            className={`flex justify-center space-x-2 items-center rounded-xl p-2 text-xl text-white transition-colors duration-200 ease-out ${
              isLoading ? "bg-black/60" : "bg-black hover:bg-text/80"
            }`}
            disabled={isLoading}
          >
            {isLoading ? <HashLoader color="white" size={25} /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
