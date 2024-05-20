import { createSlice, createAsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "../../types";

interface AddToCartPayload {
  userId: string;
  productId: string;
}

// Define the return type of the async thunk actions
type ThunkApiConfig = {
  rejectValue: string;
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId }: AddToCartPayload) => {
    try {
      await axios.post(`http://localhost:3000/cart/addToCart`, {
        userId,
        productId,
      });
      return { userId, productId };
    } catch (error:any) {
      throw error.response.data;
    }
  }
) as unknown as AsyncThunkAction<{ userId: string; productId: string; }, AddToCartPayload, {}>;

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/cart/userCart/${userId}`);
      return response.data;
    } catch (error:any) {
      throw error.response.data;
    }
  }
) as unknown as AsyncThunkAction<any, string, {}>;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as CartItem[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
