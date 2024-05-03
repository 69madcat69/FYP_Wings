/*eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import "./Login.css";
import { IoMdClose } from "react-icons/io";

const Login = () => {
  const handleLogin = () => {
    console.log("login");
  };

  return (
    <div className="Login">
      <div className="container">
        <div className="form flex">
          <form>
            <h1>Login </h1>
            <button className="close">
              <IoMdClose className="icon" />
            </button>
            <label>Email</label>
            <input type="text" placeholder="john.doe@gmail.com" />
            <label>Password</label>
            <input type="password" placeholder="*********" />
            <div className="Login-button">
              <button onClick={handleLogin}>Login</button>
            </div>
          </form>
        </div>
        <div className="Sign-forward">
          Don't have an account?{" "}
          <a href="#" className="btn">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
