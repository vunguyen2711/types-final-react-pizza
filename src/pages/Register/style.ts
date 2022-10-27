import { Row } from "antd";
import styled from "styled-components";

export const RegisterContainer = styled(Row)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 10px;

  .register__form {
    padding: 30px 25px 25px 25px;
    width: 500px;
    height: fit-content;
    border: 3px dashed var(--red-color);
    border-radius: 40px;
    &-img {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    &-title {
      text-align: center;
      font-size: 44px;
      color: var(--black-color);
      margin-bottom: 50px;
    }
    &-content {
    }
    &-control {
      margin-bottom: 20px;
      & .error__massage {
        color: red;
        padding-left: 8px;
      }
      & input {
        width: 100%;
        font-size: 16px;
        padding: 8px 12px;
        border-radius: 40px;
        border: 1px solid var(--black-color);
      }
      & button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        border-radius: 40px;
        padding: 20px 16px;
        margin-bottom: 20px;

        color: var(--black-color);
        background-color: var(--pink-color);

        &:first-child {
          background-color: var(--red-color);
          color: #fff;
        }
      }
    }
  }
`;
