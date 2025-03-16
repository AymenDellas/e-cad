"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/supabase";
import { MoonLoader } from "react-spinners";
import { CircleAlert } from "lucide-react";
import { useDropzone } from "react-dropzone";

const ProductEditPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateType, setUpdateType] = useState("");
  const [updateImageUrl, setUpdateImageUrl] = useState("");
  const [updateStock, setUpdateStock] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [product, setProduct] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);
        setUpdateName(data.name);
        setUpdatePrice(data.price);
        setUpdateType(data.type);
        setUpdateImageUrl(data.imageUrl);
        setUpdateStock(data.stock);
        setPreview(data.imageUrl);
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };
    getProduct();
  }, [id]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setNewImage(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const editProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let imageUrl = updateImageUrl;

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
      }

      const newData = {
        name: updateName,
        price: updatePrice,
        type: updateType,
        imageUrl,
        stock: updateStock,
      };

      const { data, error } = await supabase
        .from("products")
        .update(newData)
        .eq("id", id)
        .select(); // Ensure we get the updated data

      if (error) throw error;

      // If data is empty, it means the update was not allowed
      if (!data || data.length === 0) {
        setError("You are not allowed to update this product.");
        return;
      }

      router.push("/dashboard/products");
    } catch (error: any) {
      console.error("Error updating product: ", error);
      alert(error.message || "An error occurred while updating the product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center h-full justify-center">
      <div className="absolute inset-0 opacity-20 -z-10">
        <div className="relative h-full w-full bg-red [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <div></div>
        </div>
      </div>
      <div className="h-fit w-96 mx-auto border border-border-light dark:border-border-dark shadow-lg rounded-lg">
        {isLoading ? (
          <MoonLoader size={40} />
        ) : (
          <form
            onSubmit={editProduct}
            className="p-4 rounded-md bg-card-light dark:bg-card-dark"
          >
            <h1 className="text-2xl font-bold my-2">Edit Product</h1>
            <div>
              <label htmlFor="name" className="text-sm">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-2 bg-foreground-dark dark:bg-foreground-light text-primary-light dark:text-primary-dark"
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
                value={updatePrice}
                onChange={(e) => setUpdatePrice(e.target.value)}
                className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-2 bg-foreground-dark dark:bg-foreground-light text-primary-light dark:text-primary-dark"
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
                value={updateType}
                onChange={(e) => setUpdateType(e.target.value)}
                className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-2 bg-foreground-dark dark:bg-foreground-light text-primary-light dark:text-primary-dark"
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
                value={updateStock}
                onChange={(e) => setUpdateStock(e.target.value)}
                placeholder="Stock"
                className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-2 bg-foreground-dark dark:bg-foreground-light text-primary-light dark:text-primary-dark"
              />
            </div>
            {error && (
              <div className="flex items-center space-x-1 text-red-500 text-sm bg-red-200 border border-red-400 rounded-lg p-3 text-center my-2">
                <CircleAlert size={16} />
                <p>{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="bg-primary-light dark:bg-primary-dark text-white p-2 rounded-lg w-full hover:bg-primary-light/70 dark:hover:bg-primary-dark/70 transition-colors duration-200 ease-out my-1"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/products")}
              className="border dark:border-border-light border-border-dark p-2 rounded-lg w-full hover:bg-secondary-light/10 transition-colors duration-200 ease-out my-1"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ProductEditPage;
