import React, { useState } from "react";
import { BookOutlined, StarFilled } from "@ant-design/icons";
import { BookMarkProps } from "../../interfaces/interface";
import * as S from "./style";
const BookMark: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const handleSetIsFavoriteState = () => {
    setIsFavorite((prev) => {
      return !prev;
    });
  };
  if (isFavorite)
    return (
      <S.BookMarkConTent isFavorite>
        <StarFilled
          className="star__icon"
          onClick={() => handleSetIsFavoriteState()}
        />{" "}
        Favorite{" "}
      </S.BookMarkConTent>
    );
  return (
    <S.BookMarkConTent isFavorite>
      <BookOutlined onClick={() => handleSetIsFavoriteState()}></BookOutlined>{" "}
      Unfavorite
    </S.BookMarkConTent>
  );
};

export default BookMark;
