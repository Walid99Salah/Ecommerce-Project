import React from "react";
import style from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import Loading from "../Loading/Loading";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import useProducts from "../../Hooks/useProducts";

export default function Home() {
  let { data, isLoading, isFetching, isError } = useProducts();

  return (
    <>
      <MainSlider />
      <CategorySlider />
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center xl:px-10">
          {data.map((product, index) => (
            <RecentProducts key={index} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
