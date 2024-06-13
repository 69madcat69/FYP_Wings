import React, { useEffect, useState } from "react";

const AircraftList = () => {
  const [aircraftData, setAircraftData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/getflight");
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        setAircraftData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Aircraft Data</h1>
      <ul>
        {aircraftData.map((airport) => (
          <li key={airport.id}>
            <p>Name: {airport.name}</p>
            <p>IATA Code: {airport.iata_code}</p>
            <p>ICAO Code: {airport.icao_code}</p>
            <p>Time Zone: {airport.time_zone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AircraftList;
