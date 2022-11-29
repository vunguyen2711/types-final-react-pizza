import React, { useEffect, useState } from "react";
import { Avatar, Input, Divider, Modal } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  CartPayload,
  increaseAmount,
  descreaseAmount,
  changeAmountByInput,
  deleteItem,
} from "../../redux/features/Cart/cartSlice";
import { useAppDispatch } from "../../redux/hook";
interface DrawerListProps {
  item: CartPayload;
}
const DrawerList = ({ item }: DrawerListProps) => {
  const [amountDrawer, setAmountDrawer] = useState<string>(
    item.amount.toString()
  );

  const dispatch = useAppDispatch();

  // function
  const handleIncreseAmount = () => {
    setAmountDrawer((prev) => (Number(prev) + 1).toString());
    dispatch(increaseAmount({ id: item.id }));
  };
  const handleDescreseAmount = () => {
    setAmountDrawer((prev) => (Number(prev) - 1).toString());
    dispatch(descreaseAmount({ id: item.id }));
  };
  const hanldeChangeAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountDrawer(e.target.value);
    dispatch(
      changeAmountByInput({ id: item.id, amount: Number(e.target.value) })
    );
  };
  useEffect(() => {
    if (Number(amountDrawer) < 1) {
      Modal.error({
        content: "Amount of food must be greater than 1",
      });
      dispatch(increaseAmount({ id: item.id }));
    }
  }, [amountDrawer]);
  useEffect(() => {
    setAmountDrawer(item.amount.toString());
  }, [item.amount]);
  return (
    <>
      <div className="drawer__list">
        <div>
          <Avatar size="large" src={item.img} />
        </div>

        <h5 className="drawer__title">
          {item.title} X {item.amount}
        </h5>
        <h5 className="drawer__price">
          Price: <span>${item.totalPrice}</span>
        </h5>

        <div className="drawer__list-bottom">
          <div className="drawer-list-input">
            <PlusCircleOutlined
              onClick={() => handleIncreseAmount()}
            ></PlusCircleOutlined>
            <Input
              onChange={(e) => hanldeChangeAmountInput(e)}
              value={amountDrawer}
              style={{ width: "100px" }}
              defaultValue={amountDrawer}
              type="number"
            ></Input>
            <MinusCircleOutlined
              onClick={() => handleDescreseAmount()}
            ></MinusCircleOutlined>
          </div>
          <div>
            <DeleteOutlined
              className="drawer__list-delete"
              onClick={() => dispatch(deleteItem({ id: item.id }))}
            />
          </div>
        </div>

        <Divider />
      </div>
    </>
  );
};

export default DrawerList;
