import React from "react";
import { CommonProps } from "../../interfaces/interface";
import * as S from "./style";
const CommonSection: React.FC<CommonProps> = ({ title }) => {
  return (
    <S.CommonSectionContainer>
      {" "}
      <h1 className="common__name">{title}</h1>{" "}
    </S.CommonSectionContainer>
  );
};

export default CommonSection;
