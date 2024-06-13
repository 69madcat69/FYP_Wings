/*eslint-disable */
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import "./FlightFind.css";
import { FaCoins } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { GiCommercialAirplane } from "react-icons/gi";

const FlightFind = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departDate, setDepartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [arrivalDate, setArrivalDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .slice(0, 10)
  );
  const [originCity, setOriginCity] = useState("");
  const [travelCity, setTravelCity] = useState("");
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [departure, setDeparture] = useState([1, 12]);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}H ${minutes}M`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/getflight",
          {
            params: {
              origin: "PEK",
              destination: "HND",
              departure_date: "2024-12-01",
            },
          }
        );
        setData(response.data);
        console.log("AHMED HAS C");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Origin City:", originCity);
    console.log("Travel City:", travelCity);
    console.log("Departure Date:", departDate);
    console.log("Arrival Date:", arrivalDate);
    // You can perform further actions such as sending data to server, etc.
  };

  const handlePriceChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handleDepartureChange = (event, newDeparture) => {
    setDeparture(newDeparture);
  };

  return (
    <div className="FlightFind">
      <div className="container">
        <div className="Search-Container">
          <form className="form-inline" onSubmit={handleSubmit}>
            <div className="box">
              <label>From</label>
              <div className="input flex">
                <input
                  type="text"
                  placeholder="Enter Origin City"
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
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
                  onChange={(e) => setTravelCity(e.target.value)}
                />
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
              <button type="submit">
                <IoIosSearch />
              </button>
            </div>
          </form>
        </div>
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
                    onChange={handlePriceChange}
                    step={10}
                    min={1000}
                    max={4000}
                    marks={[
                      { value: 1000, label: "$1000" },
                      { value: 4000, label: "$4000" },
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
                  onChange={handleDepartureChange}
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
            </div>
            {data &&
              data.offers &&
              data.offers.map(
                (offer, offerIndex) =>
                  offer.slices &&
                  offer.slices.map(
                    (slice, sliceIndex) =>
                      slice.segments &&
                      slice.segments.map((segment, segmentIndex) => (
                        <div
                          key={`${offerIndex}-${sliceIndex}-${segmentIndex}`}
                          className="List-Container"
                        >
                          <div className="logo">
                            <img
                              src={offer.owner.logo_symbol_url}
                              alt={`${offer.owner.name} logo`}
                            />
                          </div>
                          <div className="rows-container">
                            <div className="row-1">
                              <p>
                                <span className="num">4.2</span>{" "}
                                {offer.owner.iata_code}
                              </p>
                              <p className="price">
                                starting from
                                <br />
                                <span className="currency">
                                  {offer.total_amount} {offer.total_currency}
                                </span>
                              </p>
                            </div>
                            <div className="row-2">
                              <div className="box">
                                <p className="flightD">
                                  <span className="time">
                                    {formatTime(segment.departing_at)}
                                  </span>{" "}
                                  -
                                  <span className="time">
                                    {formatTime(segment.arriving_at)}
                                  </span>
                                </p>
                                <p className="stop"></p>
                                <p>
                                  Duration: {formatDuration(segment.duration)}
                                </p>
                              </div>
                            </div>
                            <div className="visit">
                              <button>View Deals</button>
                            </div>
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

export default FlightFind;
