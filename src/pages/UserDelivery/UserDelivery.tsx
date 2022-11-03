import React, { useEffect, useState } from "react";
import Helmet from "../../layouts/Helmet/Helmet";
import CommonSection from "../../components/CommonSection/CommonSection";
import moment from "moment";
import { Row, Col, Space, Button, Input, Table, Modal } from "antd";
import { DeleteOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  getUserInfo,
  getLoginState,
} from "../../redux/features/Login&Register/login&registerSlice";
import * as S from "./style";
import {
  getOrder,
  getOrderThunk,
  getDetailThunk,
  deleteOrderThunk,
  removeOrderById,
} from "../../redux/features/Orders/OrdersSlice";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "../../constants/routes.path";
const UserSetting = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(getUserInfo);
  const { ordersByUser, statusDelete } = useAppSelector(getOrder);

  const { fullname } = useAppSelector(getUserInfo);
  // function
  const handleDeleteDelivery = (id: number) => {
    Modal.confirm({
      content: "Are you sure to delete this delivery ???",
      okText: "Accept",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(deleteOrderThunk(id));
      },
    });
  };
  //Table
  const dataDeliverySource = ordersByUser.map((data) => {
    return {
      key: data.id,
      date: moment(data.timeInit).format("DD-MM-YYYY"),
      transport: data.deliveryData?.transport,
      action: (
        <Space>
          <Button
            style={{ display: "flex", alignItems: "center" }}
            onClick={() =>
              navigate(`${RoutesPath.USERDELIVERYDETAIL}/${data.id}`)
            }
            icon={<FolderOpenOutlined />}
          >
            View Detail
          </Button>
          <Button
            onClick={() => {
              handleDeleteDelivery(data.id);
            }}
            style={{ display: "flex", alignItems: "center" }}
            icon={<DeleteOutlined />}
          >
            Cancel this bill
          </Button>
        </Space>
      ),
      buyer: data.deliveryData?.name,
    };
  });
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Transport",
      dataIndex: "transport",
      key: "transport",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
    },
  ];

  //UseEffect
  useEffect(() => {
    dispatch(getOrderThunk(id));
  }, []);
  useEffect(() => {
    if (statusDelete === "success") {
      dispatch(getOrderThunk(id));
    }
  }, [statusDelete]);

  return (
    <>
      <Helmet title="User Delivery"></Helmet>
      <CommonSection title={`${fullname}'s Delivery`}></CommonSection>
      <S.UserSettingContainer>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <div className="user__proccessing">
              <h1 className="user__proccessing-title">Delivery Proccessing:</h1>
              <Table
                pagination={{
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  defaultPageSize: 5,
                  pageSize: 5,
                  total: dataDeliverySource.length,
                  responsive: true,
                }}
                dataSource={dataDeliverySource}
                columns={columns}
              />
            </div>
          </Col>
        </Row>
      </S.UserSettingContainer>
    </>
  );
};

export default UserSetting;
