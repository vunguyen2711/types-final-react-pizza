import React, { useEffect, useState } from "react";
import Helmet from "../../layouts/Helmet/Helmet";
import CommonSection from "../../components/CommonSection/CommonSection";
import * as S from "./style";
import { Row, Col, Input, Button, Space, Avatar, Divider, Modal } from "antd";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { shippingMoney, VAT } from "../../constants/constants";
import grabfoodLogo from "../../assets/images/logo-grab-food-inkythuatso-20-15-56-19.jpeg";
import shoppefood from "../../assets/images/unnamed.png";
import beaminfood from "../../assets/images/unnamed(1).png";
import expressfood from "../../assets/images/express-delivery-services-logo-design-courier-template-cargo-icon-135610100.jpeg";
import { useNavigate } from "react-router-dom";
import {
  getCartItems,
  toggleDrawer,
  removeAllCartItems,
} from "../../redux/features/Cart/cartSlice";
import type {
  FormCheckOutValue,
  PostDataOrder,
} from "../../interfaces/interface";
import { RoutesPath } from "../../constants/routes.path";
import {
  getOrder,
  sendOrderThunk,
} from "../../redux/features/Orders/OrdersSlice";
import { getUserInfo } from "../../redux/features/Login&Register/login&registerSlice";
import { RootState } from "../../redux/store";

