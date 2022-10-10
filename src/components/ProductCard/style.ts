import styled from "styled-components";

export const ProductCard = styled.div`
  width: 100%;
  padding: 20px;
  .product__img {
    & img {
      width: 100%;
      object-fit: cover;
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
