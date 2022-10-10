import styled, { css } from "styled-components";
import { Row, Col, Space } from "antd";
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
