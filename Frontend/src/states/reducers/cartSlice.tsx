import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const { id } = action.payload;
      const existingProduct = state.items.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product && product.quantity !== undefined) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product && product.quantity !== undefined && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
