import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import counterReducer from "./reducers/index";
import wishlistReducer from "./reducers/wishlistSlice";
import { Product } from "../types";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const rootReducer = combineReducers({
  cart: cartReducer,
  counter: counterReducer,
  wishlist: wishlistReducer,
});

const loadCartState = (): Partial<{ cart: CartState }> | undefined => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return { cart: { items: JSON.parse(serializedState) } };
  } catch (error) {
    console.error("Error loading cart state from local storage:", error);
    return undefined;
  }
};

const saveCartState = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state.items);
    localStorage.setItem("cart", serializedState);
  } catch (error) {
    console.error("Error saving cart state to local storage:", error);
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadCartState(),
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
