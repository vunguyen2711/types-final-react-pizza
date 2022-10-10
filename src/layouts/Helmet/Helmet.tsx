import React, { ReactNode } from "react";
import { HelmetProps } from "../../interfaces/interface";
const Helmet: React.FC<HelmetProps> = ({ title }) => {
  document.title = "Food Ordering Apps - " + title;
  return <></>;
};

export default Helmet;
