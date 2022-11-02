import React, { useEffect } from "react";
import FeatureSections from "../../components/FeaturesSection/FeatureSections";
import HeroSection from "../../components/HeroSection/HeroSection";
import Testimonial from "../../components/Testimonial/Testimonial";
import WhySection from "../../components/WhySection/WhySection";
import Helmet from "../../layouts/Helmet/Helmet";
import * as S from "./style";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  getOrder,
  removeOrderState,
} from "../../redux/features/Orders/OrdersSlice";
import { removeAllCartItems } from "../../redux/features/Cart/cartSlice";
const Home = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(getOrder);
  useEffect(() => {
    if (status === "success") {
      dispatch(removeOrderState());
      dispatch(removeAllCartItems());
      localStorage.removeItem("cartState");
    }
  }, [status]);
  return (
    <>
      <Helmet title="Home" />
      <S.HomeContainer>
        <HeroSection />
        <FeatureSections />
        <WhySection />
        <Testimonial />
      </S.HomeContainer>
    </>
  );
};

export default Home;
