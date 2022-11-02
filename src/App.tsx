import React, { useEffect } from "react";

import "./App.less";
import Layouts from "./layouts/Layouts";
import jwt_decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import {
  loginTokenThunk,
  resetStatus,
} from "./redux/features/Login&Register/login&registerSlice";
import { setInitialCartState } from "./redux/features/Cart/cartSlice";
import { getOrder } from "./redux/features/Orders/OrdersSlice";
export interface UserDataToken {
  email: string;
  exp: number;
  iat: number;
  sub: string;
}
const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const userData: UserDataToken = jwt_decode(accessToken);
      dispatch(loginTokenThunk(userData.sub));
    } else {
      dispatch(resetStatus());
    }
  }, []);
  useEffect(() => {
    const dataLocalCartItems = localStorage.getItem("cartState");
    if (dataLocalCartItems) {
      dispatch(setInitialCartState(JSON.parse(dataLocalCartItems)));
    }
  }, []);

  return (
    <div className="App">
      <Layouts />
    </div>
  );
};

export default App;
