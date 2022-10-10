import { configureStore } from "@reduxjs/toolkit";
import comboSlice from "./features/productSlice/comboSlice";

export const store = configureStore({
  reducer: {
    products: comboSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
