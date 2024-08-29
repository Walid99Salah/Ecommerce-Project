import React, { useContext, useEffect, useState } from "react";
// import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { addToCart, updateProductCount } = useContext(CartContext);

  async function getProductDetails(id) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
      console.log(productDetails);
    } catch (err) {
      console.log(err);
    }
  }
  async function getRelatedProducts(category) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      let allProducts = data.data;
      let related = allProducts.filter(
        (product) => product.category.name == category
      );
      setRelatedProducts(related);
      console.log(relatedProducts);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);

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

  return (
    <>
      <h1 className="text-5xl text-center">Product Details</h1>
      <div className="flex items-center flex-wrap py-8">
        <div className="w-1/4 px-2">
          {/* {productDetails.images > 1 ? <Slider {...settings}>
              {productDetails.images?.map((src, index)=> <img key={index} src={src} className="w-full" />)}
            </Slider> : <img src={productDetails.imageCover} className="w-full" />} */}
            <Slider {...settings}>
              {productDetails.images?.map((src, index)=> <img key={index} src={src} className="w-full" />)}
            </Slider>
        </div>

        <div className="w-3/4">
          <div>
            <h2>{productDetails.title}</h2>
            <p className="my-6 text-gray-500">{productDetails.description}</p>
            <h3>{productDetails.category?.name}</h3>
            <div className="flex justify-between my-2">
              <h3>{productDetails.price} EGP</h3>
              <h3>
                <i className="fas fa-star rating-color"></i>
                {productDetails.ratingsAverage}
              </h3>
            </div>
            <button
              onClick={() => addToCart(productDetails.id)}
              className="btn w-full bg-main text-white rounded py-1"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {relatedProducts.map((product) => (
          <div key={product.id} className="w-1/6 product px-2 py-4">
            <div>
              <Link
                to={`/productdetails/${product.id}/${product.category?.name}`}
              >
                <img
                  src={product.imageCover}
                  className="w-full"
                  alt={product.title}
                />
                <h2 className="text-main text-sm md:text-base">
                  {product.category.name}
                </h2>
                <h2 className="font-medium text-xs md:text-base">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <div className="flex justify-between my-2">
                  <h3 className="text-xs md:text-base">{product.price} EGP</h3>
                  <h3 className="text-xs md:text-base">
                    <i className="fas fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </h3>
                </div>
              </Link>
              <button
                onClick={() => addToCart(product.id)}
                className="btn w-full bg-main text-xs md:text-base text-white rounded py-1"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div> 
      

      {/* <div className="w-4/5 mx-auto">
          <Slider {...settings}>
            {relatedProducts.map((product, index) => (
              <img key={index} src={product.imageCover} className="h-[200px]" alt=""/>
            ))}
          </Slider>
      </div> */}
    </>
  );
}
