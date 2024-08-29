import React, { useContext } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { UserContext } from "../../Context/UserContext";

export default function Layout() {
  let {userData} = useContext(UserContext)
  return <>
      <Navbar />
      <div className="container py-14 px-3">
        <Outlet></Outlet>
      </div>
      {userData && <Footer/>}
    </>
}
