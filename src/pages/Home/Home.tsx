import React from "react";
import FeatureSections from "../../components/FeaturesSection/FeatureSections";
import HeroSection from "../../components/HeroSection/HeroSection";
import Testimonial from "../../components/Testimonial/Testimonial";
import WhySection from "../../components/WhySection/WhySection";
import Helmet from "../../layouts/Helmet/Helmet";
import * as S from "./style";
const Home = () => {
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
