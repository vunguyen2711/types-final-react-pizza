import React from "react";
import { Row, Col } from "antd";
import SlickSlide from "../SlickSlide/SlickSlide";
import testimonialImg from "../../assets/images/network.png";
import * as S from "./style";
const Testimonial: React.FC = () => {
  return (
    <S.TestimonialContainer>
      <Row style={{ width: "100%" }}>
        <Col style={{ margin: "auto auto" }} span={24} lg={12}>
          <div className="testimonial" style={{ textAlign: "center" }}>
            <h5 className="testimonial__subtitle">Testimonial</h5>
            <h2 className="testimonial__title">
              What are <span>our customer</span> are saying ?
            </h2>
            <SlickSlide />
          </div>
        </Col>
        <Col span={24} lg={12}>
          <div className="testimonial__img">
            <img src={testimonialImg} alt="" />
          </div>
        </Col>
      </Row>
    </S.TestimonialContainer>
  );
};

export default Testimonial;
