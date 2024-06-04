export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  categoryName: string;
  message:string;
}

export interface User {
  user: string;
  username: string;
  email: string;
} 

export interface AddToCartPayload {
  productId: string;
  userId: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

export interface Cart {
  user: string;
  items: CartItem[];
}
