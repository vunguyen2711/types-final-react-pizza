import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Popover,
  Space,
  Divider,
  Button,
  List,
  Spin,
} from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import * as S from "./style";
import {
  changeFavoriteById,
  getFavoriteProducts,
  getFavoriteState,
  toggleFavoriteId,
} from "../../redux/features/FavoriteProDucts/FavoriteProductsSlice";
import { Link } from "react-router-dom";
import { RoutesPath } from "../../constants/routes.path";
import { getUserInfo } from "../../redux/features/Login&Register/login&registerSlice";
import { getCartItems } from "../../redux/features/Cart/cartSlice";
const FavoriteBadge: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpenDrawer } = useAppSelector(getCartItems);
  const getFavoriteStatus =
    useAppSelector(getFavoriteState).getByIdState.status;
  const favoriteIds =
    useAppSelector(getFavoriteState).getByIdState.favoriteData.favoriteIds;
  const favoriteProducts =
    useAppSelector(getFavoriteState).getByIdState.favoriteData.favoriteProducts;
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { isLogin, id } = useAppSelector(getUserInfo);
  const popoverTitle = <span>My Favorite Foods</span>;
  const popoverContent = !isLogin ? (
    <h2>Please login to access favorite</h2>
  ) : favoriteIds?.length !== 0 ? (
    getFavoriteStatus !== "success" ? (
      <Spin style={{ margin: "0 auto" }}></Spin>
    ) : (
      <Space direction="vertical">
        {favoriteProducts?.map((item) => (
          <List
            className="favorite__items"
            key={item.id}
            style={{ width: "100%" }}
          >
            <List.Item>
              <Space align="center">
                <Link
                  onClick={() => setIsPopupOpen(false)}
                  to={`${RoutesPath.FOODDETAIL}/${item.id}`}
                >
                  <Avatar src={item.img}></Avatar>
                  <h2>{item.title}</h2>
                </Link>
              </Space>

              <Button
                onClick={() => {
                  dispatch(toggleFavoriteId(item.id));
                  let filterFavoriteIds = [...favoriteIds];
                  filterFavoriteIds = filterFavoriteIds.filter(
                    (id) => id !== item.id
                  );
                  dispatch(
                    changeFavoriteById({
                      id: id,
                      favoriteIds: [...filterFavoriteIds],
                    })
                  );
                }}
              >
                Delete
              </Button>
            </List.Item>
          </List>
        ))}
      </Space>
    )
  ) : (
    <h2>Your favorite is empty</h2>
  );
  useEffect(() => {
    if (isPopupOpen && favoriteIds?.length !== 0) {
      dispatch(getFavoriteProducts(favoriteIds));
    }
  }, [isPopupOpen, favoriteIds]);
  useEffect(() => {
    if (isOpenDrawer) {
      setIsPopupOpen(false);
    }
  }, [isOpenDrawer]);
  return (
    <S.FavoriteBadge>
      <Popover
        style={{ width: "100%" }}
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
