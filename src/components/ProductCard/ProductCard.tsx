import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addItems } from "../../redux/features/Cart/cartSlice";
import type { CartPayload } from "../../redux/features/Cart/cartSlice";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Row, Col, Input } from "antd";
import { ProductCartItems } from "../../interfaces/interface";
interface ProductCardProps {
  item: ProductCartItems;
}
const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { id, title, category, price, img } = item;
  const [modalPrice, setModalPrice] = useState<number>(price);
  const [modalAmount, setModalAmount] = useState<number>(1);
  // function
  const increaseProduct = () => {
    setModalAmount((prev) => (prev += 1));
  };
  const descreaseProduct = () => {
    if (modalAmount > 1) {
      setModalAmount((prev) => (prev -= 1));
    } else if (modalAmount === 1) {
      return;
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const modalResult: CartPayload = {
      title: title,
      img: img,
      totalPrice: modalPrice,
      price: price,
      amount: modalAmount,
      category: category,
      id: id,
    };
    dispatch(addItems(modalResult));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // useEffect
  useEffect(() => {
    setModalPrice(modalAmount * price);
  }, [modalAmount]);
  return (
    <>
      <S.ModalContainer
        closable={true}
        title={category.toUpperCase()}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        width="1000px"
        okText="Add To Cart"
      >
        <Row gutter={10}>
          <Col span={12}>
            <div className="modal__content">
              <h2 className="modal__content-title">{title}</h2>
              <h2 className="modal__content-price">
                Price: <span>${modalPrice}</span>
              </h2>
              <p className="modal__content-desc">
                Promotion Terms and Conditions: - Application period: From
                September 19, 2022 until further notice - Apply for dine-in,
                takeaway, and delivery - Additional delivery fee of 25,000VND
                for orders of 100,000VND or more when ordering via Hotline
                19006066 or Website www.thepizzacompany.vn
              </p>
            </div>
            <Space className="modal__content-change">
              <PlusCircleOutlined onClick={increaseProduct} />
              <Input
                style={{ width: "100px" }}
                value={modalAmount}
                onChange={(e) => setModalAmount(Number(e.target.value))}
                type="number"
                defaultValue={1}
              />
              <MinusCircleOutlined onClick={descreaseProduct} />
            </Space>
          </Col>
          <Col span={12}>
            <div className="modal__image">
              <img src={img} alt="" />
            </div>
          </Col>
        </Row>
      </S.ModalContainer>
      <S.ProductCard>
        <div onClick={() => setIsModalOpen(true)} className="product__img">
          <img src={img} referrerPolicy="no-referrer" alt="" />
        </div>

        <h2 onClick={() => setIsModalOpen(true)} className="product__title">
          {title}
        </h2>

        <div className="product__action">
          <h2>
            Price: <span className="product__price">${price}</span>
          </h2>
          <Button onClick={showModal} className="addtocart__btn">
            Get Your Food !!!
          </Button>
        </div>
      </S.ProductCard>
    </>
  );
};

export default ProductCard;
