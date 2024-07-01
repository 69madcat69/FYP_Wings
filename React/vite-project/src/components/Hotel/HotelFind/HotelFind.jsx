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

const HotelFind = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const { travelCity, checkInDate, checkOutDate } = useParams();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/gethotel", {
          params: {
            city: travelCity,
            arrival_date: checkInDate,
            departure_date: checkOutDate,
          },
        });
        setHotels(response.data.hotels);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
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
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handleChange2 = (event, newDeparture) => {
    setDeparture(newDeparture);
  };

  const convertReviewScoreToStars = (score) => {
    return score / 2;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/gethotel", {
        params: {
          city: destinationCity,
          arrival_date: checkIn,
          departure_date: checkOut,
        },
      });
      setHotels(response.data.hotels);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="HotelFind">
      <div className="container">
        <div className="bottom-container">
          <div className="Filter-Container">
            <form onSubmit={handleSubmit}>
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
              <button type="submit">Search</button>
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
                              value={convertReviewScoreToStars(
                                hotel.review_score
                              )}
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
