import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import type { FetchData } from "../../../interfaces/interface";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { SliderValue } from "../../../interfaces/interface";
import { useState } from "react";
interface FetchFoodsPayload {
  category: string;
  id: number;
  img: string;
  price: number;
  title: string;
  type?: string;
}
export interface FetchFoodsState {
  foods: FetchData[];
  status: "idle" | "loading" | "success" | "failed";
  total: number;
}
export interface ParamsFetchFoods {
  category?: CheckboxValueType[] | null;
  limit: number;
  keysearch?: string | null;
  rangePrice?: SliderValue | null;
  sortBy?: "asc" | "desc" | string;
}
let total = 0;
const FOODS_URL = "http://localhost:8800/products";
export const fetchSearchFoods = createAsyncThunk(
  "fetchSearchFoods",
  async ({
    category,
    limit,
    keysearch,
    rangePrice,
    sortBy,
  }: ParamsFetchFoods) => {
    try {
      const res = await axios.get(FOODS_URL, {
        params: {
          ...(category && {
            category: category,
          }),
          ...(limit && { _limit: limit }),
          ...(keysearch && {
            q: keysearch,
          }),
          ...(rangePrice && {
            price_gte: rangePrice,
            price_lte: rangePrice,
          }),
          ...(sortBy && {
            _sort: "price",
            _order: sortBy,
          }),
        },
      });
      total = Number(res.headers["x-total-count"]);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  foods: [],
  status: "idle",
  total: 0,
} as FetchFoodsState;
const fetchFoodsSlice = createSlice({
  name: "fetchFoodsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchFoods.pending, (state, action) => {
      state.status = "loading";
      console.log(action);
    });
    builder.addCase(fetchSearchFoods.fulfilled, (state, action) => {
      state.status = "success";
      state.foods = action.payload;
      state.total = total;
      console.log(action);
    });
    builder.addCase(fetchSearchFoods.rejected, (state, action) => {
      state.status = "failed";
      console.log(action);
    });
  },
});
export default fetchFoodsSlice.reducer;
export const getFetchedFoods = (state: RootState) => state.loadFoods;
