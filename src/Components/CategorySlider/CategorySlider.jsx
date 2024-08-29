import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  async function getRecentCategories() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecentCategories();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <>
      <Slider {...settings}>
        {categories?.map((category, index) =>
          <div key={index} className="my-6">
            <img  loading="lazy" src={category.image} className="w-full h-[200px]" alt="category"/>
            <h3 className="text-xs md:text-base">{category.name}</h3>
          </div>
        )}
      </Slider>
    </>
  );
}
