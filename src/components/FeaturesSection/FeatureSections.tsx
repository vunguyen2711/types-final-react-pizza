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
    desc: "We are famous for great delicious Seafood Deluxe Pizza, together with chunky toppings",
  },
  {
    title: "Super Dive In",
    imgUrl: feature__imag02,
    desc: "The Pizza Company launched its very first restaurant in Vietnam. Together with the opened trading trend!",
  },
  {
    title: "Easy Pick Up",
    imgUrl: feature__imag03,
    desc: "Not only offering the very best pizza, with the supreme quality, professional and friendly service and non!",
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
            Inspired by Italy’s greatest recipes and subtle meals combined with
            truly understanding Asia preferences in terms of tastes and
            cultures.
          </p>
          <p>
            Founded in 1981, The Pizza Company – an Italian-inspired restaurant
            chain has been expanding its restaurants and franchise system
            worldwide. The Pizza Company has more than 300 restaurants in over
            12 markets abroad.
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
