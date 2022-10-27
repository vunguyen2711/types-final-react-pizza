import styled from "styled-components";
export const FoodDetailContainer = styled.section`
  .food__details-content {
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    & .food__details-title {
      font-size: 40px;
      color: var(--red-color);
    }
    & .food__details-price {
      font-size: 32px;
      & span {
        color: var(--red-color);
      }
    }
    & .fooddetails__button {
    }
    & .food__details-para {
      font-size: 16px;
    }
  }
  .food__details-img {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover img {
      transform: rotate(5deg);
      transition: all 0.5s;
    }
    & img {
      width: 80%;
      object-position: center;
      object-fit: cover;
    }
  }
  .food__alsolike-title {
    font-size: 24px;
  }
  @media screen and (max-width: 1000px) {
    .food__details-content {
      & .food__details-title {
        font-size: 32px;
        color: var(--red-color);
      }
      & .food__details-price {
        font-size: 24px;
        & span {
          color: var(--red-color);
        }
      }
      & .food__details-desc {
        font-size: 14px;
      }
      & .food__details-para {
        font-size: 10px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .food__details-content {
      & .food__details-title {
        font-size: 24px;
      }
      & .food__details-price {
        font-size: 18px;
      }
    }
  }
`;
