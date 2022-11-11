import styled from "styled-components";
import { moveLeftIn, moveRightIn } from "../../components/HeroSection/style";

export const ContactContainer = styled.section`
  width: 100%;
  padding-top: 40px;
  .contact__title {
    font-size: 40px;
    margin: 0;
    text-align: center;
    color: var(--black-color);
  }
  .contact__phone,
  .contact__support {
    width: 100%;
    min-height: 200px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    background-color: #eee;
    transition: all 0.5s;
    padding: 20px;
    border-radius: 20px;
    &:hover {
      transform: translate(-5px, -5px);
      cursor: pointer;
    }
  }
  .contact__phone {
    animation: ${moveLeftIn} 2s ease;
    &-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
    }
  }
  .contact__support {
    animation: ${moveRightIn} 2s ease;
    &-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
  .contact__support-text,
  .contact__phone-text {
    p {
      text-align: center;
    }
  }
  .contact__map {
    padding: 30px 20px;
    height: 300px;
    background: #eee;

    &-title {
      font-size: 18px;
      color: var(--red-color);
    }
  }
  .contact__phone-detail {
    width: 100%;
  }
  .contact__detail-country {
    text-align: center;
    font-size: 24px;
  }
  .contact__card {
    width: 100%;
    min-height: 200px;
  }
  .contact__form-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: var(--pink-color);
    border-radius: 20px;
    padding: 20px 40px;
    margin-bottom: 40px;
    gap: 20px;
  }
  .contact__form {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    &-control {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 3fr;
      align-items: center;
      & input {
        border: 1px solid #cecece;
        padding: 3px 5px;
      }
      & textarea {
        border: 1px solid #cecece;
        padding: 3px 5px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .contact__title {
      font-size: 24px;
    }
    .contact__detail-country {
      font-size: 18px;
    }
    .contact__form-container {
      padding: 20px 20px;
    }
    .contact__form-control {
      display: block;
      & input {
        width: 100%;
      }
      & textarea {
        width: 100%;
      }
    }
  }
`;
