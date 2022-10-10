import styled, { keyframes } from "styled-components";
import { Row } from "antd";
import { breakpoints } from "../../constants/breakpoints";
export const moveRightIn = keyframes`
  0% {
    transform: translateX(1000px);
  }
  100% {
    transform: translateX(0);
  }
 `;
export const moveLeftIn = keyframes`
  0% {
    transform: translateX(-1000px);
  }
  100% {
    transform: translateX(0);
  }
 `;

export const HeroContainer = styled(Row)`
  align-items: center;
  .hero__content {
    animation: ${moveLeftIn} 2s ease;
    h5 {
      margin-bottom: 18px;
      font-size: 30px;
      letter-spacing: 1.2;
    }
    h1 {
      margin-bottom: 18px;
      font-size: 54px;
      line-height: 1.2;
      span {
        color: var(--red-color);
        &:nth-of-type(2) {
          font-size: 64px;
        }
      }
    }
    p {
      width: 80%;
      font-size: 1rem;
      line-height: 30px;
    }
    .btn__order {
      display: flex;
      align-items: center;
      font-weight: bold;
      color: #fff;
      background-color: var(--red-color);
      transition: 0.3 all;
      box-shadow: 0px 0px 2px 0px;
    }
    .btn__order:hover {
      box-shadow: 5px 5px 10px 0px;
      transform: scale(1.1);
    }
    .btn__seefood:hover {
      color: var(--red-color);
      border: 1px solid var(--red-color);
      transform: scale(1.1);
    }
  }
  .hero__image {
    img {
      width: 100%;
      animation: ${moveRightIn} 2s ease;
    }
  }
  @media screen and (max-width: 1500px) {
    .hero__content {
      animation: ${moveLeftIn} 2s ease;
      h5 {
        margin-bottom: 16px;
        font-size: 18px;
        letter-spacing: 1.2;
      }
      h1 {
        margin-bottom: 18px;
        font-size: 40px;
        line-height: 1.2;
        span {
          color: var(--red-color);
          &:nth-of-type(2) {
            font-size: 40px;
          }
        }
      }
      p {
        width: 100%;
        font-size: 12px;
        line-height: 18px;
      }
      .btn__order {
        display: flex;
        align-items: center;
        font-weight: bold;
        color: #fff;
        background-color: var(--red-color);
        transition: 0.3 all;
        box-shadow: 0px 0px 2px 0px;
      }
      .btn__order:hover {
        box-shadow: 5px 5px 10px 0px;
        transform: scale(1.1);
      }
      .btn__seefood:hover {
        color: var(--red-color);
        border: 1px solid var(--red-color);
        transform: scale(1.1);
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .hero__content {
      animation: ${moveLeftIn} 2s ease;
      h5 {
        margin-bottom: 16px;
        font-size: 12px;
        letter-spacing: 1.2;
      }
      h1 {
        margin-bottom: 18px;
        font-size: 32px;
        line-height: 1.2;
        span {
          color: var(--red-color);
          &:nth-of-type(2) {
            font-size: 32px;
          }
        }
      }
      p {
        width: 100%;
        font-size: 9px;
        line-height: 15px;
      }
      .btn__order {
        display: flex;
        font-size: 12px;
        align-items: center;
        font-weight: bold;
        color: #fff;
        background-color: var(--red-color);
        transition: 0.3 all;
        box-shadow: 0px 0px 2px 0px;
      }
      .btn__order:hover {
        box-shadow: 5px 5px 10px 0px;
        transform: scale(1.1);
      }
      .btn__seefood:hover {
        color: var(--red-color);
        border: 1px solid var(--red-color);
        transform: scale(1.1);
      }
    }
  }
  @media screen and (max-width: 1000px) {
    text-align: center;
    .hero__content {
      margin-top: 30px;
      text-align: center;
      h5 {
        font-size: 16px;
      }
      h1 {
        font-size: 40px;
      }
      p {
        text-align: center;
        width: 60%;
        margin: 0 auto 10px;
      }
    }
  } ;
`;
