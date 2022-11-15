import React, { useState } from "react";
import { Avatar, Badge, Popover, Space, Divider } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import * as S from "./style";
import { getFavoriteState } from "../../redux/features/FavoriteProDucts/FavoriteProductsSlice";
import { Link } from "react-router-dom";
import { RoutesPath } from "../../constants/routes.path";
const FavoriteBadge: React.FC = () => {
  const favoriteIds =
    useAppSelector(getFavoriteState).getByIdState.favoriteData.favoriteIds;
  const favoriteProducts =
    useAppSelector(getFavoriteState).getByIdState.favoriteData.favoriteProducts;
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);

  const popoverTitle = <span>My Favorite Foods</span>;
  const popoverContent = (
    <Space direction="vertical">
      {favoriteProducts?.map((item) => (
        <Link
          onClick={() => setIsPopupOpen(false)}
          to={`${RoutesPath.FOODDETAIL}/${item.id}`}
        >
          <Space className="favorite__items">
            <Avatar src={item.img}></Avatar>
            <h2>{item.title}</h2>
          </Space>
        </Link>
      ))}
    </Space>
  );
  return (
    <S.FavoriteBadge>
      <Popover
        placement="bottom"
        title={popoverTitle}
        content={popoverContent}
        open={isPopupOpen}
      >
        <Badge count={favoriteIds?.length}>
          <HeartOutlined
            onClick={() => setIsPopupOpen(!isPopupOpen)}
          ></HeartOutlined>
        </Badge>
      </Popover>
    </S.FavoriteBadge>
  );
};

export default FavoriteBadge;
