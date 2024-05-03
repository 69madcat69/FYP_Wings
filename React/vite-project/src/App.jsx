/* eslint-disable */
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import FlightBook from "./components/Flight/FlightBook/FlightBook";
import FlightList from "./components/Flight/FlightList/FlightList";
import FlightFind from "./components/Flight/FlightFind/FlightFind";
import Login from "./components/Sign/Login/Login";
import SignUp from "./components/Sign/SignUp/SignUp";
import Login2 from "./components/Sign/Login2/Login2";
import { Route, Routes } from "react-router-dom";
import { FlightProvider } from "./functions/FlightProvider/FlightProvider";
import Error from "./functions/ErrorPage/Error";

const App = () => {
  return (
    <FlightProvider>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" Component={FlightBook} />
          <Route path="/FlightList" Component={FlightList} />
          <Route path="/FlightFind" Component={FlightFind} />
          <Route path="/SignUp" Component={SignUp} />
          <Route path="/Login" Component={Login2} />
          <Route path="/*" Component={Error} />
        </Routes>
      </>
    </FlightProvider>
  );
};

export default App;
