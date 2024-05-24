import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem, AddToCartPayload, User } from "../../../types";
import { RootState } from "../store";

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

// Async thunk for adding to cart
export const addToCart = createAsyncThunk<
  CartItem,
  AddToCartPayload,
  { state: RootState }
>("cart/addToCart", async ({ productId, userId }, { getState }) => {
  const state = getState();
  const token = state.user.token;

  const response = await axios.post<CartItem>(
    "http://localhost:3000/cart/addToCart",
    { productId, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
});

// Async thunk for fetching the cart
export const fetchCart = createAsyncThunk<
  CartItem[],
  void,
  { state: RootState }
>("cart/fetchCart", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const token = state.user.token;
    let userId = state.user.user?.user;

    if (!userId) {
      // Fetch the user details to get the userId
      const userResponse = await axios.get<User>(
        "http://localhost:3000/cart/userCart/${userId}",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      userId = userResponse.data.user;
    }

    const response = await axios.get<CartItem[]>(
      `http://localhost:3000/cart/userCart/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Async thunk for removing from cart
export const removeFromCart = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("cart/removeFromCart", async (productId, { getState }) => {
  const state = getState();
  const token = state.user.token;

  await axios.post(
    `http://localhost:3000/cart/removeFromCart`,
    { productId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
});

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Ensure items is an array before performing array operations
        if (!Array.isArray(state.items)) {
          state.items = [];
        }

        const itemIndex = state.items.findIndex(
          (item) => item.productId === action.payload.productId
        );

        if (itemIndex >= 0) {
          state.items[itemIndex].quantity += 1;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add to cart";
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        //console.log(action.payload,'<<<<<<<');
        const{items} = action.payload
        state.status = "succeeded";
        state.items = items;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Ensure items is an array before performing array operations
        if (!Array.isArray(state.items)) {
          state.items = [];
        }

        state.items = state.items.filter(
          (item) => item.productId !== action.meta.arg
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to remove from cart";
      });
  },
});

export default cartSlice.reducer;
