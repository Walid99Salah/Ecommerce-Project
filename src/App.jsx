import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Brands from "./Components/Brands/Brands";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";

let routers = createBrowserRouter([
  { path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "updatepassword", element: <UpdatePassword /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

let query = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={query}>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <ReactQueryDevtools/>
          <Toaster />
        </UserContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default App;