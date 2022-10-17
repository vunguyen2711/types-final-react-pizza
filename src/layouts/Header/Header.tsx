import React, { useState } from "react";
import * as S from "./style";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  getCartItems,
  increaseAmount,
} from "../../redux/features/Cart/cartSlice";
import { RoutesPath } from "../../constants/routes.path";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/res-logo.png";
import {
  Input,
  Button,
  Space,
  Avatar,
  Badge,
  Drawer,
  List,
  Divider,
} from "antd";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import DrawerList from "../../components/DrawerList/DrawerList";
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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, totalAmount, totalPriceItems } =
    useAppSelector(getCartItems);

  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <S.DrawerContainer
        title="Your Cart"
        placement="right"
        onClose={onClose}
        open={open}
        width={450}
      >
        {cartItems.length === 0 ? (
          <>
            <h2 className="drawer__txt">
              You have no items in your shopping cart.
            </h2>
            <button
              onClick={() => {
                navigate(RoutesPath.AllFOODS);
                onClose();
              }}
              className="drawer__btn-shopping"
            >
              Shopping now !!!
            </button>
          </>
        ) : (
          cartItems.map((item, index) => (
            <DrawerList key={item.id} item={item} />
          ))
        )}
        <div className="drawer__totalprice">
          <h2 className="drawer__totalprice-txt">Total: ${totalPriceItems}</h2>
          <button
            onClick={() => {
              navigate(RoutesPath.CART);
              onClose();
            }}
            className="drawer__totalprice-btn"
          >
            Check Out Your Cart
          </button>
        </div>
      </S.DrawerContainer>
      <S.HeaderContainer isOpen={isOpen}>
        <Link to={RoutesPath.HOME}>
          <Space align="center" direction="vertical">
            <div className="header__logo">
              <img src={Logo} alt="" />
            </div>
            <h6 className="header__logo-name">TASTY PIZZA</h6>
          </Space>
        </Link>

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
          <Badge size="default" count={totalAmount}>
            <ShoppingCartOutlined onClick={showDrawer} />
          </Badge>

          <UserOutlined />
          <MenuOutlined
            onClick={() => setIsOpen(!isOpen)}
            className="menu__icon"
          />
        </Space>
      </S.HeaderContainer>
    </>
  );
};

export default Header;
