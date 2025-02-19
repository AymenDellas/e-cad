export interface Product {
  id: string;
  name: string;
  price: number;
  isBestSeller: boolean;
  type: string;
  imageUrl: string;
  stock: number;
  count: number;
}
export interface Order {
  cart: Product[];
  date: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: string;
  total: number;
  id: string;
  totalPrice: number;
}
