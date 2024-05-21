import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../types";
import { RootState } from "../store";

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: loadWishlistState(),
};

// Load wishlist state from local storage
function loadWishlistState(): Product[] {
  try {
    const serializedState = localStorage.getItem("wishlist");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading wishlist state from local storage:", error);
    return [];
  }
}

// Save wishlist state to local storage
function saveWishlistState(state: Product[]) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("wishlist", serializedState);
  } catch (error) {
    console.error("Error saving wishlist state to local storage:", error);
  }
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      saveWishlistState(state.items); // Saved updated wishlist state to local storage
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        saveWishlistState(state.items); // Save updated wishlist state to local storage
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const selectWishlist = (state: RootState) => state.wishlist.items;
export default wishlistSlice.reducer;
