import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Routers from "../routers/Routers";
const Layouts = () => {
  return (
    <div>
      <Header />
      <div className="router__container">
        <Routers />
      </div>

      <Footer />
    </div>
  );
};

export default Layouts;
