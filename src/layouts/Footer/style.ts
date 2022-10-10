import styled from "styled-components";

export const FooterContainer = styled.section`
  background-color: var(--pink-color);
  .footer__column {
    padding: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    color: var(--black-color);

    .footer__title {
      margin-bottom: 12px;
      font-weight: bold;
      font-size: 18px;
    }
    .footer__subtitle {
    }
    .footer__coppyright {
      margin-top: 20px;
      & img {
        width: 70%;
      }
    }
  }
`;
