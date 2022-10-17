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
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }
  .search__filter-total {
    h1 {
      font-size: 24px;
      & span {
        color: var(--red-color);
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
