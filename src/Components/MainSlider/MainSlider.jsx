import React from "react";
import style from "./MainSlider.module.css";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return <>
    <div className="flex">
      <div className="w-3/4">
        <Slider {...settings}>
          <img src={slide1} className="w-full h-[400px]" alt="" />
          <img src={slide2} className="w-full h-[400px]" alt="" />
          <img src={slide3} className="w-full h-[400px]" alt="" />
        </Slider>
      </div>
      <div className="w-1/4">
        <img src={slide1} className="w-full h-[200px]" alt="" />
        <img src={slide2} className="w-full h-[200px]" alt="" />
      </div>
    </div>
  </>;
}
