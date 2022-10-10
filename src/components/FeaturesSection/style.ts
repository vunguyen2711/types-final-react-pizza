import styled from "styled-components";
import { moveRightIn, moveLeftIn } from "../HeroSection/style";
export const FeatureSectionsContainer = styled.div`
  .features__title {
    text-align: center;
    margin: 20px 0;
    h5 {
      color: var(--red-color);
      font-size: 24px;
      margin-bottom: 24px;
      animation: ${moveRightIn} 2s ease;
    }
    h2 {
      font-size: 32px;
      animation: ${moveLeftIn} 2s ease;
    }
    h1 {
      font-size: 40px;
      margin-bottom: 0;
      animation: ${moveRightIn} 2s ease;
    }
    span {
      color: var(--red-color);
    }
    p {
      margin-bottom: 8px;
      margin-top: 16px;
    }
  }
  .features__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 1rem;
    &-img {
      width: 25%;
      margin-bottom: 10px;
      transition: all 0.5s;
      animation: ${moveRightIn} 2s ease;
      &:hover {
        transform: rotate(20deg);
      }
    }
    &-title {
      font-weight: bold;
      font-size: 25px;
    }
    &-desc {
      text-align: center;
      font-size: 1.2rem;
      padding: 0 16px;
    }
  }
`;
