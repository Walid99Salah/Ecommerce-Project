import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let navigate = useNavigate();
  let { cartItems } = useContext(CartContext);
  let { userData, setUserData } = useContext(UserContext);
  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-gray-200 p-3 z-20 md:px-4 capitalize text-center md:fixed inset-x-0 top-0 text-slate-500">
        <div className="container items-center flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row items-center space-x-3">
            <img src={logo} width={120} alt="logo" />
            {userData && (
              <ul className="flex flex-col md:flex-row space-x-2">
                <li>
                  <NavLink to=""> Home</NavLink>
                </li>
                <li>
                  <NavLink to="products">products</NavLink>
                </li>
                <li>
                  <NavLink to="categories">categories</NavLink>
                </li>
                <li>
                  <NavLink to="brands">brands</NavLink>
                </li>
              </ul>
            )}
          </div>

          <div>
            <ul className="flex flex-col md:flex-row space-x-2 items-center">
              <li className="space-x-2 text-black">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-linkedin-in"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-youtube"></i>
              </li>

              {userData ? (
                <>
                  <li onClick={() => logOut()} className="mx-2 cursor-pointer">
                    Logout
                  </li>
                  <li className="mx-2">
                    <NavLink className="text-gray-500 relative" to="/cart">
                      <i className="fa-solid text-green-600 fa-cart-shopping fa-2xl"></i>
                      <span className="text-white absolute top-[-9px] left-[12px]">
                        {cartItems?.numOfCartItems}
                      </span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="mx-2">
                    <NavLink className="text-gray-500" to="register">
                      register
                    </NavLink>
                  </li>
                  <li className="mx-2">
                    <NavLink className="text-gray-500" to="login">
                      login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
