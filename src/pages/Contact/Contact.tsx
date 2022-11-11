import React, { useEffect, useRef, useState } from "react";
import Helmet from "../../layouts/Helmet/Helmet";
import CommonSection from "../../components/CommonSection/CommonSection";
import { Row, Col, Button, Divider, Card, Space, Modal } from "antd";
import { PhoneFilled, WechatFilled } from "@ant-design/icons";
import * as S from "./style";
import { phoneData } from "../../constants/constants";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ContactFormValidation } from "../../interfaces/interface";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  getStatusContact,
  postContactThunk,
} from "../../redux/features/ContactSlice/ContactSlice";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "../../constants/routes.path";
const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  phone: yup
    .number()
    .typeError("Your phone must be a number")
    .required("Please enter your number"),
  email: yup.string().email().required("Please enter your email"),
  content: yup.string().required("Please enter your content"),
});
const Contact: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(getStatusContact);
  const {
    handleSubmit,
    formState: { errors },
    resetField,
    register,
  } = useForm<ContactFormValidation>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const moveToContactUs = () => {
    const contactUsCors = document
      .querySelector(".contact__form-container")
      .getBoundingClientRect();
    const contactUsCorsTop = contactUsCors.top;
    window.scrollTo({
      top: contactUsCorsTop,
      behavior: "smooth",
    });
  };
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
  const onSubmit = handleSubmit((data) => {
    dispatch(postContactThunk(data));
  });
  useEffect(() => {
    if (status === "success") {
      Modal.success({
        content: "You message will come to us soon...",
        cancelText: "Stay here",
        onCancel: () => {
          return;
        },
        okText: "Go to Home Page",
        onOk: () => {
          navigate(RoutesPath.HOME);
        },
      });
    }
  }, [status]);
  useEffect(() => {
    if (errors.name) {
      Modal.error({
        content: `${errors.name.message}`,
      });
    }
    if (errors.phone) {
      Modal.error({
        content: `${errors.phone.message}`,
      });
    }
    if (errors.email) {
      Modal.error({
        content: `${errors.email.message}`,
      });
    }
    if (errors.content) {
      Modal.error({
        content: `${errors.content.message}`,
      });
    }
  }, [errors]);
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
            <div onClick={moveToPhoneContact} className="contact__phone">
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
            <div onClick={moveToContactUs} className="contact__support">
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
          <Col span={24}></Col>
          <Col span={24}>
            <div className="contact__form-container">
              <h1 className="contact__title">Contact Us</h1>
              <form
                onSubmit={onSubmit}
                id="contact"
                action=""
                className="contact__form"
              >
                <div className="contact__form-control">
                  <label htmlFor="">Name:</label>
                  <input {...register("name")} type="text" />
                </div>
                <div className="contact__form-control">
                  <label htmlFor="">Phone:</label>
                  <input {...register("phone")} type="text" />
                </div>
                <div className="contact__form-control">
                  <label htmlFor="">Email:</label>
                  <input {...register("email")} type="email" />
                </div>
                <div className="contact__form-control">
                  <label htmlFor="">Content:</label>
                  <textarea {...register("content")} />
                </div>

                <Button htmlType="submit" form="contact" block={true}>
                  Send To Us
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </S.ContactContainer>
    </>
  );
};

export default Contact;
