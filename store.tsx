import { create } from "zustand";
import supabase from "@/supabase";
import { Order, Product } from "@/lib/types";
interface OrderStore {
  orders: Order[];
  getOrders: () => Promise<void>;
}
interface ProductsStore {
  products: Product[];
  getProducts: () => Promise<void>;
}
export const useGetOrders = create<OrderStore>((set) => ({
  orders: [],
  getOrders: async () => {
    const { data, error } = await supabase.from("orders").select("*");
    if (error) console.error("Error fetching orders : ", error);
    set({ orders: data || [] });
  },
}));

export const useGetProducts = create<ProductsStore>((set) => ({
  products: [],
  getProducts: async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products: ", error);
      return;
    }
    set({ products: data || [] });
  },
}));
export const getProductData = create<any>((set) => ({
  currentProductId: undefined,
  updateName: "",
  updatePrice: 0,
  updateType: "",
  updateImageUrl: "",
  updateStock: 0,
  setUpdateName: (name: string) => set({ updateName: name }),
  setUpdatePrice: (price: number) => set({ updatePrice: price }),
  setUpdateType: (type: string) => set({ updateType: type }),
  setUpdateImageUrl: (imageUrl: string) => set({ updateImageUrl: imageUrl }),
  setUpdateStock: (stock: number) => set({ updateStock: stock }),
  getProductInfo: async (product: any) => {
    set({ currentProductId: product.id });
    set({ updateName: product.name });
    set({ updatePrice: product.price });
    set({ updateType: product.type });
    set({ updateImageUrl: product.imageUrl });
    set({ updateStock: product.stock });
  },
}));
