import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface PayloadComboType {
  id: number;
  title: string;
  price: number;
  img: string;
  category: string;
}

const COMBO_URL = " http://localhost:9000/combos";
export const getCombos = createAsyncThunk<any>("getCombos", async ({ id }) => {
  try {
    const response = await axios.get(`${COMBO_URL}?id=${id}`);
    return response.data;
  } catch (error) {}
});
interface UsersState {
  entities: object[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}
const initialState = {
  entities: [],
  loading: "idle",
} as UsersState;

const comboSlice = createSlice({
  name: "comboSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCombos.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getCombos.fulfilled, (state, action) => {
      state.entities = [...state.entities, action.payload];
      state.loading = "succeeded";
    });
    builder.addCase(getCombos.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export default comboSlice.reducer;
export const getAllCombo = (state: RootState) => state.products.entities;
