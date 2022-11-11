import React from "react";
import { Row, Col, Space, Button, Typography } from "antd";
import {
  ArrowRightOutlined,
  CarOutlined,
  MoneyCollectFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./style";
import heroImage from "../../assets/images/hero.png";
import { RoutesPath } from "../../constants/routes.path";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <S.HeroContainer gutter={16}>
      <Col span={24} lg={12}>
        <div className="hero__content">
          <h5>Easyway to take an order</h5>
          <h1>
            <span>HUNGRY ?</span> Just wait <br />
            food at
            <span> YOUR DOOR </span>
          </h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            dolore est quas ducimus dolor necessitatibus rem earum a optio
            explicabo! Design by: Nguyen Tam Trieu Vu
          </p>
          <Space size="middle">
            <Button
              onClick={() => navigate(RoutesPath.CONTACT)}
              size="large"
              className="btn__order"
              icon={<ArrowRightOutlined />}
            >
              Contact Us Now
            </Button>
            <Link to="/foods">
              <Button size="large" className="btn__seefood">
                See all food
              </Button>
            </Link>
          </Space>
          <br />
          <br />

          <Space
            align="center"
            size="middle"
            style={{ color: "#212425", fontWeight: "bold" }}
          >
            <Typography.Paragraph
              style={{ display: "flex", alignItems: "center" }}
            >
              <CarOutlined /> No Shiping Money
            </Typography.Paragraph>
            <Typography.Paragraph
              style={{ display: "flex", alignItems: "center" }}
            >
              <MoneyCollectFilled /> 100% money back
            </Typography.Paragraph>
          </Space>
        </div>
      </Col>
      <Col className="hero__image" span={24} lg={12}>
        <div className="hero__image">
          <img src={heroImage} alt="" />
        </div>
      </Col>
    </S.HeroContainer>
  );
};

export default HeroSection;
