import React, { useRef } from "react";
import * as S from "./style";
import { Row, Col, Space } from "antd";
import feature__imag01 from "../../assets/images/service-01.png";
import feature__imag02 from "../../assets/images/service-02.png";
import feature__imag03 from "../../assets/images/service-03.png";
const FeaturesData = [
  {
    title: "Quick Delivery",
    imgUrl: feature__imag01,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, ullam!",
  },
  {
    title: "Super Dive In",
    imgUrl: feature__imag02,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, ullam!",
  },
  {
    title: "Easy Pick Up",
    imgUrl: feature__imag03,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, ullam!",
  },
];
const FeatureSections: React.FC = () => {
  return (
    <S.FeatureSectionsContainer>
      <Row className="features__content">
        <Col className="features__title" span={24}>
          <h5>What we serve</h5>
          <h2>Just Sit back at Home</h2>
          <h1>
            We will <span>take care</span>{" "}
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            perspiciatis ut explicabo!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            perspiciatis ut explicabo!
          </p>
        </Col>
        {FeaturesData.map((item, index) => (
          <Col key={index} style={{ width: " 100%" }} lg={8}>
            <div className="features__item">
              <img
                className="features__item-img"
                src={item.imgUrl}
                alt="image__features"
              />
              <h5 className="features__item-title">{item.title}</h5>
              <p className="features__item-desc">{item.desc}</p>
            </div>
          </Col>
        ))}
      </Row>
    </S.FeatureSectionsContainer>
  );
};

export default FeatureSections;
