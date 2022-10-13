import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { notification } from "antd";
export interface CartPayload {
  title: string;
  price: number;
  totalPrice: number;
  amount: number;
  img: string;
  category: string;
  id: number;
}
export interface ChangeAmountCartPayLoad {
  id: number;
}
interface CartState {
  cartItems: CartPayload[];
  totalAmount: number;
}
interface DeleteItem {
  id: number;
}
interface ChangeAmountByInput {
  id: number;
  amount: number;
}
type NotificationType = "success" | "info" | "warning" | "error";

const openNotificationWithIcon = (type: NotificationType) => {
  notification[type]({
    message: "Warning !!!",
    description: "Please enter amount > 1",
  });
};
const initialState = {
  cartItems: [],
  totalAmount: 0,
} as CartState;

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    deleteItem: (state, action: PayloadAction<DeleteItem>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    changeAmountByInput: (
      state,
      action: PayloadAction<ChangeAmountByInput>
    ) => {
      const indexChangedItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (action.payload.amount <= 0) {
        openNotificationWithIcon("error");
      }
      state.cartItems[indexChangedItem].amount = action.payload.amount;
      state.cartItems[indexChangedItem].totalPrice =
        state.cartItems[indexChangedItem].amount *
        state.cartItems[indexChangedItem].price;
      state.totalAmount = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.amount);
      }, 0);
    },
    increaseAmount: (state, action: PayloadAction<ChangeAmountCartPayLoad>) => {
      const indexChangedItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[indexChangedItem].amount += 1;
      state.cartItems[indexChangedItem].totalPrice =
        state.cartItems[indexChangedItem].amount *
        state.cartItems[indexChangedItem].price;
      state.totalAmount = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.amount);
      }, 0);
    },
    descreaseAmount: (
      state,
      action: PayloadAction<ChangeAmountCartPayLoad>
    ) => {
      const indexChangedItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[indexChangedItem].amount > 1) {
        state.cartItems[indexChangedItem].amount -= 1;
        state.cartItems[indexChangedItem].totalPrice =
          state.cartItems[indexChangedItem].amount *
          state.cartItems[indexChangedItem].price;
      } else if (state.cartItems[indexChangedItem].amount === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
      }

      state.totalAmount = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.amount);
      }, 0);
    },
    addItems: (state, action: PayloadAction<CartPayload>) => {
      const existedItems = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!existedItems) {
        state.cartItems = [...state.cartItems, action.payload];
        console.log("hong co");
      }
      if (existedItems) {
        const indexExistedItem = state.cartItems.indexOf(existedItems);
        console.log(indexExistedItem);
        state.cartItems.splice(indexExistedItem, 1, action.payload);
        console.log("co");
      }
      state.totalAmount = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.amount);
      }, 0);
    },
  },
});

export default cartSlice.reducer;
export const getCartItems = (state: RootState) => state.cart;
export const {
  addItems,
  increaseAmount,
  descreaseAmount,
  changeAmountByInput,
  deleteItem,
} = cartSlice.actions;
