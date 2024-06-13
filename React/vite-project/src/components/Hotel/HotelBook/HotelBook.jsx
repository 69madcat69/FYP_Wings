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
  const [originCity, setOriginCity] = useState("Kuala Lumpur, Malaysia (KUL)");
  const navigate = useNavigate();

  const [travelCity, setTravelCity] = useState("");
  const [departDate, setDepartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [arrivalDate, setArrivalDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .slice(0, 10)
  );
  useEffect(() => {
    setSuggestions(hotelData);
  }, []);
  useEffect(() => {
    setArrivalDate(() => {
      const newDate = new Date(departDate);
      newDate.setDate(newDate.getDate() + 7);
      return newDate.toISOString().slice(0, 10);
    });
  }, [departDate]);

  const handleOriginCityChange = (event) => {
    console.log(event.target.value);
    setOriginCity(event.target.value);
  };
  const handleShowHotels = () => {
    // Navigate to the HotelFind page when the button is clicked
    navigate("/HotelFind");
  };
  const handleTravelCityChange = (event) => {
    setTravelCity(event.target.value);
  };

  const handleDepartDateChange = (event) => {
    setDepartDate(event.target.value);
  };

  const handleArrivalDateChange = (event) => {
    setArrivalDate(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Origin City:", originCity);
    console.log("Travel City:", travelCity);
    console.log("Departure Date:", departDate);
    console.log("Arrival Date:", arrivalDate);
  };
  const CountryName = "Malaysia";
  const CityName = "Kuala Lumpur";
  const Type = ["Flights", "Hotels"];
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
                    value={originCity}
                    onChange={handleOriginCityChange}
                  ></input>
                </div>
              </div>
              <div className="box">
                <label>Check In</label>
                <div className="input flex">
                  <input
                    type="date"
                    value={departDate}
                    onChange={handleDepartDateChange}
                  />
                </div>
              </div>
              <div className="box">
                <label>Check Out</label>
                <div className="input flex">
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={handleArrivalDateChange}
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
              <button onClick={handleShowHotels}>
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
            {hotelData.map((country, countryIndex) =>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBook;
