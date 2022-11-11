import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type {
  ContactThunkParams,
  ContactState,
} from "../../../interfaces/interface";
import axios from "axios";
import { URL_DATA } from "../../../constants/urlData";
export const postContactThunk = createAsyncThunk(
  "postContactThunk",
  async (data: ContactThunkParams) => {
    try {
      const res = await axios.post(URL_DATA.CONTACTS, data);
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  status: "idle",
} as ContactState;

const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {
    resetStatus: (state, action: PayloadAction) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postContactThunk.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postContactThunk.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(postContactThunk.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default contactSlice.reducer;
export const getStatusContact = (state: RootState) => state.contact.status;
export const { resetStatus } = contactSlice.actions;
