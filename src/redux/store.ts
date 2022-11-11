import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/Cart/cartSlice";
import loadFoodsReducer from "./features/LoadFood/loadFoodSlice";
import loginRegisterReducer from "./features/Login&Register/login&registerSlice";
import OrdersReducer from "./features/Orders/OrdersSlice";
import CommentReducer from "./features/Comment/CommentSlice";
import ContactReducer from "./features/ContactSlice/ContactSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    loadFoods: loadFoodsReducer,
    loginRegister: loginRegisterReducer,
    order: OrdersReducer,
    comment: CommentReducer,
    contact: ContactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
