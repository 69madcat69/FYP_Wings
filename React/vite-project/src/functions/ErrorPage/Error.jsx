/* eslint-disable */
import React from "react";
import "./Error.css";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };
  return (
    <div className="error">
      <div className="main-page">
        <h1>Are you lost?</h1>
        <div className="return-button">
          <button onClick={handleReturnHome}>Return Home</button>
        </div>
      </div>
    </div>
  );
};

export default Error;
