import React, { useEffect, useMemo, useState } from "react";

import Helmet from "../../layouts/Helmet/Helmet";
import CommonSection from "../../components/CommonSection/CommonSection";
import * as S from "./style";
import { Row, Col, Space, Button, Avatar, Table } from "antd";
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOrder,
  getDetailThunk,
  getDetailOrder,
  deleteOrderThunk,
} from "../../redux/features/Orders/OrdersSlice";
import moment from "moment";
import { PostDataOrder } from "../../interfaces/interface";
import { RoutesPath } from "../../constants/routes.path";
const UserDeliveryDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const orderStateSelector = useAppSelector(getDetailOrder);
  const { cartItems, completed, timeInit, totalPrice, deliveryData } =
    orderStateSelector || {};
  const { statusDelete } = useAppSelector(getOrder);
  useEffect(() => {
    dispatch(getDetailThunk(id));
  }, [id]);
  useEffect(() => {
    if (statusDelete === "success") {
      navigate(RoutesPath.USERDELIVERY);
    }
  }, [statusDelete]);
  const dataSource = cartItems?.map((item, index) => {
    return {
      key: item.id,
      img: <Avatar src={item.img} />,
      title: item.title,
      totalPrice: <span>$ {item.totalPrice}</span>,
      amount: item.amount,
    };
  });
  const columns = [
    {
      title: "Img",
      dataIndex: "img",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
  ];
  return (
    <>
      <Helmet title="Delivery Detail"></Helmet>
      <CommonSection
        title={`Delivery At ${moment(timeInit).format("DD-MM-YY")} Detail`}
      ></CommonSection>
      <S.DeliveryDetailContainer>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className="detail__table">
              <h1 className="detail__customer-category">Delivery Products</h1>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  defaultPageSize: 5,
                  pageSize: 5,
                  responsive: true,
                }}
              />
            </div>
          </Col>
          <Col span={24}>
            <Space>
              <Button
                onClick={() => {
                  dispatch(deleteOrderThunk(Number(id)));
                }}
                type="primary"
              >
                Delete this delivery !!!
              </Button>
              <Button onClick={() => navigate(-1)}>Go back</Button>
            </Space>
          </Col>
        </Row>
      </S.DeliveryDetailContainer>
    </>
  );
};

export default UserDeliveryDetail;
