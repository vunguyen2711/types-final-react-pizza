import styled from "styled-components";
export const AllFoodContainer = styled.section`
  padding-top: 20px;
  .allfoods__search {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    cursor: pointer;
    &:hover .allfoods__search-icon {
      color: var(--red-color);
    }
    &:hover .allfoods__search-text {
      color: var(--red-color);
    }
    .allfoods__search-icon {
      font-size: 24px;
      &:active {
        color: var(--black-color);
      }
    }
    .allfoods__search-text {
      font-size: 24px;
      margin: 0;

      /* &:hover {
        color: var(--red-color);
      } */
    }
  }
  .allfood__combo {
    .allfood__slider {
      height: 100px;
    }
    .allfood__combo--title {
      font-size: 32px;
      font-family: bold;
    }
  }

  .allfood__title {
    font-size: 32px;
    font-family: bold;
  }
  .pizza__filter {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    align-items: center;
    &--button {
      padding: 5px 10px;
      background-color: #fff;
      border: 1px solid var(--red-color);
      border-radius: 30px;
      &:hover {
        background-color: var(--red-color);
        cursor: pointer;
        color: #fff;
      }
      &.is-actived {
        background-color: var(--red-color);
        cursor: pointer;
        color: #fff;
      }
    }
  }
  .loadmore__button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .allfood__category {
    font-size: 20px;
    font-weight: bold;
  }
`;
