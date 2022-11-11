import styled from "styled-components";

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
    &:hover {
      transform: translate(-5px, -5px);
      cursor: pointer;
    }
  }
  .contact__phone {
    &-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
    }
  }
  .contact__support {
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
  @media screen and (max-width: 768px) {
    .contact__title {
      font-size: 24px;
    }
    .contact__detail-country {
      font-size: 18px;
    }
  }
`;
