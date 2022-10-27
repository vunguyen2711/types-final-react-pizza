import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { URL_DATA } from "../../../constants/urlData";
import { Root } from "react-dom/client";
// interface
interface idAccessToken {
  id: string;
}
interface AuthenicationState {
  error: string | undefined;
  status: "idle" | "loading" | "success" | "failed";
}
interface PayloadLoginThunk {
  email: string;
  password: string;
}
interface PayloadRegisterThunk {
  fullname: string;
  email: string;
  password: string;
  phone: string;
}
interface userData {
  fullname: string;
  email: string;
  password: string;
  phone: number;
  isLogin: boolean | null;
}
interface LoginRegisterState {
  userData: userData;
  loginState: AuthenicationState;
  registerState: AuthenicationState;
}
//CreateAsycnThunk
export const registerThunk = createAsyncThunk(
  "register",
  async (data: PayloadRegisterThunk, thunkAPI) => {
    try {
      const response = await axios.post(URL_DATA.USERS_REGISTER, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const loginThunk = createAsyncThunk(
  "login",
  async (data: PayloadLoginThunk, thunkAPI) => {
    try {
      const response = await axios.post(URL_DATA.USERS_LOGIN, data);
      console.log(response.data);
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);
export const loginTokenThunk = createAsyncThunk(
  "loginToken",
  async (id: any, thunkAPI) => {
    try {
      const response = await axios.get(URL_DATA.USERS, id);
      console.log(response.data);
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);
const initialState = {
  userData: {},
  loginState: {
    error: "",
    status: "idle",
  },
  registerState: {
    error: "",
    status: "idle",
  },
} as LoginRegisterState;

const loginRegisterSlice = createSlice({
  name: "loginRegisterSlice",
  initialState,
  reducers: {
    logout: (state, action: PayloadAction) => {
      state.userData.isLogin = false;
    },
    resetStatus: (state, action: PayloadAction) => {
      state.registerState.status = "idle";
      state.loginState.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state, action) => {
      state.registerState.error = "";
      state.registerState.status = "loading";
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.registerState.status = "success";
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.registerState.status = "failed";
      state.registerState.error = action.error.message;
    });
    builder.addCase(loginThunk.pending, (state, action) => {
      state.loginState.error = "";
      state.userData.isLogin = null;
      state.loginState.status = "loading";
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loginState.status = "success";
      state.userData = { ...action.payload.user, isLogin: true };
      localStorage.setItem("accessToken", action.payload.accessToken);
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loginState.status = "failed";
      state.userData.isLogin = false;
      state.loginState.error = action.error.message;
    });
    builder.addCase(loginTokenThunk.pending, (state, action) => {
      state.loginState.status = "loading";
      state.userData.isLogin = false;
    });
    builder.addCase(loginTokenThunk.fulfilled, (state, action) => {
      state.loginState.status = "success";

      state.userData = { ...action.payload[0], isLogin: true };
    });
    builder.addCase(loginTokenThunk.rejected, (state, action) => {
      state.loginState.status = "failed";
      state.userData.isLogin = false;
    });
  },
});

export default loginRegisterSlice.reducer;
export const { resetStatus, logout } = loginRegisterSlice.actions;
export const getRegisterState = (state: RootState) =>
  state.loginRegister.registerState;
export const getLoginState = (state: RootState) =>
  state.loginRegister.loginState;
export const getUserInfo = (state: RootState) => state.loginRegister.userData;
