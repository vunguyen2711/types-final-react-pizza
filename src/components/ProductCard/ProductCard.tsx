import React, { useState } from "react";
import * as S from "./style";
import image1 from "../../assets/images/product_01.jpg";

import { Link } from "react-router-dom";
import { RoutesPath } from "../../constants/routes.path";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { ItemProduct } from "../../interfaces/interface";

const ProductCard: React.FC<ItemProduct> = ({
  id,
  title,
  price,
  img,
  category,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        closable={true}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <S.ProductCard>
        <Link to={RoutesPath.FOODDETAIL}>
          <div className="product__img">
            <img src={image1} alt="" />
          </div>
        </Link>
        <Link to={RoutesPath.FOODDETAIL}>
          <h2 className="product__title">Pizza</h2>
        </Link>

        <div className="product__action">
          <h2>
            Price: <span className="product__price">$120</span>
          </h2>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="addtocart__btn"
          >
            Add To Card
          </Button>
        </div>
      </S.ProductCard>
    </>
  );
};

export default ProductCard;
