import React, { useState } from "react";
import { Avatar, Badge, Popover, Space, Divider } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import * as S from "./style";
import { getFavoriteState } from "../../redux/features/FavoriteProDucts/FavoriteProductsSlice";
import { Link } from "react-router-dom";
import { RoutesPath } from "../../constants/routes.path";
import { getUserInfo } from "../../redux/features/Login&Register/login&registerSlice";
import { getCartItems } from "../../redux/features/Cart/cartSlice";
const FavoriteBadge: React.FC = () => {
  const { isOpenDrawer } = useAppSelector(getCartItems);
  const favoriteIds =
    useAppSelector(getFavoriteState).getByIdState.favoriteData.favoriteIds;
  const favoriteProducts =
    useAppSelector(getFavoriteState).getByIdState.favoriteData.favoriteProducts;
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);
  const { isLogin } = useAppSelector(getUserInfo);
  const popoverTitle = <span>My Favorite Foods</span>;
  const popoverContent = !isLogin ? (
    <h2>Please login to access favorite</h2>
  ) : favoriteIds.length !== 0 ? (
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
  ) : (
    <h2>Your favorite is empty</h2>
  );
  return (
    <S.FavoriteBadge>
      <Popover
        placement="bottom"
        title={popoverTitle}
        content={popoverContent}
        open={!isOpenDrawer ? isPopupOpen : false}
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
