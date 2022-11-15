import React, { useEffect, useState } from "react";
import { message } from "antd";
import { BookOutlined, StarFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  changeFavoriteById,
  getFavoriteProducts,
  getFavoriteState,
  toggleFavoriteId,
} from "../../redux/features/FavoriteProDucts/FavoriteProductsSlice";
import * as S from "./style";
import type { BookMarkProps } from "../../interfaces/interface";
const BookMark: React.FC<BookMarkProps> = ({ idItem }) => {
  const dispatch = useAppDispatch();
  const favoriteIds =
    useAppSelector(getFavoriteState).getByIdState.favoriteData.favoriteIds;
  const userId = useAppSelector(getFavoriteState).getByIdState.favoriteData.id;
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    const existedIdInFavorite = favoriteIds.find((item) => item === idItem);
    if (existedIdInFavorite) {
      return true;
    } else {
      return false;
    }
  });

  const handleToggleFavoriteProducts = () => {
    dispatch(toggleFavoriteId(Number(idItem)));
  };
  useEffect(() => {
    const existedIdInFavorite = favoriteIds.find((item) => item === idItem);
    if (existedIdInFavorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
    dispatch(
      changeFavoriteById({
        id: userId,
        favoriteIds,
      })
    );
    // dispatch(getFavoriteProducts(favoriteIds));
  }, [favoriteIds]);
  if (isFavorite)
    return (
      <S.BookMarkConTent isFavorite>
        <StarFilled
          className="star__icon"
          onClick={() => handleToggleFavoriteProducts()}
        />{" "}
        <h1>Favorite</h1>{" "}
      </S.BookMarkConTent>
    );
  return (
    <S.BookMarkConTent isFavorite>
      <BookOutlined
        onClick={() => handleToggleFavoriteProducts()}
      ></BookOutlined>{" "}
      <h1>Unfavorite</h1>
    </S.BookMarkConTent>
  );
};

export default BookMark;
