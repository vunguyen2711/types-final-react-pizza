import styled from "styled-components";

export const CommentContainer = styled.div`
  padding-top: 40px;
  .comment__title {
    font-size: 24px;
    font-weight: bold;
    color: var(--black-color);
  }
  .comment__filter {
    width: 100%;
    height: fit-content;
    padding: 30px;
    background-color: var(--pink-color);
    margin-bottom: 16px;
    border-radius: 20px;
    & .filter {
      width: 100%;
    }
    & .filter__average {
      color: var(--red-color);
      font-size: 18px;
      font-weight: bold;
    }
    & .filter__button {
      width: 100%;
    }
  }
  .filter__average {
  }

  .comment__top {
    width: 100%;
    height: fit-content;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 16px;
  }
  .comment__notification {
    & button {
      width: 100%;
      padding: 10px 20px;
      color: black;
      background-color: var(--pink-color);
      border: 1px solid var(--red-color);
      border-radius: 20px;
      cursor: pointer;
      &:hover {
        background-color: var(--red-color);
        color: white;
      }
    }
  }
  .comment__form {
    width: 100%;

    & textarea {
      width: 100%;
      padding: 10px;
    }
  }
  .form__control {
    margin-bottom: 10px;
  }
  .comment__bottom {
    max-height: 50vh;
    overflow-y: scroll;
    & .comment__notification {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--pink-color);
      margin-bottom: 20px;
      & h1 {
        font-size: 24px;
        color: var(--red-color);
        margin: 0;
      }
    }
  }
`;
