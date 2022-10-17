import React, { useState, useEffect } from "react";
import Helmet from "../../layouts/Helmet/Helmet";
import CommonSection from "../../components/CommonSection/CommonSection";
import { Table, Button, Space } from "antd";
import * as S from "./style";
import {
  getCartItems,
  deleteItem,
  deleteItemsById,
} from "../../redux/features/Cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Avatar from "antd/lib/avatar/avatar";
import { DeleteOutlined } from "@ant-design/icons";
interface DeleteSelected {
  canDelete: boolean;
  deleteArr: [];
}
const Cart = () => {
  const dispatch = useAppDispatch();
  const { cartItems, totalAmount, totalPriceItems } =
    useAppSelector(getCartItems);
  const [deleteSelected, setDeleteSelected] = useState<DeleteSelected>({
    canDelete: false,
    deleteArr: [],
  });
  console.log(deleteSelected);
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet title="Your Cart" />
      <CommonSection title="Your Cart" />
      <S.CartContainer>
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
        />
        {deleteSelected.canDelete && cartItems.length !== 0 && (
          <Space>
            <Button
              onClick={() =>
                dispatch(deleteItemsById(deleteSelected.deleteArr))
              }
              className="table__delete-btn"
              danger
            >
              Delete Selection
            </Button>
          </Space>
        )}
      </S.CartContainer>
    </>
  );
};

export default Cart;
