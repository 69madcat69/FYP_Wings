/* eslint-disable */
import React, { useState } from "react";
import "./IncDec.css";
const IncDec = ({ minValue = 1, maxValue = 100 }) => {
  const [count, setCount] = useState(minValue);
  const Increment = () => {
    if (count < maxValue) {
      setCount((count) => count + 1);
    }
  };
  const Decrement = () => {
    if (count > minValue) {
      setCount((count) => count - 1);
    }
  };
  return (
    <div className="btn-group">
      <button className="decrement-btn">
        <span className="material-symbols-outlined" onClick={Decrement}>
          remove
        </span>
      </button>
      <p>{count}</p>
      <button className="increment-btn">
        <span className="material-symbols-outlined" onClick={Increment}>
          add
        </span>
      </button>
    </div>
  );
};

export default IncDec;
