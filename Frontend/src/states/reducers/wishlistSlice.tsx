import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../types";
import { RootState } from "../store";
import axios from "../../axiosConfig";

interface WishlistState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  status: "idle",
  error: null,
};

// Adjust the full URL path for wishlist endpoints
export const fetchWishlistItems = createAsyncThunk<Product[], void>(
  "wishlist/fetchWishlistItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/wishlist");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addProductToWishlist = createAsyncThunk<Product, string>(
  "wishlist/addProductToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/wishlist", { productId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeProductFromWishlist = createAsyncThunk<string, string>(
  "wishlist/removeProductFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/wishlist/${productId}`);
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWishlistItems.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(addProductToWishlist.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeProductFromWishlist.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectWishlist = (state: RootState) => state.wishlist.items;
export const selectWishlistStatus = (state: RootState) => state.wishlist.status;
export const selectWishlistError = (state: RootState) => state.wishlist.error;
export default wishlistSlice.reducer;
