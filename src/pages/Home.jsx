// src/pages/Home.jsx
import React from "react";
import PropTypes from "prop-types";

export default function Home({ weatherData, unit, onUnitChange }) {
  console.log("Home component weatherData:", weatherData); // Debug log

  if (!weatherData) {
    return <p className="text-center p-4">Loading weather data...</p>;
  }

  const {
    name = "Unknown Location",
    temp,
    feels_like,
    humidity,
    weather = [{ main: "", description: "", icon: "01d" }],
    wind_speed,
    sunrise,
    sunset,
  } = weatherData;

  return (
    <div className="forecast-container">
      {/* SearchBar is above this in App.jsx */}
      <div className="unit-selector text-center mb-3">
        <label>
          <input
            type="radio"
            value="metric"
            checked={unit === "metric"}
            onChange={onUnitChange}
          />{" "}
          Celsius
        </label>
        {"  "}
        <label>
          <input
            type="radio"
            value="imperial"
            checked={unit === "imperial"}
            onChange={onUnitChange}
          />{" "}
          Fahrenheit
        </label>
      </div>
      <div className="forecast-card">
        <h1 className="text-center mb-3">{name}</h1>
        <div className="text-center">
          <h2 className="mb-2">{weather[0].main}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt={weather[0].description}
            className="my-2"
          />
          <h3 className="mb-2">
            {Math.round(temp)}
            {unit === "metric" ? "°C" : "°F"}
          </h3>
          <p className="mb-2">
            Feels like: {Math.round(feels_like)}
            {unit === "metric" ? "°C" : "°F"}
          </p>
          <div className="d-flex flex-column gap-2 mt-3">
            <p>Humidity: {humidity}%</p>
            <p>
              Wind:{" "}
              {unit === "metric"
                ? Math.round(wind_speed * 3.6) + " km/h"
                : Math.round(wind_speed * 2.237) + " mph"}
            </p>
            <p>
              Sunrise:{" "}
              {sunrise ? new Date(sunrise * 1000).toLocaleTimeString() : "N/A"}{" "}
              | Sunset:{" "}
              {sunset ? new Date(sunset * 1000).toLocaleTimeString() : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  weatherData: PropTypes.shape({
    name: PropTypes.string,
    main: PropTypes.shape({
      temp: PropTypes.number,
      feels_like: PropTypes.number,
      humidity: PropTypes.number,
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string,
        description: PropTypes.string,
        icon: PropTypes.string,
      })
    ),
    wind: PropTypes.shape({
      speed: PropTypes.number,
    }),
    sys: PropTypes.shape({
      sunrise: PropTypes.number,
      sunset: PropTypes.number,
    }),
  }),
};
