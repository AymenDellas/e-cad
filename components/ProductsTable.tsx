"use client";
import React from "react";

import { useState } from "react";
import { Pencil, Trash2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import supabase from "@/supabase";
import Link from "next/link";

const ProductsTable = ({ filteredProducts }: { filteredProducts: any }) => {
  const router = useRouter();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [currentProductName, setCurrentProductName] = useState("");

  // Delete product
  const deleteProduct = async () => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", currentProductId);
    if (error) console.error("Error deleting product : ", error);
    setDeleteConfirmation(false);
    router.refresh(); // Refresh the page after deletion
  };

  return (
    <section
      className="w-full border border-black/20 p-4 shadow-xl rounded-lg bg-card-light dark:bg-card-dark"
      suppressHydrationWarning
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border-light dark:border-border-dark">
          <thead>
            <tr className="bg-card-light dark:bg-card-dark">
              <th className="border border-border-light dark:border-border-dark p-5 text-left">
                Image
              </th>
              <th className="border border-border-light dark:border-border-dark p-5 text-left">
                Name
              </th>
              <th className="border border-border-light dark:border-border-dark p-5 text-left">
                Price
              </th>
              <th className="border border-border-light dark:border-border-dark p-5 text-left">
                Stock
              </th>
              <th className="border border-border-light dark:border-border-dark p-5 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product: any) => {
              return (
                <tr key={product.id}>
                  <td className="border border-border-light dark:border-border-dark w-32 p-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full object-cover rounded-md"
                    />
                  </td>
                  <td className="border border-border-light dark:border-border-dark p-3 text-left">
                    {product.name}
                  </td>
                  <td className="border border-border-light dark:border-border-dark p-3 text-left">
                    {product.price}
                  </td>
                  <td className="border border-border-light dark:border-border-dark p-3 text-left">
                    {product.stock}
                  </td>
                  <td className="border border-border-light dark:border-border-dark p-3 text-left">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => router.push(`edit/${product.id}`)}
                        className="flex items-center justify-center gap-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 shadow-sm"
                        title="Edit product"
                      >
                        <Pencil size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentProductId(product.id);
                          setCurrentProductName(product.name);
                          setDeleteConfirmation(true);
                        }}
                        className="flex items-center justify-center gap-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200 shadow-sm"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Enhanced Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-md w-full animate-fade-in">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                  <AlertCircle
                    className="text-red-500 dark:text-red-400"
                    size={24}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Confirm Deletion
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete "
                <span className="font-medium">{currentProductName}</span>"? This
                action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirmation(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteProduct}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsTable;
