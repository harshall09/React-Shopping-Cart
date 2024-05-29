import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import cartReducer from './reducers/cartSlice';
import wishlistReducer from './reducers/wishlistSlice'; 

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
