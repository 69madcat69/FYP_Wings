/* eslint-disable */
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Slider from "@mui/material/Slider";
import { useParams } from "react-router-dom";
import { IoMdArrowDropdown, IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaCoins, FaPlaneDeparture } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { GiCommercialAirplane } from "react-icons/gi";
import "./HotelFind.css";
import Logo from "../../assets/L1.jpg";
import Fly1 from "../../assets/BUDGETAIR.png";
import hotelData from "../../../functions/HotelData";

const HotelFind = () => {
  const star = 3;

  const labels = {
    1: "Useless+",
    2: "Poor+",
    3: "Ok+",
    4: "Good+",
    5: "Excellent+",
  };

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { travelCity, checkInDate, checkOutDate } = useParams();
  const [destinationCity, setDestinationCity] = useState("");
  const [checkIn, setCheckIn] = useState(new Date().toISOString().slice(0, 10));
  const [checkOut, setCheckOut] = useState(
    new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .slice(0, 10)
  );
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [departure, setDeparture] = useState([1, 12]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(
        "Fetching data for " + travelCity + checkInDate + checkOutDate
      );
      try {
        // const response = await axios.get("http://127.0.0.1:8000/api/gethotel", {
        //   params: {
        //     location: travelCity || "kuala",
        //     check_in: checkInDate || "2024-11-17",
        //     check_out: checkOutDate || "2024-11-18",
        //   },
        // });
        setHotels(hotelData[0].data.result);
        console.log("Response data: " + hotels);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [travelCity, checkInDate, checkOutDate]);

  const handleDestinationCityChange = (event) => {
    setDestinationCity(event.target.value);
  };

  const handleCheckInDateChange = (event) => {
    setCheckIn(event.target.value);
  };

  const handleCheckoutDateChange = (event) => {
    setCheckOut(event.target.value);
  };

  const handleChange = (event, newValue) => {
    if (newValue[0] > newValue[1]) {
      setMinPrice(newValue[1]);
      setMaxPrice(newValue[0]);
    } else {
      setMinPrice(newValue[0]);
      setMaxPrice(newValue[1]);
    }
  };

  const handleChange2 = (event, newDeparture) => {
    setDeparture(newDeparture);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Travel City:", destinationCity);
    console.log("Checkin Date:", checkIn);
    console.log("Checkout Date:", checkOut);
    // You can perform further actions such as sending data to server, etc.
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="HotelFind">
      <div className="container">
        {/* Top-container Start */}
        {/*<div className="Search-Container">
          <form className="form-inline" onSubmit={handleSubmit}>
            <div className="box">
              <label>Enter Destination</label>
              <div className="input flex">
                <input
                  type="text"
                  placeholder="Enter Destination City"
                  value={destinationCity}
                  onChange={handleDestinationCityChange}
                />
              </div>
            </div>
            <div className="box">
              <label>Check In</label>
              <div className="input flex">
                <input
                  type="date"
                  value={checkIn}
                  onChange={handleCheckInDateChange}
                />
              </div>
            </div>
            <div className="box">
              <label>Check Out</label>
              <div className="input flex">
                <input
                  type="date"
                  value={checkOut}
                  onChange={handleCheckoutDateChange}
                />
              </div>
            </div>
            <div className="box">
              <label>Room & Guests</label>
              <div className="input flex">
                <input type="text" value="1 room, 1 guest" readOnly />
                <IoMdArrowDropdown className="ar-icon" />
              </div>
            </div>
            <div className="Search">
              <button type="submit">
                <IoIosSearch />
              </button>
            </div>
          </form>
        </div> */}
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
                    value={[minPrice, maxPrice]}
                    onChange={handleChange}
                    step={10}
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
                    <span className="icon-text">Hotels</span>
                  </h2>
                  <p>250 places</p>
                </div>
              </button>
              <button>
                <div className="sort">
                  <h2>
                    <span className="icon-text">Motels</span>
                  </h2>
                  <p>51 places</p>
                </div>
              </button>
              <button>
                <div className="sort">
                  <h2>
                    <span className="icon-text">Resorts</span>
                  </h2>
                  <p>25 places</p>
                </div>
              </button>
            </div>
            {hotels && hotels.length > 0 ? (
              hotels.map((hotel, index) => (
                <div key={index} className="List-Container">
                  <div className="logo">
                    <img src={hotel.main_photo_url} alt="Hotel Logo" />
                  </div>
                  <div className="rows-container">
                    <div className="row-1">
                      <h1>{hotel.hotel_name}</h1>
                      <p className="price">
                        starting from
                        <br />
                        <span className="currency">
                          {hotel.min_total_price} {hotel.currencycode}
                        </span>
                      </p>
                    </div>
                    <div className="row-2">
                      <div className="box">
                        <p className="flightD">
                          <span className="HLoc">
                            <FaLocationDot />
                            {hotel.city}
                          </span>
                          <Box
                            sx={{
                              width: 200,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Rating
                              name="text-feedback"
                              value={hotel.review_score}
                              readOnly
                              precision={0.5}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize="inherit"
                                />
                              }
                            />
                          </Box>
                        </p>
                      </div>
                      <div className="box">
                        <p>
                          <span className="num">{hotel.review_score}</span>{" "}
                          {hotel.review_score_word}{" "}
                          <span className="stop">
                            ({hotel.review_nr} reviews)
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="visit">
                      <button>View Deals</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No hotels found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelFind;
