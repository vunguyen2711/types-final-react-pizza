import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_DATA } from "../../../constants/urlData";
import type {
  CommentThunkData,
  CommentThunkState,
  GetCommentThunkParams,
} from "../../../interfaces/interface";
import { RootState } from "../../store";
export const getCommentThunk = createAsyncThunk(
  "getCommentThunk",
  async (filterParams: GetCommentThunkParams) => {
    try {
      const res = await axios.get(URL_DATA.COMMENTS, {
        params: {
          ...filterParams,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const postCommentThunk = createAsyncThunk(
  "postCommentThunk",
  async (commentData: CommentThunkData) => {
    try {
      const res = await axios.post(URL_DATA.COMMENTS, commentData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteCommentThunk = createAsyncThunk(
  "deleteCommentThunk",
  async (id: number) => {
    try {
      const res = await axios.delete(`${URL_DATA.COMMENTS}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  comments: [],
  error: "",
  status: "idle",
} as CommentThunkState;
const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    resetStatus: (state, action: PayloadAction) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postCommentThunk.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postCommentThunk.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(postCommentThunk.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(getCommentThunk.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getCommentThunk.fulfilled, (state, action) => {
      state.comments = [...action.payload];
      state.status = "success";
    });
    builder.addCase(getCommentThunk.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(deleteCommentThunk.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(deleteCommentThunk.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default commentSlice.reducer;
export const { resetStatus } = commentSlice.actions;
export const getCommentInfo = (state: RootState) => state.comment;
