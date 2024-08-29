import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [cartItems, setCartItems] = useState();
    async function deleteProductFromCart(productId) {
    try {
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {headers:{
            token : localStorage.getItem("userToken")
        }})
        setCartItems(data)
        return data;
    } catch (err) {
      console.log(err);
    }
  }
    async function checkOutSession(shippingAddress) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems.data._id}?url=http://localhost:5173` , shippingAddress,
        {headers:{
            token : localStorage.getItem("userToken")
        }})
        console.log(data);
        return data;
    } catch (err) {
      console.log(err);
    }
  }
    async function addToCart(productId) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {productId:productId},
        {headers:{
            token : localStorage.getItem("userToken")
        }})
        console.log(data);
        toast.success(data.message , {
            duration: 3000
        })
        setCartItems(data)
    } catch (err) {
      console.log(err);
    }
  }
    async function updateProductCount(productId , count) {
    try {
      let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {count},
        {headers:{
            token : localStorage.getItem("userToken")
        }})
        setCartItems(data)
        return data;
    } catch (err) {
      console.log(err);
    }
  }
    async function getCartItems(productId) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, 
        {headers:{
            token : localStorage.getItem("userToken")
        }})
        setCartItems(data)
        return data;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=> {
    getCartItems()
  } , [])

  return (
    <CartContext.Provider value={{ addToCart , checkOutSession , deleteProductFromCart ,updateProductCount, getCartItems , cartItems , setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}
