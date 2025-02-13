"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Divide, X } from "lucide-react";
import ProductsTable from "@/components/ProductsTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { MoonLoader } from "react-spinners";
import { Product } from "@/components/ProductsTable";
const page = () => {
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [newPrice, setNewPrice] = useState<number | undefined>(undefined);
  const [newType, setNewType] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState<string>("");
  const [newStock, setNewStock] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const { data: session, status } = useSession<boolean>();

  const productsRef = collection(db, "products");
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsRef);
      const dataWithId = data.docs.map((doc) => ({
        ...(doc.data() as Omit<Product, "id">), // Tell TypeScript to trust that doc.data() matches Product type (except id)
        id: doc.id,
      }));
      setProducts(dataWithId);
    };
    getProducts();
  }, []);

  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productRef = collection(db, "products");
    try {
      setIsLoading(true);
      await addDoc(productRef, {
        name: newName,
        price: newPrice,
        type: newType,
        imageUrl: newImageUrl,
        stock: newStock,
      });
      setIsLoading(false);
      setDisplayForm(false);
    } catch (error) {
      console.log("error adding a product", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  if (!session) {
    redirect("/");
  } else {
    return (
      <section className="mx-4 lg:mx-28 mt-16 flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold my-4">Products</h1>
          <button
            className="py-2 px-4 bg-black text-white rounded-md outline-none"
            onClick={() => setDisplayForm(true)}
          >
            Add New Product
          </button>
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
          className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-4"
        />
        <ProductsTable filteredProducts={filteredProducts} />
        {displayForm && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-black/20 flex items-center justify-center">
              {isLoading ? (
                <div>
                  <MoonLoader />
                </div>
              ) : (
                <form onSubmit={addProduct} className="bg-white p-4 rounded-md">
                  <X
                    onClick={() => setDisplayForm(false)}
                    className="cursor-pointer"
                  />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={newName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewName(e.target.value)
                    }
                    className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-4"
                  />
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                    value={newPrice}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewPrice(Number(e.target.value))
                    }
                    className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-4"
                  />
                  <input
                    type="text"
                    name="type"
                    id="type"
                    placeholder="Type"
                    value={newType}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewType(e.target.value)
                    }
                    className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-4"
                  />
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    placeholder="Image URL"
                    value={newImageUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewImageUrl(e.target.value)
                    }
                    className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-4"
                  />
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={newStock}
                    placeholder="Stock"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewStock(Number(e.target.value))
                    }
                    className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-4"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Save
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </section>
    );
  }
};

export default page;
