import React from "react";
import Slider from "react-slick";
import avar01 from "../../assets/images/ava-1.jpg";
import avar02 from "../../assets/images/ava-2.jpg";
import avar03 from "../../assets/images/ava-3.jpg";
import avar04 from "../../assets/images/ava-4.jpg";
import * as S from "./style";
const settings = {
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipetoslide: true,
};
const sliderData = [
  {
    feedback:
      "Ashley was such an awesome server and the bone in wings plus the combination pizza with a. Little extra red peppers and boom best meal you ever had",
    avar: avar01,
    name: "John Ducky",
  },
  {
    feedback:
      "Ordered a split pizza, half everything and half pepperoni, mushrooms and cheese. The Best Everything Pizza I have ever eaten. Thanks so much Sandy's Pizza.",
    avar: avar02,
    name: "Michale John",
  },
  {
    feedback:
      " We got the back room for a birthday party. Lots of space and seating available. Pizza was delicious as always and the service was great.",
    avar: avar03,
    name: "Angela Thu Thuy",
  },
  {
    feedback:
      " Nobody does pizza better than Sandy's. Hands down Sandy's Pizza is the best pizza in the tristate! The sweet red peppers are to die for!",
    avar: avar04,
    name: "Noo Phuoc Thinh",
  },
];
const SlickSlide = () => {
  return (
    <div>
      <S.SliderContainer {...settings}>
        {sliderData.map((item, index) => (
          <div className="feedback" key={index}>
            <p className="feedback__content">"{item.feedback}".</p>
            <img className="feedback__img" src={item.avar} alt="" />
            <h4 className="feedback__name">{item.name}</h4>
          </div>
        ))}
      </S.SliderContainer>
    </div>
  );
};

export default SlickSlide;
