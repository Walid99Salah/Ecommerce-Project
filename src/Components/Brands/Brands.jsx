import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

export default function Brands() {
  
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["newBrands"],
    queryFn: getBrands,
    select: (data) => data?.data.data,
  });

  return (
    <>
      {isLoading ? <div className="flex justify-center items-center py-5"><Loading /></div>: (
        <div className="container">
          <div className="flex flex-wrap justify-center">
            {data.map((brand) => (
              <div className="w-1/6 hover:rounded-xl p-2 hover:border-emerald-500 hover:border-2">
                <div>
                  <img src={brand.image} className="w-full" alt={brand.name} />
                  <h2 className="md:text-2xl text-center text-main">  {brand.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
