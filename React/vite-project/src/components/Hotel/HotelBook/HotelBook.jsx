/*eslint-disable*/
import "./HotelBook.css";
import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiHotelFill } from "react-icons/ri";
import hotelData from "../../../functions/HotelData";
import KL from "../../assets/KL.jpg";
import IncDec from "../../../functions/IncDec/IncDec";
import bkground from "../../assets/hotelbk.jpg";

const HotelBook = () => {
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const [travelCity, setTravelCity] = useState("");
  const [checkInDate, setCheckInDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .slice(0, 10)
  );

  useEffect(() => {
    setSuggestions(hotelData);
  }, []);

  useEffect(() => {
    setCheckOutDate(() => {
      const newDate = new Date(checkInDate);
      newDate.setDate(newDate.getDate() + 7);
      return newDate.toISOString().slice(0, 10);
    });
  }, [checkInDate]);

  const handleTravelCityChange = (event) => {
    setTravelCity(event.target.value);
  };

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckoutDateChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      navigate(`/HotelFind/${travelCity}/${checkInDate}/${checkOutDate}`);
    } catch (error) {
      console.error("Error:", error);
    }

    console.log("Travel City:", travelCity);
    console.log("Checkin_Date:", checkInDate);
    console.log("Checkout_Date:", checkOutDate);
  };

  return (
    <div className="HotelBook">
      <div className="BkImage">
        <img src={bkground} />
      </div>
      <div className="container">
        <div className="text">
          <h1>
            Make your travel <br />
            wishlist. we'll do <br />
            the rest
          </h1>
          <p>Special offers to suit your plan</p>
        </div>
        <div className="Search-Hotel">
          <div className="text2">Where are you staying?</div>
          <form onSubmit={handleSubmit}>
            <div className="top-field">
              <div className="box">
                <label>Enter Destination</label>
                <div className="input flex">
                  <input
                    type="text"
                    placeholder=""
                    value={travelCity}
                    onChange={handleTravelCityChange}
                  ></input>
                </div>
              </div>
              <div className="box">
                <label>Check In</label>
                <div className="input flex">
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={handleCheckInDateChange}
                  />
                </div>
              </div>
              <div className="box">
                <label>Check Out</label>
                <div className="input flex">
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={handleCheckoutDateChange}
                  />
                </div>
              </div>
              <div className="box">
                <label>Rooms & Guests</label>
                <div className="input flex">
                  <input type="text" value="1 Room 1 Guest" readOnly></input>
                  <IoMdArrowDropdown className="ar-icon" />
                </div>
                <div className="List">
                  <h1>Guests</h1>
                  <div className="row">
                    <div className="label">
                      <p>Adults</p>
                      <p>12+ years</p>
                    </div>
                    <IncDec />
                  </div>
                  <div className="row">
                    <div className="label">
                      <p>Child</p>
                      <p>2-11 years</p>
                    </div>
                    <IncDec minValue={0} />
                  </div>
                  <div className="row">
                    <div className="label">
                      <p>Infant</p>
                      <p>&lt;2 years</p>
                    </div>
                    <IncDec minValue={0} />
                  </div>
                  <h1>Room Type</h1>
                  <div className="row">
                    <div className="label">
                      <p>Standard</p>
                    </div>
                    <input type="radio" name="class" checked />
                  </div>
                  <div className="row">
                    <div className="label">
                      <p>Deluxe</p>
                    </div>
                    <input type="radio" name="class" />
                  </div>
                  <div className="button">
                    <button>Confirm</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button type="submit">
                <RiHotelFill />
                Show Hotels
              </button>
            </div>
          </form>
        </div>
        <div className="Suggestions">
          <div className="text">
            <h1>Plan your perfect trip</h1>
            <h3>Search Hotels & places to our most popular destinations</h3>
          </div>
          <div className="suggest">
            {/* {hotelData.map((country, countryIndex) =>
              country.Cities.map((city, cityIndex) =>
                city.Hotels.map((hotel, hotelIndex) => (
                  <div
                    className="box"
                    key={`${countryIndex}-${cityIndex}-${hotelIndex}`}
                  >
                    <img src={KL} />
                    <div className="details">
                      <h3>
                        {city.CityName}, {country.CountryName}
                      </h3>
                      <p>{hotel.fields.name}</p>
                    </div>
                  </div>
                ))
              )
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBook;
