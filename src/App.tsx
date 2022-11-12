import React, { useEffect, useState } from "react";
import { getUserInfo } from "./redux/features/Login&Register/login&registerSlice";
import "./App.less";
import Layouts from "./layouts/Layouts";
import jwt_decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import {
  loginTokenThunk,
  resetStatus,
} from "./redux/features/Login&Register/login&registerSlice";
import { setInitialCartState } from "./redux/features/Cart/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutesPath } from "./constants/routes.path";
import axios from "axios";
export interface UserDataToken {
  email: string;
  exp: number;
  iat: number;
  sub: string;
}
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogin } = useAppSelector(getUserInfo);
  const { pathname } = useLocation();
  const [localStoragePathName, setLocalStoragePathName] = useState<string[]>(
    []
  );
  useEffect(() => {
    const fetchApi = async (param: string[] | number[]) => {
      try {
        const res = await axios.get("http://localhost:8800/products", {
          params: {
            ...(param && {
              id: param,
            }),
          },
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi([1, 2, 3, 4, 5, 6, 7]);
  }, []);
  localStorage.setItem(
    "path",
    JSON.stringify(
      localStoragePathName.filter(
        (pathname) =>
          pathname !== RoutesPath.REGISTER && pathname !== RoutesPath.LOGIN
      )
    )
  );
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
  useEffect(() => {
    window.scrollTo(0, 0);
    setLocalStoragePathName((prev) => {
      return [...prev, pathname];
    });
  }, [pathname]);

  return (
    <div className="App">
      <Layouts />
    </div>
  );
};

export default App;
