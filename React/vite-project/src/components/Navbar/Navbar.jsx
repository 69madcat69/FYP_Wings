/* eslint-disable */
import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdFlight } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import Logo from "../assets/logo.png";
import "./Navbar.css";
import Login from "../Sign/Login/Login";
const Navbar = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  return (
    <header className="header">
      <nav>
        <div className="leftNav flex">
          <Link to="/" selected={"/" === path}>
            <a>
              <MdFlight /> Find Flight
            </a>
          </Link>
          <Link to="/SignUp" selected={"/SignUp" === path}>
            <a href="#">
              <FaHotel /> Find Hotel
            </a>
          </Link>
        </div>
        <div className="Logo">
          <img src={Logo}></img>
        </div>
        <div className="rightNav flex">
          <a onClick={handleLoginClick}>Login</a>
          <Link to="/SignUp" selected={"/SignUp" === path}>
            <a className="active">Sign Up</a>
          </Link>
        </div>
      </nav>
      {showLogin && <Login onClose={handleCloseLogin} />}
    </header>
  );
};

export default Navbar;
