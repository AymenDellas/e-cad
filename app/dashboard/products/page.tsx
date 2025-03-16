"use client";

import React from "react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import ProductsTable from "@/components/ProductsTable";
import supabase from "@/supabase";

import { MoonLoader } from "react-spinners";
import Link from "next/link";
const page = () => {
  const [products, setProducts] = useState<any>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error fetching products: ", error);
        return;
      }

      setProducts([...data]);
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter((product: any) =>
    product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  return (
    <section className="mx-4 lg:mx-28 mt-16 flex flex-col text-primary">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold my-4">Products</h1>
        <Link
          href="add_product"
          className="py-2 px-4 bg-primary-light dark:bg-primary-dark text-white rounded-md outline-none"
        >
          Add New Product
        </Link>
      </div>
      <input
        type="text"
        name="Psearch"
        id="Psearch"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        placeholder="Search  products..."
        className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-4 bg-foreground-dark dark:bg-foreground-light"
      />
      <ProductsTable filteredProducts={filteredProducts} />
    </section>
  );
};

export default page;
