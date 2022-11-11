import React, { useRef, useState } from "react";
import Helmet from "../../layouts/Helmet/Helmet";
import CommonSection from "../../components/CommonSection/CommonSection";
import { Row, Col, Button, Divider, Card, Space } from "antd";
import { PhoneFilled, WechatFilled } from "@ant-design/icons";
import * as S from "./style";
const phoneData = [
  {
    country: "America",
    area: [
      {
        areaTitle: "US and Canada",
        phone: ["+1 877 683 0497 (English)", "+1 857 829 5064 (Spanish)"],
      },
      {
        areaTitle: "Chile",
        phone: ["+56 2 2582 3853 (Spanish)"],
      },
      {
        areaTitle: "Brazil",
        phone: ["+55 21 2018 1092 (Portuguese)"],
      },
      {
        areaTitle: "Mexico",
        phone: ["+52 55 8525 9498 (Spanish)"],
      },
    ],
  },
  {
    country: "Europe",
    area: [
      {
        areaTitle: "Austria",
        phone: ["+43 720 902 456 (German)", "+43 720 902 440 (English)"],
      },
      {
        areaTitle: "Belgium",
        phone: ["+32 2 808 4733 (French)", "+32 2 808 4734 (English)"],
      },
      {
        areaTitle: "Denmark",
        phone: ["+45 6996 0208 (English)"],
      },
      {
        areaTitle: "Finland",
        phone: ["+358 7 5325 2986 (English)"],
      },
    ],
  },
  {
    country: "Asia Pacific",
    area: [
      {
        areaTitle: "Australia",
        phone: ["+61 2 8046 6514 (English)"],
      },
      {
        areaTitle: "Hong Kong",
        phone: ["+852 3008 5689 (English)"],
      },
      {
        areaTitle: "India",
        phone: ["+91 11 7127 9211 (English)"],
      },
      {
        areaTitle: "Japan",
        phone: ["+81 3 6863 5389 (Japanese)"],
      },
      {
        areaTitle: "Viet Nam",
        phone: ["+84 908899898 (Vietnamese)"],
      },
      {
        areaTitle: "New Zealand",
        phone: ["+64 9 801 1072 (English)"],
      },
      {
        areaTitle: "Singapore",
        phone: ["+65 800 852 3413 (English)"],
      },
      {
        areaTitle: "South Korea",
        phone: ["+070 4732 5013 (English)"],
      },
    ],
  },
];
const Contact: React.FC = () => {
  const moveToPhoneContact = () => {
    const phoneContactCors = document
      .querySelector("#contactRef")
      .getBoundingClientRect();
    const phoneContactCorsTop = phoneContactCors.top;
    window.scrollTo({
      top: phoneContactCorsTop,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Helmet title="Contact" />
      <CommonSection title="Contact"></CommonSection>
      <S.ContactContainer>
        <Row gutter={[20, 40]}>
          <Col span={24}>
            <h1 className="contact__title">Keep In Touch</h1>
          </Col>
          <Col md={12} xs={24}>
            <div className="contact__phone">
              <div className="contact__phone-logo">
                <PhoneFilled></PhoneFilled>
                <h2>Talk To Sale</h2>
              </div>
              <div className="contact__phone-text">
                <p>
                  Interested in Pizza's Product? Just pick up the phone to chat
                  with a member of our sales team.
                </p>
              </div>
              <Button onClick={moveToPhoneContact} type="primary">
                Call Us Now
              </Button>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="contact__support">
              <div className="contact__support-logo">
                <WechatFilled></WechatFilled>
                <h2>Connect Us</h2>
              </div>
              <div className="contact__support-text">
                <p>
                  Sometimes you need a little help from our headquauter. Don’t
                  worry… we’re here for you.
                </p>
              </div>
              <Button type="primary">Mail to us</Button>
            </div>
          </Col>
          <Col span={24}>
            <h1 className="contact__title">
              Connect with one of our global offices in Viet Nam
            </h1>
          </Col>
          <Col span={24}>
            <Row>
              <Col lg={18} md={12} xs={24}>
                <iframe
                  className="gmap_iframe"
                  width="100%"
                  height="300px"
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=241 Nguyen Chi Thanh&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </Col>
              <Col lg={6} md={12} xs={24}>
                <div className="contact__map">
                  <h1 className="contact__map-title">Headquarters</h1>
                  <h2 className="contact__map-details">
                    Tasty's Pizza Building
                  </h2>
                  <h2 className="contact__map-details">
                    241 Nguyen Chi Thanh.st
                  </h2>
                  <h2 className="contact__map-details">Da Nang City</h2>
                  <Divider></Divider>
                  <h1 className="contact__map-title">Phone/Fax</h1>
                  <h2 className="contact__map-details">+84 0905-819-1233</h2>
                  <h2 className="contact__map-details">+33 0901-12312-12</h2>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <h1 id="contactRef" className="contact__title">
              Call Sales using one of our local numbers
            </h1>
          </Col>
          {phoneData?.map((data, index) => {
            return (
              <Col id="phonedetail" key={index} span={24}>
                <div className="contact__phone-detail">
                  <h2 className="contact__detail-country">{data.country}</h2>
                  <Row gutter={[20, 20]}>
                    {data.area.map((item, index) => (
                      <Col key={index} lg={6} md={8} xs={12}>
                        <a href={`tel:${item.phone[0]}`}>
                          <Card
                            hoverable
                            className="contact__card"
                            bordered
                            title={item.areaTitle}
                          >
                            {item.phone.map((phoneItem, index) => (
                              <p key={index}>{phoneItem}</p>
                            ))}
                          </Card>
                        </a>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>
            );
          })}
        </Row>
      </S.ContactContainer>
    </>
  );
};

export default Contact;
