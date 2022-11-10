import React, { useEffect, useState } from "react";
import Helmet from "../../layouts/Helmet/Helmet";
import CommonSection from "../../components/CommonSection/CommonSection";
import { Row, Col, Space, Input, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Comment from "../../components/Comment/Comment";
import * as S from "./style";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { URL_DATA } from "../../constants/urlData";
import {
  changeAmountByInput,
  increaseAmount,
  descreaseAmount,
  getCartItems,
  addItems,
  CartPayload,
} from "../../redux/features/Cart/cartSlice";
import {
  fetchSearchFoods,
  getFetchedFoods,
  ParamsFetchFoods,
} from "../../redux/features/LoadFood/loadFoodSlice";
import { RoutesPath } from "../../constants/routes.path";
import type { FetchData } from "../../interfaces/interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlsoLikeProduct from "../../components/AlsoLikeProduct/AlsoLikeProduct";
const FoodDetail: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { foods } = useAppSelector(getFetchedFoods);

  const { id } = useParams();
  console.log(id);
  const filterFourFoods = foods
    .filter((food) => food.id !== Number(id))
    .slice(0, 4);

  const [foodIdDetail, setFoodIdDetail] = useState<CartPayload>();

  useEffect(() => {
    const fetchFoodById = async (id: string | undefined) => {
      try {
        const response = await axios.get(`${URL_DATA.PRODUCTS}/${id}`);

        setFoodIdDetail(response.data);
        dispatch(
          fetchSearchFoods({
            limit: 5,
            category: response.data.category,
          })
        );
      } catch (errors) {
        console.log(errors);
      }
    };
    fetchFoodById(id);
  }, [id]);
  const handleAddToCart = () => {
    if (foodIdDetail) {
      dispatch(
        addItems({
          ...foodIdDetail,
          totalPrice: foodIdDetail.price,
          amount: 1,
        })
      );
    }
  };
  return (
    <>
      <Helmet title="Food Details"></Helmet>
      <CommonSection title="Food Details"></CommonSection>
      <S.FoodDetailContainer>
        <Row gutter={16}>
          <Col span={12}>
            <div className="food__details-img">
              <img src={foodIdDetail?.img} alt="" />
            </div>
          </Col>
          <Col span={12}>
            <div className="food__details-content">
              <h2 className="food__details-title">{foodIdDetail?.title}</h2>
              <h3 className="food__details-price">
                Price:<span> ${foodIdDetail?.price}</span>
              </h3>
              <h2 className="food__details-desc">Description :</h2>
              <p className="food__details-para">
                Promotion Terms and Conditions: - Application period: From
                September 19, 2022 until further notice - Apply for dine-in,
                takeaway, and delivery - Additional delivery fee of 25,000VND
                for orders of 100,000VND or more when ordering via Hotline
                19006066 or Website www.thepizzacompany.vn
              </p>

              <Space className="fooddetails__button">
                <Button onClick={() => handleAddToCart()}>Add to cart</Button>
                <Button onClick={() => navigate(-1)} danger>
                  Exit
                </Button>
              </Space>
            </div>
          </Col>
          <Col span={24}>
            <Comment productID={id}></Comment>
          </Col>
          <Col span={24}>
            <h1 className="food__alsolike-title">Peopel Also Like :</h1>
          </Col>
          {filterFourFoods.map((item) => (
            <Col key={item.id} lg={6} xs={12}>
              <Link to={`/foods/${item.id}`}>
                <AlsoLikeProduct item={item}></AlsoLikeProduct>
              </Link>
            </Col>
          ))}
        </Row>
      </S.FoodDetailContainer>
    </>
  );
};

export default FoodDetail;
