import { Modal } from "antd";
import styled from "styled-components";

export const ProductCard = styled.div`
  width: 100%;
  min-height: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .bookmark__container {
    position: absolute;
    top: 10px;
    right: 0;
  }
  .product__img {
    height: 250px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      transition: all 0.5s;
      &:hover {
        transform: rotate(5deg);
      }
    }
  }

  .product__title {
    text-align: center;
    color: var(--red-color);
    font-size: 16px;
    font-weight: bold;
  }
  .product__price {
    color: var(--red-color);
    font-size: 16px;
  }
  .product__action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }
  .addtocart__btn {
    &:hover {
      color: #fff;
      background-color: var(--red-color);
    }
  }
`;
export const ModalContainer = styled(Modal)`
  .modal__content {
  }
  .modal__content-title {
    font-size: 32px;
    font-weight: bold;
    color: var(--black-color);
  }
  .modal__content-price {
    font-size: 24px;
    & span {
      font-size: 30px;
      color: var(--red-color);
    }
  }
  .bookmark__container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .modal__content-desc {
  }
  .modal__content-change {
  }
  .modal__image {
    display: flex;
    justify-content: center;
  }
  .modal__showdetail {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &-button {
      padding: 5px 20px;
      background: var(--pink-color);
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
      border: none;
      border-radius: 20px;
    }
  }
`;
