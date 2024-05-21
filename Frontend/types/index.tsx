// src/types.ts
export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  productId: string; // assuming this is the ID, modify if it's different
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

export interface User {
  _id: string;
  username: string;
  email: string;
}
