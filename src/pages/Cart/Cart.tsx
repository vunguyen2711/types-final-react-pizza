import React, { useState, useEffect } from "react";
import Helmet from "../../layouts/Helmet/Helmet";
import CommonSection from "../../components/CommonSection/CommonSection";
import { Table, Button, Space, Modal } from "antd";
import * as S from "./style";
import { RoutesPath } from "../../constants/routes.path";
import {
  getCartItems,
  deleteItem,
  deleteItemsById,
} from "../../redux/features/Cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Avatar from "antd/lib/avatar/avatar";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../redux/features/Login&Register/login&registerSlice";
interface DeleteSelected {
  canDelete: boolean;
  deleteArr: [];
}
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartItems, totalAmount, totalPriceItems } =
    useAppSelector(getCartItems);
  const { isLogin } = useAppSelector(getUserInfo);
  const [deleteSelected, setDeleteSelected] = useState<DeleteSelected>({
    canDelete: false,
    deleteArr: [],
  });

  const dataSource = cartItems.map((item, index) => {
    return {
      key: item.id,
      img: <Avatar src={item.img} />,
      title: item.title,
      totalPrice: item.totalPrice,
      amount: item.amount,
      action: (
        <DeleteOutlined onClick={() => dispatch(deleteItem({ id: item.id }))} />
      ),
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
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const rowSelection = {
    onSelectNone: () => {
      setDeleteSelected((prev) => {
        return {
          ...prev,
          canDelete: false,
        };
      });
    },
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      selectedRowKeys.length !== 0
        ? setDeleteSelected((prev) => {
            return {
              ...prev,
              canDelete: true,
            };
          })
        : setDeleteSelected((prev) => {
            return {
              ...prev,
              canDelete: false,
            };
          });
      setDeleteSelected((prev: any) => {
        return {
          ...prev,
          deleteArr: selectedRowKeys,
        };
      });
    },
  };
  const handleCheckout = () => {
    if (isLogin) {
      navigate(RoutesPath.CHECKOUT);
    } else {
      Modal.confirm({
        content: "You need an account to make an order !!!",
        cancelText: "Cancel",
        okText: "Go To Register Page !!!",
        onOk: () => {
          navigate(RoutesPath.REGISTER);
        },
      });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet title="Your Cart" />
      <CommonSection title="Your Cart" />

      {cartItems.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>Your cart is empty</h2>
      ) : (
        <S.CartContainer>
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              position: ["bottomCenter"],
              defaultCurrent: 1,
              defaultPageSize: 5,
              pageSize: 5,
              total: dataSource.length,
              responsive: true,
            }}
          />
          <Space className="table__button-container" direction="horizontal">
            {deleteSelected.canDelete && cartItems.length !== 0 && (
              <Button
                className="table__button"
                onClick={() => {
                  dispatch(deleteItemsById(deleteSelected.deleteArr));
                  setDeleteSelected((prev) => {
                    return {
                      ...prev,
                      canDelete: false,
                    };
                  });
                }}
                danger
              >
                Delete Selection
              </Button>
            )}
            <Button
              onClick={handleCheckout}
              type="primary"
              className="table__button"
            >
              Checkout Now!!!
            </Button>
            <Link to={RoutesPath.AllFOODS}>
              <Button className="table__button">Continue Shopping...</Button>
            </Link>
          </Space>
        </S.CartContainer>
      )}
    </>
  );
};

export default Cart;
