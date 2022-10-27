import React, { useEffect, useState } from "react";
import Helmet from "../../layouts/Helmet/Helmet";
import CommonSection from "../../components/CommonSection/CommonSection";
import Logoimg from "../../assets/images/res-logo.png";
import type { FormValues } from "../../interfaces/interface";
import * as S from "./style";
import { Button, Col, Alert } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getUserInfo,
  registerThunk,
  resetStatus,
} from "../../redux/features/Login&Register/login&registerSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getRegisterState } from "../../redux/features/Login&Register/login&registerSlice";
import { useNavigate, Link } from "react-router-dom";
import { RoutesPath } from "../../constants/routes.path";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(getRegisterState);
  const { isLogin } = useAppSelector(getUserInfo);
  console.log(status);
  const schema = yup.object().shape({
    fullname: yup.string().required("This field must be filled"),
    email: yup
      .string()
      .email("Email required")
      .required("This field must be filled"),
    phone: yup
      .number()
      .typeError("You must specify a number")
      .required("This field must be filled"),
    password: yup
      .string()
      .min(8, "At least 8 characters")
      .max(32, "Max lenght 32 characters")
      .required("This field must be filled"),
    passwordConfirm: yup
      .string()
      .required("This field must be filled")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const { fullname, email, password, phone } = data;
    await dispatch(
      registerThunk({
        fullname,
        email,
        password,
        phone,
      })
    );
  });
  useEffect(() => {
    if (status === "success" && isLogin === false) {
      navigate(RoutesPath.LOGIN);
    }
    if (status === "success" && isLogin === true) {
      navigate(RoutesPath.HOME);
      window.alert("Register Success !!!");
    }
  }, [status]);

  return (
    <>
      <Helmet title="Register" />
      <CommonSection title="Register" />
      {status === "failed" && (
        <Alert type="error" message="Email is existed" banner closable />
      )}

      <S.RegisterContainer>
        <div className="register__form">
          <div className="register__form-img">
            <img src={Logoimg} alt="" />
          </div>
          <form onSubmit={onSubmit} action="register__form-contenr">
            <div className="register__form-control">
              <input
                {...register("fullname")}
                type="text"
                placeholder="Full name"
              />
              <p className="error__massage">{errors.fullname?.message}</p>
            </div>
            <div className="register__form-control">
              <input type="text" {...register("email")} placeholder="Email" />
              <p className="error__massage">{errors.email?.message}</p>
            </div>
            <div className="register__form-control">
              <input type="text" {...register("phone")} placeholder="Phone" />
              <p className="error__massage">{errors.phone?.message}</p>
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
              <input
                type="password"
                {...register("passwordConfirm")}
                placeholder="Confirm-Password"
              />
              <p className="error__massage">
                {errors.passwordConfirm?.message}
              </p>
            </div>
            <div className="register__form-control">
              <Button htmlType="submit" block>
                Register
              </Button>
              <Link to={RoutesPath.LOGIN}>
                <Button block>Have account ? Sign in</Button>
              </Link>
            </div>
          </form>
        </div>
      </S.RegisterContainer>
    </>
  );
};

export default Register;
