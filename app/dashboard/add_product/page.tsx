"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/supabase";
import { MoonLoader } from "react-spinners";
import { useDropzone } from "react-dropzone";

const AddProductPage = () => {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState<number | undefined>(undefined);
  const [newType, setNewType] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [newStock, setNewStock] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setNewImage(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    let imageUrl = "";

    try {
      if (newImage) {
        const fileExt = newImage.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, newImage, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${filePath}`;
        console.log("Image uploaded successfully:", imageUrl);
      }

      const { data, error } = await supabase.from("products").insert([
        {
          name: newName,
          price: newPrice,
          type: newType,
          imageUrl,
          stock: newStock,
        },
      ]);

      if (error) throw error;

      router.push("/dashboard/products");
    } catch (error) {
      setError(`Error adding product: ${error}`);
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 opacity-20 -z-10">
        <div className="relative h-full w-full bg-red [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <div></div>
        </div>
      </div>

      <section className="flex items-center h-full justify-center">
        <div className="h-fit w-96 mx-auto border border-border-light dark:border-border-dark shadow-lg rounded-lg">
          {isLoading ? (
            <MoonLoader size={40} />
          ) : (
            <form
              onSubmit={addProduct}
              className="p-4 rounded-md bg-card-light dark:bg-card-dark"
            >
              <h1 className="text-2xl font-bold my-2">Add Product</h1>
              {error && <p className="text-red-500">{error}</p>}
              <div>
                <label htmlFor="name" className="text-sm">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-2 bg-foreground-dark dark:bg-foreground-light text-primary-light dark:text-primary-dark"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="text-sm">
                  Price:
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-2 bg-foreground-dark dark:bg-foreground-light text-primary-light dark:text-primary-dark"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="text-sm">
                  Type:
                </label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  placeholder="Type"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-2 bg-foreground-dark dark:bg-foreground-light text-primary-light dark:text-primary-dark"
                  required
                />
              </div>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-400 p-4 text-center rounded-md my-2 bg-foreground-dark dark:bg-foreground-light text-primary-light dark:text-primary-dark"
              >
                <input {...getInputProps()} />
                <p>Drag & drop an image here, or click to select one</p>
                {newImage && (
                  <p className="mt-2">Selected file: {newImage.name}</p>
                )}
              </div>
              {preview && (
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">Preview:</h2>
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
              <div>
                <label htmlFor="stock" className="text-sm">
                  Stock:
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={newStock}
                  onChange={(e) => setNewStock(Number(e.target.value))}
                  placeholder="Stock"
                  className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-2 bg-foreground-dark dark:bg-foreground-light text-primary-light dark:text-primary-dark"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-secondary-light text-white p-2 rounded-lg w-full hover:bg-secondary-light/90 transition-colors duration-200 ease-out my-1"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard/products")}
                className="border border-border-dark text-border-dark p-2 rounded-lg w-full hover:bg-secondary-light/10 transition-colors duration-200 ease-out my-1"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default AddProductPage;
