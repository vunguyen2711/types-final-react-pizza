import { Routes, Route } from "react-router-dom";

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
} from "../pages";
import { RoutesPath } from "../constants/routes.path";
const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path={RoutesPath.HOME} element={<Home />} />
        <Route path={RoutesPath.AllFOODS} element={<AllFoods />} />
        <Route path={RoutesPath.FOODDETAIL} element={<FoodDetail />} />
        <Route path={RoutesPath.CART} element={<Cart />} />
        <Route path={RoutesPath.CHECKOUT} element={<Checkout />} />
        <Route path={RoutesPath.CONTACT} element={<Contact />} />
        <Route path={RoutesPath.LOGIN} element={<Login />} />
        <Route path={RoutesPath.REGISTER} element={<Register />} />
      </Routes>
    </div>
  );
};

export default Routers;
