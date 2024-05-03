/* eslint-disable */
import React from "react";
import { MdFlight } from "react-icons/md";
import Logo from "../../assets/BUDGETAIR.png";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { BsDoorClosedFill } from "react-icons/bs";
import { RiWheelchairFill } from "react-icons/ri";
import "./FlightList.css";
const FlightList = () => {
  const handleVisitAgent = () => {
    console.log("Visit Agent button clicked");
  };
  return (
    <body>
      <div className="FlightList">
        <div className="container">
          <h1>Tickets/Bookings</h1>
          <div className="plan">
            <MdFlight /> Flights
          </div>
          <div className="List">
            <div className="logo">
              <img src={Logo}></img>
            </div>
            <div className="box">
              <p className="top-t">Johor Bahru (JHB)</p>
              <p className="bot-t">12:00 pm</p>
            </div>
            <div className="box">
              <p className="top-t">Johor Bahru (JHB)</p>
              <p className="bot-t">12:00 pm</p>
            </div>
            <div className="details">
              <div className="cols">
                <div className="icon-wrapper">
                  <BsCalendar2DateFill className="icon" />
                </div>
                <div className="text">
                  <p className="top-t">Date</p>
                  <p className="bot-t">12-11-22</p>
                </div>
                <div className="icon-wrapper">
                  <BsDoorClosedFill className="icon" />
                </div>
                <div className="text">
                  <p className="top-t">Gate</p>
                  <p className="bot-t">12-11-22</p>
                </div>
              </div>
              <div className="cols">
                <div className="icon-wrapper">
                  <FaClock className="icon" />
                </div>
                <div className="text">
                  <p className="top-t">Time</p>
                  <p className="bot-t">12-11-22</p>
                </div>
                <div className="icon-wrapper">
                  <RiWheelchairFill className="icon" />
                </div>
                <div className="text">
                  <p className="top-t">Date</p>
                  <p className="bot-t">12-11-22</p>
                </div>
              </div>
            </div>
            <div className="visit">
              <button onClick={handleVisitAgent}>Visit Agent</button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default FlightList;
