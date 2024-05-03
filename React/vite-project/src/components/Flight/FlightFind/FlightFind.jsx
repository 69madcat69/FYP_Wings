/*eslint-disable */
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import "./FlightFind.css";
import { FaCoins } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaPlaneDeparture } from "react-icons/fa";
import Logo from "../../assets/L1.jpg";
// import Axios from "../../../functions/Axios.jsx";
import Fly1 from "../../assets/BUDGETAIR.png";

import {
  FlightProvider,
  RoomContext,
} from "../../../functions/FlightProvider/FlightProvider.jsx";
// import { useForm } from "react-hook-form";

const FlightFind = () => {
  const { flights } = useContext(RoomContext);

  // Start Search
  // const { handleSubmit, control } = useForm();
  // const defaultvalues = {
  //   FlightId: "",
  //   DepartureL: "",
  //   ArrivalL: "",
  //   DepartureD: "",
  //   ArrivalD: "",
  // };
  // const FindForm = (data) => {
  //   Axios.post(`Project/`, {
  //     FlightId: data.FlightId,
  //     DepartureL: data.DepartureL,
  //     ArrivalL: data.ArrivalL,
  //     DepartureD: data.DepartureD,
  //     ArrivalD: data.ArrivalD,
  //   });
  // };
  // End Search

  /* Top-container Start */

  const [originCity, setOriginCity] = useState("");
  const [travelCity, setTravelCity] = useState("");
  const [departDate, setDepartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [arrivalDate, setArrivalDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .slice(0, 10)
  );

  // Event handlers to update state when input fields change
  const handleOriginCityChange = (event) => {
    console.log(event.target.value);
    setOriginCity(event.target.value);
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
  // Might Delete Start
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = flights.filter((flight) =>
      flight.FullStartPlace.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);
  // Might Delete End

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Origin City:", originCity);
    console.log("Travel City:", travelCity);
    console.log("Departure Date:", departDate);
    console.log("Arrival Date:", arrivalDate);
    // You can perform further actions such as sending data to server, etc.
  };

  // Start Date
  useEffect(() => {
    const arrivalDate = new Date(departDate);
    const formattedArrivalDate = arrivalDate.toISOString().slice(0, 10);
    setArrivalDate(formattedArrivalDate);
  }, [departDate]);
  // End Date

  // Start Slide Range
  const minFlightPrice = Math.min(...flights.map((flight) => flight.price));
  const maxFlightPrice = Math.max(...flights.map((flight) => flight.price));
  const [minPrice, setMinPrice] = useState(minFlightPrice);
  const [maxPrice, setMaxPrice] = useState(maxFlightPrice);
  useEffect(() => {
    // Calculate min and max prices
    const minFlightPrice = Math.min(...flights.map((flight) => flight.price));
    const maxFlightPrice = Math.max(...flights.map((flight) => flight.price));
    setMinPrice(minFlightPrice);
    setMaxPrice(maxFlightPrice);
  }, [flights]);

  const [value, setValue] = useState([1000, 4000]);
  const handleChange = (event, newValue) => {
    if (newValue[0] > newValue[1]) {
      setValue([newValue[1], newValue[0]]);
    } else {
      setValue(newValue);
    }
  };

  const [departure, setDeparture] = useState([1, 12]);
  const handleChange2 = (event, newDeparture) => {
    setDeparture(newDeparture);
  };
  // End Slide Range

  return (
    <div className="FlightFind">
      <div className="container">
        {/* Top-container Start */}
        <div className="Search-Container">
          <form className="form-inline" onSubmit={handleSubmit}>
            <div className="box">
              <label>From</label>
              <div className="input flex">
                <input
                  type="text"
                  placeholder="Enter Origin City"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="box">
              <label>To</label>
              <div className="input flex">
                <input
                  type="text"
                  placeholder="Enter Travel City"
                  value={travelCity}
                  onChange={handleTravelCityChange}
                ></input>
              </div>
            </div>
            <div className="box">
              <label>Depart</label>
              <div className="input flex">
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                />
              </div>
            </div>
            <div className="box">
              <label>Return</label>
              <div className="input flex">
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                />
              </div>
            </div>
            <div className="box">
              <label>Passengers/Class</label>
              <div className="input flex">
                <input type="text" value="1 Passenger Economy" readOnly />
                <IoMdArrowDropdown className="ar-icon" />
              </div>
            </div>
            <div className="Search">
              <button type="submit" onClick={handleSearch}>
                <IoIosSearch />
              </button>
            </div>
          </form>
        </div>
        {/* Top-container End */}
        <div className="bottom-container">
          <div className="Filter-Container">
            <form>
              <h1>Filter</h1>
              <label>Price</label>
              <div className="dollar">
                <Box className="slider" sx={{ width: 200 }}>
                  <Slider
                    className="price-range"
                    getAriaLabel={() => "Price range"}
                    value={[minPrice, maxPrice]} // Set value as an array containing both min and max prices
                    onChange={(event, newValue) => {
                      setMinPrice(newValue[0]);
                      setMaxPrice(newValue[1]);
                    }}
                    step={10}
                    min={minFlightPrice} // Set min to minFlightPrice
                    max={maxFlightPrice} // Set max to maxFlightPrice
                    marks={[
                      { value: minFlightPrice, label: `$${minFlightPrice}` },
                      { value: maxFlightPrice, label: `$${maxFlightPrice}` },
                    ]}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </div>
              <label>Departure Time</label>
              <Box className="slider" sx={{ width: 200 }}>
                <Slider
                  className="departure-range"
                  getAriaLabel={() => "Departure range"}
                  value={departure}
                  onChange={handleChange2}
                  min={0}
                  max={12}
                  marks={[
                    { value: 1, label: "1 AM" },
                    { value: 6, label: "6 AM" },
                    { value: 12, label: "12 PM" },
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>
            </form>
          </div>
          <div className="Fox">
            <div className="Sort-Container">
              <button>
                <div className="sort">
                  <h2>
                    <FaCoins />
                    <span className="icon-text">Cheapest</span>
                  </h2>
                  <p>$99</p>
                </div>
              </button>
              <button>
                <div className="sort">
                  <h2>
                    <IoStar />
                    <span className="icon-text">Best</span>
                  </h2>
                  <p>$99</p>
                </div>
              </button>
              <button>
                <div className="sort">
                  <h2>
                    <GiCommercialAirplane />
                    <span className="icon-text">Quickest</span>
                  </h2>
                  <p>$99</p>
                </div>
              </button>
              <button>
                <div className="sort">
                  <h2>
                    <FaPlaneDeparture />
                    <span className="icon-text">Departure Time </span>{" "}
                    <IoMdArrowDropdown />
                  </h2>
                </div>
              </button>
            </div>
            {searchResults.map((flight, index) => (
              <div key={index} className="List-Container">
                <div className="logo">
                  <img src={Fly1} alt="Flight Logo" />
                </div>
                <div className="rows-container">
                  <div className="row-1">
                    <p>
                      <span className="num">4.2</span> {flight.name}
                    </p>
                    <p className="price">
                      starting from
                      <br />
                      <span className="currency">{flight.price}</span>
                    </p>
                  </div>
                  <div className="row-2">
                    <div className="box">
                      <p className="flightD">
                        <span className="time">{flight.firstdate1} </span> -
                        <span className="time"> {flight.firstdate2} </span>
                      </p>
                      <p className="stop">non stop</p>
                      <p>
                        {flight.timetaken}
                        <br />
                        {flight.StartPlace}-{flight.Transit}
                      </p>
                    </div>
                    <div className="box">
                      <p className="flightD">
                        <span className="time">{flight.enddate1} </span> -
                        <span className="time"> {flight.enddate2} </span>
                      </p>
                      <p className="stop">non stop</p>
                      <p>
                        {flight.timetaken2} <br />
                        {flight.Transit}-{flight.EndPlace}
                      </p>
                    </div>
                  </div>
                  <div className="visit">
                    <button>View Deals</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlightFind;
