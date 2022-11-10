import styled from "styled-components";
export const SearchFoodsContainer = styled.section`
  padding-top: 40px;
  //Filter
  .search__filter {
    border: 1px solid #eee;
    padding: 20px;
  }
  .search__filter-input {
    margin-bottom: 20px;
    & input {
      width: 100%;
      padding: 5px 10px;
      border: 1px solid #eee;
    }
  }
  .search__filter-checkbox {
    margin-bottom: 20px;
  }
  .search__filter-range {
    margin-bottom: 20px;
  }
  .search__filter-select {
    margin-bottom: 20px;
  }
  .search__filter-tags {
    padding: 20px;
    width: 100%;
    overflow-y: scroll;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
  }
  .search__filter-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 24px;
      & span {
        color: var(--red-color);
      }
    }
    & button {
      background-color: var(--red-color);
      color: #fff;
      border: none;
      outline: none;
      padding: 5px 20px;
      border-radius: 30px;
      cursor: pointer;
      &:hover {
        transform: translate(-3px, -3px);
      }
    }
  }
  //ShowCase
  .search__showcase {
    border: 1px solid #eee;
    padding: 20px;
  }
  .loadmore__button button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
