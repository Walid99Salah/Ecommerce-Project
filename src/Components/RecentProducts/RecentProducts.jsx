import React, { useContext } from "react";
import style from "./RecentProducts.module.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function RecentProducts({ product }) {
  let {addToCart} =  useContext(CartContext);
  
  return (
    <>
      <div className="w-1/6 product px-2 py-4">
        <div>
          <Link to={`productdetails/${product.id}/${product.category.name}`}>
            <img src={product.imageCover} loading="lazy" className="w-full" alt={product.title}/>
            <h2 className="text-main text-sm md:text-base">{product.category.name}</h2>
            <h2 className="font-medium text-xs md:text-base">{product.title.split(" ").slice(0, 2).join(" ")}</h2>
            <div className="flex justify-between my-2">
              <h3 className="text-xs md:text-base">{product.price} EGP</h3>
              <h3 className="text-xs md:text-base"> <i className="fas fa-star rating-color"></i> {product.ratingsAverage}</h3>
            </div>
          </Link>
          <button onClick={()=> addToCart(product.id)} className="btn w-full bg-main text-xs md:text-base text-white rounded py-1">Add to Cart</button>
        </div>
      </div>
    </>
  );
}
