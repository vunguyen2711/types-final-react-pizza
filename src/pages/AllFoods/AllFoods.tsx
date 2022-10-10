import React, { useEffect } from "react";
import CommonSection from "../../components/CommonSection/CommonSection";
import Helmet from "../../layouts/Helmet/Helmet";
import { Row, Col, Space } from "antd";
import * as S from "./style";
import Slider from "react-slick";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  getAllCombo,
  getCombos,
} from "../../redux/features/productSlice/comboSlice";
import { ItemProduct } from "../../interfaces/interface";
var settings = {
  dots: false,
  infinite: true,
  speed: 3000,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  autoplay: true,
  className: "allfood__slider",
  autoplaySpeed: 2,

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const AllFoods: React.FC = () => {
  const dispatch = useAppDispatch();
  const combos = useAppSelector(getAllCombo);
  console.log(combos);
  useEffect(() => {
    dispatch(getCombos({ id: 1 }));
  }, []);
  return (
    <>
      <Helmet title="All Foods" />
      <CommonSection title="All Foods" />
      <S.AllFoodContainer>
        <Row gutter={20}>
          <Col span={24} className="allfood__combo">
            <h2 className="allfood__combo--title">Promotion, Combo</h2>
            <Slider {...settings}>
              {combos.map((item, index) => (
                <div key={index}>
                  <ProductCard item={item}></ProductCard>
                </div>
              ))}
            </Slider>
          </Col>
          {/* <Col span={8}>
            <div className="allfood__filter">filter</div>
          </Col>
          <Col span={16}>
            <div className="allfood__products"></div>
          </Col> */}
        </Row>
      </S.AllFoodContainer>
    </>
  );
};

export default AllFoods;
