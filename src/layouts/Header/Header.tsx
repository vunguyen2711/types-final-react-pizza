import React, { useState } from "react";
import * as S from "./style";
import { RoutesPath } from "../../constants/routes.path";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/res-logo.png";
import { Divider, Row, Col, Space, Avatar, Badge } from "antd";
import {
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
const menuLinks = [
  {
    display: "Home",
    path: RoutesPath.HOME,
  },
  {
    display: "All-Food",
    path: RoutesPath.AllFOODS,
  },
  {
    display: "Cart",
    path: RoutesPath.CART,
  },
  {
    display: "Contact",
    path: RoutesPath.CONTACT,
  },
];
const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <S.HeaderContainer isOpen={isOpen}>
      <Space align="center" direction="vertical">
        <div className="header__logo">
          <img src={Logo} alt="" />
        </div>
        <h6 className="header__logo-name">TASTY PIZZA</h6>
      </Space>

      <Space className="navbar__menu" size="large">
        <p onClick={() => setIsOpen(!isOpen)} className="menu__exit">
          X
        </p>
        {menuLinks.map((item, index) => {
          return (
            <Link onClick={() => setIsOpen(false)} key={index} to={item.path}>
              <h2
                className={`menu__link ${
                  pathname === item.path && `isActived`
                }`}
              >
                {item.display}
              </h2>
            </Link>
          );
        })}
      </Space>

      <Space size="small">
        <Badge size="default" count={5}>
          <ShoppingCartOutlined />
        </Badge>

        <UserOutlined />
        <MenuOutlined
          onClick={() => setIsOpen(!isOpen)}
          className="menu__icon"
        />
      </Space>
    </S.HeaderContainer>
  );
};

export default Header;
