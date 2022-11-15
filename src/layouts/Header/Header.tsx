import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RoutesPath } from "../../constants/routes.path";
import {
  getCartItems,
  increaseAmount,
  toggleDrawer,
} from "../../redux/features/Cart/cartSlice";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/res-logo.png";
import { Button, Space, Avatar, Badge, Modal } from "antd";
import {
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import FavoriteBadge from "../../components/FavoriteBadge/FavoriteBadge";
import DrawerList from "../../components/DrawerList/DrawerList";
import {
  getUserInfo,
  logout,
  resetStatus,
} from "../../redux/features/Login&Register/login&registerSlice";
import { logoutResetFavorite } from "../../redux/features/FavoriteProDucts/FavoriteProductsSlice";
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
  const [nameUser, setNameUser] = useState<string>("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, totalAmount, totalPriceItems, isOpenDrawer } =
    useAppSelector(getCartItems);
  const { isLogin, fullname, email } = useAppSelector(getUserInfo);

  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const showDrawer = () => {
    setOpen(true);
    dispatch(toggleDrawer());
  };
  const handleLogout = () => {
    Modal.confirm({
      content: "Do you want to log out ???",
      cancelText: "Cancel",
      okText: "Accept",
      onOk: () => {
        dispatch(logout());
        dispatch(resetStatus());
        dispatch(logoutResetFavorite());
        localStorage.removeItem("accessToken");
        Modal.success({
          content: "Log Out Successfullly !!!",
        });
        navigate(RoutesPath.HOME);
      },
    });
  };
  const onClose = () => {
    setOpen(false);
    dispatch(toggleDrawer());
  };
  useEffect(() => {
    if (isLogin === true) {
      const nameSlice = fullname.slice(0, 1);
      setNameUser(nameSlice);
    }
  }, [isLogin]);
  useEffect(() => {
    if (isOpenDrawer) {
      setOpen(true);
    }
  }, [isOpenDrawer]);
  return (
    <>
      <S.DrawerContainer
        title="Your Cart"
        placement="right"
        onClose={onClose}
        open={open}
        width={450}
      >
        {cartItems?.length === 0 ? (
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
        {isLogin && <h2 className="header__welcome">Welcome {email}</h2>}
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

        <Space size="large">
          <FavoriteBadge></FavoriteBadge>
          <Badge size="default" count={totalAmount}>
            <ShoppingCartOutlined onClick={showDrawer} />
          </Badge>
          <div className="header__user-avatar">
            {isLogin ? <Avatar>{nameUser}</Avatar> : <UserOutlined />}
            <Space direction="vertical" className="header__user-actions">
              {isLogin ? (
                <>
                  <Button onClick={handleLogout} block>
                    Log out
                  </Button>
                  <Button
                    onClick={() => navigate(RoutesPath.USERDELIVERY)}
                    block
                  >
                    My Delivery
                  </Button>
                </>
              ) : (
                <Link to={RoutesPath.LOGIN}>
                  <Button block>Login</Button>
                </Link>
              )}
              <Link to={RoutesPath.REGISTER}>
                <Button block>Register</Button>
              </Link>
            </Space>
          </div>

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
