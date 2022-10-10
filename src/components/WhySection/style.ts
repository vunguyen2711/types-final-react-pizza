import styled from "styled-components";

export const WhyContainer = styled.section`
  width: 100%;
  margin-top: 40px;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }
  .why__title {
    font-size: 32px;
    span {
      font-size: 32px;
      color: var(--red-color);
    }
  }
  @media screen and (max-width: 1200px) {
    .why__list {
      width: 100%;
    }
    .why__title {
      text-align: center;
    }
  }
`;
