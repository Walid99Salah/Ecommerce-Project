import React from "react";
import style from "./Products.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import Loading from "../Loading/Loading";
import useProducts from "../../Hooks/useProducts";

export default function Products() {
  
  
  let {data , isLoading , isFetching , isError} = useProducts()

  return (
    <>
      {isLoading ? <div className="flex justify-center py-16">  <Loading /></div> : <div className="flex flex-wrap justify-center xl:px-10">
          {data.map((product, index) => <RecentProducts key={index} product={product} />)} </div> 
      }
    </>
  );
}
