/* eslint-disable */
import React from "react";
import { MdFlight } from "react-icons/md"; // Seems unnecessary now, consider removing
import Logo from "../../assets/BUDGETAIR.png";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { BsDoorClosedFill } from "react-icons/bs";
import { RiWheelchairFill } from "react-icons/ri";
import { IoIosBed } from "react-icons/io";

import "./HotelList.css";

const HotelList = () => {
  const handleVisitAgent = () => {
    console.log("Visit Agent button clicked");
  };

  return (
    <body>
      <div className="HotelList">
        <div className="container">
          <h1>Bookings</h1>
          <div className="plan">
            <IoIosBed />
            Hotel
          </div>
          <div className="List">
            <div className="logo">
              <img src={Logo}></img>
            </div>
            <div className="box">
              <p className="top-t">Check-In</p>
              <p className="bot-t">Thur, Dec 8</p>
            </div>
            <div className="box">
              <p className="top-t">Check-Out</p>
              <p className="bot-t">Fri, Dec 9</p>
            </div>
            <div className="details">
              <div className="cols">
                <div className="icon-wrapper">
                  <BsCalendar2DateFill className="icon" />
                </div>
                <div className="text">
                  <p className="top-t">Check-In</p>
                  <p className="bot-t">12:00pm</p>
                </div>
                <div className="icon-wrapper">
                  <BsDoorClosedFill className="icon" />
                </div>
                <div className="text">
                  <p className="top-t">Room No.</p>
                  <p className="bot-t">On Arrival</p>
                </div>
              </div>
              <div className="cols">
                <div className="icon-wrapper">
                  <FaClock className="icon" />
                </div>
                <div className="text">
                  <p className="top-t">Check-Out</p>
                  <p className="bot-t">11:30am</p>
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
              <button onClick={handleVisitAgent}>Book Room</button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default HotelList;
