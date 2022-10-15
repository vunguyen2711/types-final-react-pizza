import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/Cart/cartSlice";
import loadFoodsReducer from "./features/LoadFood/loadFoodSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    loadFoods: loadFoodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
