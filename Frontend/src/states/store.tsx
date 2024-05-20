import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
