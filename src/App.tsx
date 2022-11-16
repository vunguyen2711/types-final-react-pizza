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
import {
  createInitialFavoriteForUser,
  getFavoriteByUserId,
  getFavoriteProducts,
  getFavoriteState,
} from "./redux/features/FavoriteProDucts/FavoriteProductsSlice";

export interface UserDataToken {
  email: string;
  exp: number;
  iat: number;
  sub: string;
}
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const statusOfGetFavoriteById =
    useAppSelector(getFavoriteState).getByIdState.status;
  const favoritesIds =
    useAppSelector(getFavoriteState).getByIdState.favoriteData.favoriteIds;
  const { pathname } = useLocation();
  const [localStoragePathName, setLocalStoragePathName] = useState<string[]>(
    []
  );

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
    if (favoritesIds?.length !== 0) {
      dispatch(getFavoriteProducts(favoritesIds));
    }
  }, [favoritesIds]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const userData: UserDataToken = jwt_decode(accessToken);

      dispatch(loginTokenThunk(userData.sub));
      if (statusOfGetFavoriteById !== "failed") {
        dispatch(getFavoriteByUserId(userData.sub));
      }
      if (statusOfGetFavoriteById === "failed") {
        dispatch(
          createInitialFavoriteForUser({
            id: Number(userData.sub),
            favoriteIds: [],
          })
        );
      }
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
