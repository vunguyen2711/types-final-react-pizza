import { Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import {
  AllFoods,
  FoodDetail,
  Home,
  Cart,
  Checkout,
  Contact,
  Login,
  Register,
  SearchFoods,
  UserDelivery,
  UserDeliveryDetail,
} from "../pages";
import { RoutesPath } from "../constants/routes.path";
const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path={RoutesPath.HOME} element={<Home />} />
        <Route path={RoutesPath.AllFOODS} element={<AllFoods />} />
        <Route path={RoutesPath.SEARCHFOODS} element={<SearchFoods />} />
        <Route path={`${RoutesPath.FOODDETAIL}/:id`} element={<FoodDetail />} />
        <Route path={RoutesPath.CART} element={<Cart />} />
        <Route path={RoutesPath.CHECKOUT} element={<Checkout />} />
        <Route path={RoutesPath.CONTACT} element={<Contact />} />
        <Route path={RoutesPath.LOGIN} element={<Login />} />
        <Route path={RoutesPath.REGISTER} element={<Register />} />
        <Route path={RoutesPath.USERDELIVERY} element={<UserDelivery />} />
        <Route
          path={`${RoutesPath.USERDELIVERYDETAIL}/:id`}
          element={<UserDeliveryDetail />}
        />
      </Routes>
    </div>
  );
};

export default Routers;
