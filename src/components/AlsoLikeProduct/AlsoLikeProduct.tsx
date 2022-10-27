import React from "react";
import { FetchData } from "../../interfaces/interface";
import type { CartPayload } from "../../redux/features/Cart/cartSlice";
import * as S from "./style";
interface AlsoLikeProps {
  item: FetchData;
}
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
