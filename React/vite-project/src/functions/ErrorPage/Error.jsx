/*eslint-disable */
import React from "react";
import "./Error.css";
import ErrorImg from "../../components/assets/Lost.jpg";
const Error = () => {
  return (
    <div className="error">
      <div className="Main-Page">
        <h1> Are you Lost?</h1>
        <div className="Return-button">
          <button>Return Home</button>
        </div>
      </div>
    </div>
  );
};

export default Error;
