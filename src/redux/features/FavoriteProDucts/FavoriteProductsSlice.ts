import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { URL_DATA } from "../../../constants/urlData";
import type { RootState } from "../../store";
import { useAppDispatch } from "../../hook";
import axios from "axios";
import type {
  CreateInitialFavoriteParams,
  FavoriteState,
  ChangeFavoritePrams,
  ToggleFavoritePayLoadAction,
  GetFavoriteProductsParams,
} from "../../../interfaces/interface";

export const getFavoriteByUserId = createAsyncThunk(
  "getFavoriteByUserId",
  async (id: number | string) => {
    try {
      const res = await axios.get(`${URL_DATA.FAVORITES}/${id}`);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const createInitialFavoriteForUser = createAsyncThunk(
  "createInitialFavoriteForUser",
  async (data: CreateInitialFavoriteParams) => {
    try {
      const res = await axios.post(URL_DATA.FAVORITES, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const changeFavoriteById = createAsyncThunk(
  "changeFavoriteById",
  async (data: CreateInitialFavoriteParams) => {
    try {
      const res = await axios.put(`${URL_DATA.FAVORITES}/${data.id}`, {
        favoriteIds: [...data.favoriteIds],
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getFavoriteProducts = createAsyncThunk(
  "getFavoriteProducts",
  async (idArr: GetFavoriteProductsParams) => {
    try {
      const res = await axios.get(`${URL_DATA.PRODUCTS}`, {
        params: {
          id: idArr,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  getByIdState: {
    status: "idle",
    favoriteData: {},
  },
  createInitialForUser: {
    status: "idle",
  },
  changeFavorite: {
    status: "idle",
  },
} as FavoriteState;

const FavoriteProductSlice = createSlice({
  name: "FavoriteProductSlice",
  initialState,
  reducers: {
    logoutResetFavorite: (state, action: PayloadAction) => {
      state.getByIdState.favoriteData.favoriteIds = [];
      state.getByIdState.favoriteData.favoriteProducts = [];
    },
    toggleFavoriteId: (
      state,
      action: PayloadAction<ToggleFavoritePayLoadAction>
    ) => {
      const existedId = state.getByIdState.favoriteData.favoriteIds.find(
        (item) => item === action.payload
      );
      if (existedId) {
        state.getByIdState.favoriteData.favoriteIds =
          state.getByIdState.favoriteData.favoriteIds.filter(
            (item) => item !== existedId
          );
      } else {
        state.getByIdState.favoriteData.favoriteIds = [
          ...state.getByIdState.favoriteData.favoriteIds,
          action.payload,
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteByUserId.pending, (state, action) => {
      state.getByIdState.status = "loading";
    });
    builder.addCase(getFavoriteByUserId.fulfilled, (state, action) => {
      state.getByIdState.status = "success";
      state.getByIdState.favoriteData = { ...action.payload };
    });
    builder.addCase(getFavoriteByUserId.rejected, (state, action) => {
      state.getByIdState.status = "failed";
    });
    builder.addCase(createInitialFavoriteForUser.pending, (state, action) => {
      state.createInitialForUser.status = "loading";
    });
    builder.addCase(createInitialFavoriteForUser.fulfilled, (state, action) => {
      state.createInitialForUser.status = "success";
      state.getByIdState.favoriteData = { ...action.payload };
    });
    builder.addCase(createInitialFavoriteForUser.rejected, (state, action) => {
      state.createInitialForUser.status = "failed";
    });
    builder.addCase(changeFavoriteById.pending, (state, action) => {
      state.changeFavorite.status = "loading";
    });
    builder.addCase(changeFavoriteById.fulfilled, (state, action) => {
      state.changeFavorite.status = "success";
    });
    builder.addCase(changeFavoriteById.rejected, (state, action) => {
      state.changeFavorite.status = "failed";
    });
    builder.addCase(getFavoriteProducts.pending, (state, action) => {
      state.getByIdState.status = "loading";
    });
    builder.addCase(getFavoriteProducts.fulfilled, (state, action) => {
      state.getByIdState.status = "success";

      state.getByIdState.favoriteData.favoriteProducts = [...action.payload];
    });
    builder.addCase(getFavoriteProducts.rejected, (state, action) => {
      state.getByIdState.status = "failed";
    });
  },
});

export default FavoriteProductSlice.reducer;
export const getFavoriteState = (state: RootState) => state.favorite;
export const { toggleFavoriteId, logoutResetFavorite } =
  FavoriteProductSlice.actions;
