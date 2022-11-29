import styled from "styled-components";
import { moveLeftIn, moveRightIn } from "../../components/HeroSection/style";
export const CheckoutContainer = styled.section`
  padding-top: 40px;
  padding-bottom: 40px;
  height: 100%;
  .checkout__form-container,
  .checkout__bill-container,
  .checkout__total-container {
    padding: 20px;
    border-radius: 20px;
    border: 2px solid var(--red-color);
  }
  .checkout__total-title,
  .checkout__form-title,
  .checkout__bill-title h1 {
    font-size: 32px;
    color: var(--red-color);
  }
  .checkout__form- {
    width: 100%;
  }
  .checkout__form-control {
    width: 100%;
  }
  .checkout__form-label {
    font-size: 18px;
    font-weight: bold;
    & span {
      font-weight: normal;
      color: var(--red-color);
    }
  }
  .checkout__form-input {
    width: 100%;
    padding: 5px;
    border: 1px solid #333;
  }
  .checkout__form-error {
    font-size: 14px;
    color: var(--red-color);
  }
  .checkout__bill-container {
    height: 100%;
  }
  .checkout__bill-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .checkout__bill-list {
    width: 100%;
    max-height: 150px;
    overflow-y: scroll;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(0, 0, 0, 0.2);
  }
  .checkout__payment-container {
  }
  .checkout__payment-title {
    font-size: 24px;
    color: var(--red-color);
  }
  .checkout__payment-option {
    width: 100%;
    margin: 10px 0;
  }
  .checkout__payment-img {
    margin: 0 10px;
  }
  .checkout__total-container {
    text-align: right;
  }
  .checkout__total-food,
  .checkout__total-payment,
  .checkout__total-vat {
    font-size: 18px;
  }

  .checkout__total-title {
  }
`;
