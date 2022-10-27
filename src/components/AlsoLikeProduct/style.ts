import styled from "styled-components";
export const AlsoLikeProductContainer = styled.div`
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  cursor: pointer;
  & .also__like-img {
    width: 100%;

    &:hover img {
      transform: rotate(5deg);
      transition: all 0.5s linear;
    }
    & img {
      width: 100%;
      object-position: center;
      object-fit: cover;
    }
  }
  & .also__like-content {
    & .also__like_title {
      color: var(--red-color);
      font-size: 18px;
    }
    & .also__like-price {
      font-size: 16px;
      & span {
        color: var(--red-color);
      }
    }
  }
`;
