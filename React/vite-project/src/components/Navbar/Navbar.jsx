/* eslint-disable */
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdFlight } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import Logo from "../assets/logo.png";
import "./Navbar.css";
import Login from "../Sign/Login/Login";
import AuthContext from "../../functions/Authprovider/authprovider";
const Navbar = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const { user, logoutUser } = useContext(AuthContext);

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
          <Link to="/HotelBook" selected={"/HotelBook" === path}>
            <a>
              <FaHotel /> Find Hotel
            </a>
          </Link>
        </div>
        <div className="Logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="rightNav flex">
          {user ? (
            <>
              <Link to="/Profile" selected={"/Profile" === path}>
                <a>Profile</a>
              </Link>
              <a className="active" onClick={logoutUser}>
                Logout
              </a>
            </>
          ) : (
            <>
              <a onClick={handleLoginClick}>Login</a>
              <Link to="/SignUp" selected={"/SignUp" === path}>
                <a className="active">Sign Up</a>
              </Link>
            </>
          )}
        </div>
      </nav>
      {showLogin && <Login onClose={handleCloseLogin} />}
    </header>
  );
};

export default Navbar;
