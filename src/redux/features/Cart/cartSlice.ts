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
  totalPriceItems: number;
  isOpenDrawer: boolean;
}
interface DeleteItem {
  id: number;
}
type DeleteItemsById = [];
export interface ChangeAmountByInput {
  id: number;
  amount: number;
}

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalPriceItems: 0,
  isOpenDrawer: false,
} as CartState;

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setInitialCartState: (state, action: PayloadAction<CartState>) => {
      localStorage.setItem("cartState", JSON.stringify(state));
      state.cartItems = action.payload.cartItems;
      state.totalAmount = action.payload.totalAmount;
      state.totalPriceItems = action.payload.totalPriceItems;
      state.isOpenDrawer = action.payload.isOpenDrawer;
    },
    removeAllCartItems: (state, action: PayloadAction) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalPriceItems = 0;
      state.isOpenDrawer = false;
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    toggleDrawer: (state, action: PayloadAction) => {
      state.isOpenDrawer = !state.isOpenDrawer;
    },
    deleteItemsById: (state, action: PayloadAction<DeleteItemsById>) => {
      action.payload.forEach((key) => {
        const indexExistedItem = state.cartItems.findIndex(
          (item) => item.id === key
        );
        if (indexExistedItem !== -1) {
          state.cartItems.splice(indexExistedItem, 1);
        }
      });
      state.totalAmount = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.amount);
      }, 0);
      state.totalPriceItems = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.totalPrice);
      }, 0);
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    deleteItem: (state, action: PayloadAction<DeleteItem>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.totalAmount = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.amount);
      }, 0);
      state.totalPriceItems = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.totalPrice);
      }, 0);
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    changeAmountByInput: (
      state,
      action: PayloadAction<ChangeAmountByInput>
    ) => {
      const indexChangedItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      state.cartItems[indexChangedItem].amount = action.payload.amount;
      state.cartItems[indexChangedItem].totalPrice =
        state.cartItems[indexChangedItem].amount *
        state.cartItems[indexChangedItem].price;
      state.totalAmount = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.amount);
      }, 0);
      state.totalPriceItems = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.totalPrice);
      }, 0);
      localStorage.setItem("cartState", JSON.stringify(state));
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
      state.totalPriceItems = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.totalPrice);
      }, 0);
      localStorage.setItem("cartState", JSON.stringify(state));
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
      state.totalPriceItems = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.totalPrice);
      }, 0);
      localStorage.setItem("cartState", JSON.stringify(state));
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

        state.cartItems.splice(indexExistedItem, 1, action.payload);
      }
      state.totalAmount = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.amount);
      }, 0);
      state.totalPriceItems = state.cartItems.reduce((arr, cur) => {
        return (arr += cur.totalPrice);
      }, 0);
      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});

export default cartSlice.reducer;
export const getCartItems = (state: RootState) => state.cart;
export const {
  setInitialCartState,
  toggleDrawer,
  addItems,
  increaseAmount,
  descreaseAmount,
  changeAmountByInput,
  deleteItem,
  deleteItemsById,
  removeAllCartItems,
} = cartSlice.actions;
