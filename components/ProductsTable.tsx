import React from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Product } from "@/lib/types";
const ProductsTable = ({ filteredProducts }: { filteredProducts: any }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [updateName, setUpdateName] = useState<string>("");
  const [updatePrice, setUpdatePrice] = useState<number>(0);
  const [updateType, setUpdateType] = useState<string>("");
  const [updateImageUrl, setUpdateImageUrl] = useState("");
  const [updateStock, setUpdateStock] = useState(0);
  const [currentProductId, setCurrentProductId] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  // Read products from Firestore

  // Update product
  const editProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "products", currentProductId), {
        name: updateName,
        price: updatePrice,
        type: updateType,
        imageUrl: updateImageUrl,
        stock: updateStock,
      });
      setDisplayForm(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  // Delete product
  const deleteProduct = async () => {
    const productRef = doc(db, "products", currentProductId);
    try {
      await deleteDoc(productRef);
      setDeleteConfirmation(false);
    } catch (error) {
      console.log("Error deleting document: ", error);
    }
  };
  return (
    <section className="w-full border border-black/20 p-4 shadow-xl rounded-lg text-primary">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-black/5 ">
              <th className="border p-5 text-left">Image</th>
              <th className="border p-5 text-left">Name</th>
              <th className="border p-5 text-left">Price</th>
              <th className="border p-5 text-left">Stock</th>
              <th className="border p-5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product: any) => {
              return (
                <tr key={product.id}>
                  <td className="border w-32 p-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full object-cover rounded-md"
                    />
                  </td>
                  <td className="border p-3 text-left">{product.name}</td>
                  <td className="border p-3 text-left">{product.price}</td>
                  <td className="border p-3 text-left">{product.stock}</td>
                  <td className="border p-3 text-left space-x-2 ">
                    <div className="flex lg:space-x-2 max-lg:space-y-2 max-lg:flex-col justify-center">
                      <button
                        onClick={() => {
                          setDisplayForm(true);
                          setCurrentProductId(product.id);
                          setUpdateName(product.name);
                          setUpdatePrice(product.price);
                          setUpdateType(product.type);
                          setUpdateImageUrl(product.imageUrl);
                          setUpdateStock(product.stock);
                        }}
                        className="py-2 px-3 bg-black text-white rounded-md outline-none text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setCurrentProductId(product.id);
                          setDeleteConfirmation(true);
                        }}
                        className="py-2 px-3 bg-black text-white rounded-md outline-none text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    {deleteConfirmation && (
                      <div className="fixed top-0 left-0 w-full h-full  flex items-center justify-center ">
                        <div className="bg-red-100 p-4 rounded-lg border  space-y-4">
                          <p>Are you sure you want to delete this product?</p>
                          <div className="flex  space-x-4">
                            <button
                              onClick={deleteProduct}
                              className="border border-black bg-[#3b4735]/10 text-[#3b4735] px-2 py-1 rounded-sm"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirmation(false)}
                              className="border bg-[#3b4735] text-white px-2 py-1 rounded-sm"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {displayForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/20 flex items-center justify-center">
          <form onSubmit={editProduct} className="bg-white p-4 rounded-md">
            <X
              onClick={() => setDisplayForm(false)}
              className="cursor-pointer"
            />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={updateName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdateName(e.target.value)
              }
              className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-4"
            />
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              value={updatePrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdatePrice(Number(e.target.value))
              }
              className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-4"
            />
            <input
              type="text"
              name="type"
              id="type"
              placeholder="Type"
              value={updateType}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdateType(e.target.value)
              }
              className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-4"
            />
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              placeholder="Image URL"
              value={updateImageUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdateImageUrl(e.target.value)
              }
              className="w-full outline-none border border-black/10 rounded-md p-2 focus:ring-2 my-4"
            />
            <input
              type="number"
              name="stock"
              id="stock"
              value={updateStock}
              placeholder="Stock"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdateStock(parseInt(e.target.value))
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
        </div>
      )}
    </section>
  );
};

export default ProductsTable;
