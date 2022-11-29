import React from "react";
import { FetchData } from "../../interfaces/interface";
import { AlsoLikeProps } from "../../interfaces/interface";
import * as S from "./style";

const AlsoLikeProduct: React.FC<AlsoLikeProps> = ({ item }) => {
  return (
    <S.AlsoLikeProductContainer>
      <div className="also__like-img">
        <img src={item.img} alt="" />
      </div>
      <div className="also__like-content">
        <h1 className="also__like_title">{item.title}</h1>
        <h2 className="also__like-price">
          {" "}
          Price: <span>${item.price}</span>
        </h2>
      </div>
    </S.AlsoLikeProductContainer>
  );
};

export default AlsoLikeProduct;
