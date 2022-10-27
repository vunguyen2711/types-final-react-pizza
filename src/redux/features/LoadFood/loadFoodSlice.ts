import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import type { FetchData } from "../../../interfaces/interface";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { SliderValue } from "../../../interfaces/interface";
import { useState } from "react";
import { URL_DATA } from "../../../constants/urlData";
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
  id?: string;
  category?: CheckboxValueType[] | null | undefined | string;
  limit: number;
  keySearch?: string | null;
  rangePrice?: number | [] | null;
  sortBy?: string | null;
}
let total = 0;
const FOODS_URL = "http://localhost:8800/products";

export const fetchSearchFoods = createAsyncThunk(
  "fetchSearchFoods",
  async ({
    id,
    category,
    limit,
    keySearch,
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
          ...(keySearch && {
            q: keySearch,
          }),
          ...(rangePrice && {
            price_gte: rangePrice,
            price_lte: rangePrice,
          }),
          ...(sortBy !== "auto" && {
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
    });
    builder.addCase(fetchSearchFoods.fulfilled, (state, action) => {
      state.status = "success";
      state.foods = action.payload;
      state.total = total;
    });
    builder.addCase(fetchSearchFoods.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});
export default fetchFoodsSlice.reducer;
export const getFetchedFoods = (state: RootState) => state.loadFoods;
