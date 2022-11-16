import styled, { css } from "styled-components";
import { Drawer } from "antd";
import { IsOpenProps } from "../../interfaces/interface";
export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: var(--pink-color);
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;

  .header__welcome {
    color: var(--red-color);
    position: absolute;
    top: 5px;
    right: 10%;
    text-align: center;
  }
  .header__logo {
    width: 60px;
    cursor: pointer;
    & img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  .header__logo-name {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    cursor: pointer;
  }
  .header__user-avatar {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      height: 20px;
      width: 100%;
    }
    &:hover > .header__user-actions {
      display: flex;
      padding: 10px;
      background-color: var(--black-color);
    }
  }
  .header__user-actions {
    display: none;
    position: absolute;
    top: 120%;
    &::before {
      content: "";
      width: 10px;
      height: 5px;
      position: absolute;
      top: -5px;
      background-color: var(--black-color);
      clip-path: polygon(50% 0, 0% 100%, 100% 100%);
    }
  }
  .menu__link {
    font-size: 20px;
    font-weight: bold;
    &.isActived {
      color: var(--red-color);
    }
    &:hover {
      color: var(--red-color);
    }
  }

  .menu__icon {
    display: none;
  }
  .menu__exit {
    display: none;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    .navbar__menu {
      position: fixed;
      top: 0;
      right: -200px;
      z-index: 1000;
      width: 200px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 20px;
      transition: all 0.5s;
      background-color: #fff;
      ${(props: IsOpenProps) =>
        props.isOpen === true &&
        css`
          transform: translateX(-200px);
        `}
    }
    .menu__icon {
      display: block;
    }
    .menu__exit {
      position: absolute;
      top: 20px;
      left: 20px;
      display: block;
    }
  }
`;
export const DrawerContainer = styled(Drawer)`
  .drawer__txt {
    font-size: 16px;
    color: var(--red-color);
    text-align: center;
  }
  .drawer__btn-shopping {
    position: absolute;
    color: var(--black-color);
    font-size: 16px;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: var(--pink-color);
    cursor: pointer;
    left: 50%;
    transform: translateX(-50%);
  }
  .drawer__list {
    height: fit-content;
    padding: 10px;
    width: 100%;
  }
  .drawer__list-delete {
    text-align: right;
  }

  .drawer__title {
    font-size: 18px;
  }
  .drawer__price {
    font-size: 16px;
    & span {
      font-size: 20px;
      color: var(--red-color);
    }
  }
  .drawer__list-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .drawer-list-input {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;
  }
  .drawer__totalprice {
    width: 90%;
    position: absolute;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--red-color);
    border-radius: 10px;
    padding: 10px 20px;
  }
  .drawer__totalprice-txt {
    color: #fff;
    font-size: 24px;
    margin: 0;
  }
  .drawer__totalprice-btn {
    color: var(--black-color);
    font-size: 16px;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: var(--pink-color);
    cursor: pointer;
  }
`;
