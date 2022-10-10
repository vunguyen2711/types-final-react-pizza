import React from "react";
import * as S from "./style";
import Logo from "../../assets/images/res-logo.png";
import { Row, Col, Space, Button } from "antd";
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
const Footer = () => {
  return (
    <S.FooterContainer>
      <Row>
        <Col
          style={{ justifyContent: "center", alignItems: "center" }}
          className="footer__column"
          xl={6}
          md={12}
          xs={24}
        >
          <Space align="center" direction="vertical">
            <div className="header__logo">
              <img src={Logo} alt="" />
            </div>
            <h6 className="header__logo-name">TASTY PIZZA</h6>
          </Space>
        </Col>
        <Col className="footer__column" xl={6} md={12} xs={24}>
          <h3 className="footer__title">INFORMATION</h3>
          <p className="footer__subtitle">Store list</p>
          <p className="footer__subtitle">Brand Story</p>
          <p className="footer__subtitle">Member Policies</p>
          <p className="footer__subtitle">News & Event</p>
          <p className="footer__subtitle">Recruitment</p>
          <h3 className="footer__title">ADDRESS</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            numquam cupiditate quis quibusdam praesentium. Quas, eligendi eaque?
          </p>
        </Col>
        <Col className="footer__column" xl={6} md={12} xs={24}>
          <h3 className="footer__title">CUSTOMER SERVICE</h3>
          <p className="footer__subtitle">Contact</p>
          <p className="footer__subtitle">How to Order</p>
          <p className="footer__subtitle">Delivery Policies</p>
          <p className="footer__subtitle">Privacy Policies</p>
          <p className="footer__subtitle">Terms and Conditions</p>
          <h3 className="footer__title">CALL CENTER</h3>
          <p className="footer__subtitle">Delivery 1900 6066 (9:30 – 21:30)</p>
          <p className="footer__subtitle">
            Hotline: 1900 633 606 (9:30 - 21:30)
          </p>
        </Col>
        <Col className="footer__column" xl={6} md={12} xs={24}>
          <h3 className="footer__title">LINK WITH US</h3>
          <Space className="footer__social">
            <Button icon={<FacebookOutlined />}></Button>
            <Button icon={<InstagramOutlined />}></Button>
            <Button icon={<TwitterOutlined />}></Button>
          </Space>
          <div className="footer__coppyright">
            <img
              src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png"
              alt=""
            />
          </div>
        </Col>
      </Row>
    </S.FooterContainer>
  );
};

export default Footer;
