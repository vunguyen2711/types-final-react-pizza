import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/Cart/cartSlice";
import loadFoodsReducer from "./features/LoadFood/loadFoodSlice";
import loginRegisterReducer from "./features/Login&Register/login&registerSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    loadFoods: loadFoodsReducer,
    loginRegister: loginRegisterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