const transportOptions = [
  {
    value: "grabfood",
    img: grabfoodLogo,
  },
  {
    value: "shopeefood",
    img: shoppefood,
  },
  {
    value: "beaminfood",
    img: beaminfood,
  },
  {
    value: "expressfood",
    img: expressfood,
  },
];
const schema = yup.object().shape({
  name: yup.string().required("Please enter this field"),
  phone: yup
    .number()
    .typeError("You must specify a number")
    .required("Please enter this field"),
  address: yup.string().required("Please enter this field"),
  transport: yup
    .string()
    .typeError("Please choose your transportation !!!")
    .required(),
});
const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [transportOption, setTransportOption] = useState<string>("");
  const [shippingFee, setShippingFee] = useState<number>(0);
  const { id } = useAppSelector(getUserInfo);
  const { cartItems, totalPriceItems } = useAppSelector(getCartItems);
  const { status } = useAppSelector(getOrder);
  const [open, setOpen] = useState(false);
  const [formCheckoutData, setFormCheckOutData] = useState<FormCheckOutValue>();
  const [modalText, setModalText] = useState("Please Confirm This Bill");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setOpen(false);
    const data: PostDataOrder = {
      userId: id,
      cartItems: [...cartItems],
      timeInit: moment().toISOString(),
      completed: false,
      totalPrice: totalPriceItems,
      ...(formCheckoutData && {
        deliveryData: formCheckoutData,
      }),
    };
    dispatch(sendOrderThunk(data));

    window.alert("Your delivery will come soon !!!");

    navigate(RoutesPath.HOME);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormCheckOutValue>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    if (data) {
      setFormCheckOutData(data);
      showModal();
    }
  });
  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransportOption(e.target.value);
  };
  useEffect(() => {
    if (transportOption === "grabfood") {
      setShippingFee(shippingMoney.GRAB);
    }
    if (transportOption === "expressfood") {
      setShippingFee(shippingMoney.EXPRESS);
    }
    if (transportOption === "shopeefood") {
      setShippingFee(shippingMoney.SHOPEE);
    }
    if (transportOption === "beaminfood") {
      setShippingFee(shippingMoney.BEAMIN);
    }
    console.log("render");
  }, [transportOption]);

  return (
    <>
      <Modal
        title="Completed Shopping"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
      <Helmet title="Checkout"></Helmet>
      <CommonSection title="Checkout"></CommonSection>
      <S.CheckoutContainer>
        <Row gutter={[10, 10]}>
          <Col lg={12} xs={24}>
            <div className="checkout__form-container">
              <h1 className="checkout__form-title">Delivery Information</h1>
              <form id="myform" onSubmit={onSubmit} className="checkout__form">
                <div className="checkout__form-control">
                  <label className="checkout__form-label">
                    {" "}
                    Name <span>(*)</span>
                  </label>
                  <br />
                  <input
                    {...register("name")}
                    placeholder="ex: Johny Dang..."
                    className="checkout__form-input"
                    type="text"
                  />
                  <p className="checkout__form-error">{errors.name?.message}</p>
                </div>
                <div className="checkout__form-control">
                  <label className="checkout__form-label">
                    Phone Number <span>(*)</span>
                  </label>
                  <br />
                  <input
                    {...register("phone")}
                    placeholder="ex: johnnydang@gmail.com"
                    className="checkout__form-input"
                    type="text"
                  />
                  <p className="checkout__form-error">
                    {errors.phone?.message}
                  </p>
                </div>
                <div className="checkout__form-control">
                  <label className="checkout__form-label">
                    {" "}
                    Address <span>(*)</span>
                  </label>
                  <br />
                  <input
                    {...register("address")}
                    placeholder="ex: 123 Abeard str, America"
                    className="checkout__form-input"
                    type="text"
                  />
                  <p className="checkout__form-error">
                    {errors.address?.message}
                  </p>
                </div>
                <div className="checkout__form-control">
                  <label className="checkout__form-label">Notification</label>
                  <br />
                  <textarea placeholder="" className="checkout__form-input" />
                </div>
                <p className="checkout__form-label">
                  {" "}
                  Note:
                  <span> (*)</span> this field must be enter
                </p>
              </form>
            </div>
          </Col>
          <Col lg={12} xs={24}>
            <div className="checkout__bill-container">
              <div className="checkout__bill-title">
                {" "}
                <h1>Your Bill</h1>
                <Button onClick={() => dispatch(toggleDrawer())}>
                  Change Your Cart
                </Button>
              </div>

              <Space direction="vertical" className="checkout__bill-list">
                {cartItems.map((item) => (
                  <Space
                    align="center"
                    direction="horizontal"
                    key={item.id}
                    className="checkout__bill-item"
                  >
                    <Avatar size="large" src={item.img}></Avatar>{" "}
                    <h2>{item.title}</h2>
                    <span> X </span> <h2>{item.amount}</h2> <span> = </span>{" "}
                    <h2>${item.totalPrice}</h2>
                  </Space>
                ))}
              </Space>
              <form className="checkout__payment-container">
                <h1 className="checkout__payment-title">
                  Choose Transport Agency
                </h1>

                <div onChange={handleChangeOption}>
                  {transportOptions.map((item) => (
                    <div key={item.value} className="checkout__payment-option">
                      <input
                        {...register("transport")}
                        style={{ cursor: "pointer" }}
                        type="radio"
                        name="transport"
                        value={item.value}
                      />
                      <label htmlFor="grabfood">
                        <Avatar
                          className="checkout__payment-img"
                          size="default"
                          src={item.img}
                          alt=""
                        />
                        {item.value}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="checkout__form-error">
                  {errors.transport?.message}
                </p>
              </form>
            </div>
          </Col>
          <Col span={24}>
            <div className="checkout__total-container">
              <h1 className="checkout__total-food">
                Total Price : <span>${totalPriceItems}</span>
              </h1>
              <h1 className="checkout__total-payment">
                Shipping : <span>${shippingFee}</span>
              </h1>
              <h1 className="checkout__total-vat">
                VAT : <span>{VAT * 100}%</span>
              </h1>
              <Divider></Divider>
              <h1 className="checkout__total-title">
                Your Payment = $
                {totalPriceItems + shippingFee + totalPriceItems * VAT}
              </h1>
              <Divider></Divider>
              <div className="checkout__submit-button">
                <Space>
                  <Button form="myform" htmlType="submit">
                    Completed
                  </Button>
                </Space>
              </div>
            </div>
          </Col>
        </Row>
      </S.CheckoutContainer>
    </>
  );
};

export default Checkout;
