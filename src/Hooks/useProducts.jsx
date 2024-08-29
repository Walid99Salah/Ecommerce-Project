import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let response = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    // staleTime: 60000
    // gcTime:3000
    refetchOnMount: false,
    // refetchOnWindowFocus:false,
    // refetchOnReconnect:false,
    select: (data) => data?.data.data,
    // retry:3,
    // retryDelay:1000
    // refetchInterval: 1000,
  });

  return response;
}
