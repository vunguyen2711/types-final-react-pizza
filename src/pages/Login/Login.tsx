import React, { useEffect } from "react";
import Helmet from "../../layouts/Helmet/Helmet";
import CommonSection from "../../components/CommonSection/CommonSection";
import * as S from "./style";
import { Alert, Button, Modal } from "antd";
import Logoimg from "../../assets/images/res-logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormValues } from "../../interfaces/interface";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getCartItems } from "../../redux/features/Cart/cartSlice";
import {
  getLoginState,
  getUserInfo,
  loginThunk,
  resetStatus,
} from "../../redux/features/Login&Register/login&registerSlice";
import { useNavigate, Link } from "react-router-dom";
import { RoutesPath } from "../../constants/routes.path";

const schema = yup.object().shape({
  email: yup.string().email().required("This field must be filled"),
  password: yup
    .string()
    .min(8, "At least 8 characters")
    .max(32, "Max lenght 32 characters")
    .required("This field must be filled"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector(getLoginState);
  const { cartItems } = useAppSelector(getCartItems);
  const userInfo = useAppSelector(getUserInfo);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    resetField,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data: FormValues) => {
    dispatch(loginThunk(data));
  });

  useEffect(() => {
    if (status === "success") {
      Modal.success({
        content: "Login Success !!! Continue to shopping...",
        afterClose: () => {
          navigate(RoutesPath.HOME);
        },
      });
    }
    if (status === "failed") {
      Modal.error({
        content: "Login failed",
        afterClose: () => {
          resetField("email");
          resetField("password");
          dispatch(resetStatus());
        },
      });
    }
  }, [status]);

  useEffect(() => {
    dispatch(resetStatus());
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate(RoutesPath.HOME);
      window.alert("You are logined");
    }
  }, []);
  return (
    <>
      <Helmet title="Login"></Helmet>
      <CommonSection title="Login"></CommonSection>
      <S.RegisterContainer>
        <div className="register__form">
          <div className="register__form-img">
            <img src={Logoimg} alt="" />
          </div>
          <form onSubmit={onSubmit} action="register__form-content">
            <div className="register__form-control">
              <input type="text" {...register("email")} placeholder="Email" />
              <p className="error__massage">{errors.email?.message}</p>
            </div>

            <div className="register__form-control">
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
              />
              <p className="error__massage">{errors.password?.message}</p>
            </div>

            <div className="register__form-control">
              <Button htmlType="submit" block>
                Login
              </Button>
              <Link to={RoutesPath.HOME}>
                <Button block>Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </S.RegisterContainer>
    </>
  );
};

export default Login;
