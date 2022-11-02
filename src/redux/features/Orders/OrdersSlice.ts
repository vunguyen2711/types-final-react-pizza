import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import type {
  FetchData,
  PostDataOrder,
  OrderState,
  GetDataOrder,
} from "../../../interfaces/interface";
import { URL_DATA } from "../../../constants/urlData";
import type {
  getDetailThunkOrder,
  deleteThunkOrder,
} from "../../../interfaces/interface";
export const sendOrderThunk = createAsyncThunk(
  "sendOrderThunk",
  async (data: PostDataOrder, thunkApi) => {
    try {
      const respone = await axios.post(URL_DATA.ORDERS, data);
      return respone.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
export const getOrderThunk = createAsyncThunk(
  "getOrderThunk",
  async (userId: GetDataOrder, thunkApi) => {
    try {
      const respone = await axios.get(URL_DATA.ORDERS, {
        params: {
          userId: userId,
        },
      });
      return respone.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
export const getDetailThunk = createAsyncThunk(
  "getDetailThunk",
  async (id: getDetailThunkOrder, thunkApi) => {
    try {
      const respone = await axios.get(`${URL_DATA.ORDERS}/${id}`);
      return respone.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteOrderThunk = createAsyncThunk(
  "deleteOrderThunk",
  async (id: deleteThunkOrder, thunkApi) => {
    try {
      const respone = await axios.delete(`${URL_DATA.ORDERS}/${id}`);
      console.log(respone);
      return respone.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
const initialState = {
  ordersByUser: [],
  status: "idle",
  statusDelete: "idle",
} as OrderState;
export const OrdersSlice = createSlice({
  name: "OrdersSlice",
  initialState,
  reducers: {
    removeOrderById: (state, action: PayloadAction<number>) => {
      state.ordersByUser = state.ordersByUser.filter(
        (item) => item.id !== action.payload
      );
    },
    removeOrderState: (state, action: PayloadAction) => {
      state.ordersByUser = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrderThunk.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(sendOrderThunk.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(sendOrderThunk.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(getOrderThunk.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getOrderThunk.fulfilled, (state, action) => {
      state.status = "success";
      state.ordersByUser = [...action.payload];
    });
    builder.addCase(getOrderThunk.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(getDetailThunk.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getDetailThunk.fulfilled, (state, action) => {
      state.status = "success";
      state.ordersByDetail = Object.assign({}, action.payload);
    });
    builder.addCase(getDetailThunk.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(deleteOrderThunk.pending, (state, action) => {
      state.statusDelete = "loading";
    });
    builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
      state.statusDelete = "success";
    });
    builder.addCase(deleteOrderThunk.rejected, (state, action) => {
      state.statusDelete = "failed";
    });
  },
});

export default OrdersSlice.reducer;
export const { removeOrderState, removeOrderById } = OrdersSlice.actions;
export const getOrder = (state: RootState) => state.order;
export const getDetailOrder = (state: RootState) => state.order.ordersByDetail;
