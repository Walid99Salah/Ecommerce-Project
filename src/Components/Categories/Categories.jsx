import React from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let {data , isLoading , isFetching , isError} = useQuery({
    queryKey:['category'],
    queryFn:getCategories,
    select:(data)=> data?.data.data
  })
  return (
    <>
    {isLoading ? <div className="flex justify-center items-center py-5"><Loading /></div> :<div className="container">
        <div className="flex flex-wrap justify-center">
          {data?.map((category) => (
            <div className="w-1/6 hover:rounded-xl p-2 hover:border-emerald-500 hover:border-2">
              <div>
                <img
                  src={category.image}
                  className="w-full h-[100px] md:h-[200px]"
                  alt={category.name}
                />
                <h2 className="md:text-2xl text-center text-main">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div> }
      
    </>
  );
}
