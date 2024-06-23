/* eslint-disable */
// duffel_test_1OaZBRT0a0FYvwwuY4ujvvUh21kh9BfeAZ710IoEqE1
// WMViSiFFIXrAillNqjpYP9CnzRtx2aMc
import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import FlightBook from "./components/Flight/FlightBook/FlightBook";
import HotelList from "./components/Hotel/HotelList/HotelList";
import FlightList from "./components/Flight/FlightList/FlightList";
import FlightFind from "./components/Flight/FlightFind/FlightFind";
import HotelFind from "./components/Hotel/HotelFind/HotelFind";
import Login from "./components/Sign/Login/Login";
import SignUp from "./components/Sign/SignUp/SignUp";
import Login2 from "./components/Sign/Login2/Login2";
import { Route, Routes, Navigate } from "react-router-dom";
import Error from "./functions/ErrorPage/Error";
import HotelBook from "./components/Hotel/HotelBook/HotelBook";
import Amadeus from "./components/Flight/FlightFind/Amadeus";
import Profile from "./components/Sign/Profile/Profile";
// import { AuthContext } from "./functions/Authprovider/authprovider";
const App = () => {
  // const { isAuthenticated } = useContext(AuthContext); // Get authentication status from context

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<FlightBook />} />
        <Route path="/HotelBook" element={<HotelBook />} />
        <Route path="/FlightList" element={<FlightList />} />
        <Route path="/HotelList" element={<HotelList />} />
        {/* <Route path="/FlightFind" element={<FlightFind />} /> */}
        <Route path="/HotelFind" element={<HotelFind />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login2 />} />
        <Route path="/Profile" element={<Profile />} />

        <Route path="/*" element={<Error />} />
        <Route path="/killme" element={<Amadeus />} />
        <Route
          path="/FlightFind/:originCity/:travelCity/:departDate/:arrivalDate"
          element={<FlightFind />}
        />
        <Route
          path="/HotelFind/:travelCity/:checkInDate/:checkOutDate"
          element={<HotelFind />}
        />
      </Routes>
    </>
  );
};

export default App;
