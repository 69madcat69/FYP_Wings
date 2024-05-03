/* eslint-disable */
import React, { useState, useEffect } from "react";
import data from "../../functions/data.js";
const RoomContext = React.createContext();

const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const formattedData = formatData(data);
    setFlights(formattedData);
  }, []);

  const formatData = (data) => {
    return data.map((datas) => {
      const { id } = datas.sys;
      const images = datas.fields.images || []; // Ensure images is an array or use an empty array as default
      const flight = { ...datas.fields, images, id };
      return flight;
    });
  };

  return (
    <RoomContext.Provider value={{ flights }}>{children}</RoomContext.Provider>
  );
};

export { FlightProvider, RoomContext };
