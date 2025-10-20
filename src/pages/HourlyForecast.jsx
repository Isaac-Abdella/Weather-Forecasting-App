// src/pages/HourlyForecast.jsx
import React from "react";
import PropTypes from "prop-types";

export default function HourlyForecast({ weatherData, unit, onUnitChange }) {
  if (!weatherData || !weatherData.hourly) {
    return <p className="text-center p-4">Loading hourly data...</p>;
  }

  return (
    <div className="forecast-container">
      <h2 className="text-center mb-4">Hourly Forecast</h2>
      <div className="unit-selector">
        <label>
          <input
            type="radio"
            value="metric"
            checked={unit === "metric"}
            onChange={onUnitChange}
          />
          Celsius
        </label>
        <label>
          <input
            type="radio"
            value="imperial"
            checked={unit === "imperial"}
            onChange={onUnitChange}
          />
          Fahrenheit
        </label>
      </div>
      <div className="forecast-grid">
        {weatherData.hourly.slice(0, 8).map((hour, index) => (
          <div key={index} className="forecast-card">
            <div className="text-center">
              <p className="mb-2 fw-bold">
                {new Date(hour.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                alt={hour.weather[0].description}
                className="my-2"
              />
              <p className="mb-1">
                {Math.round(hour.temp)}
                {unit === "metric" ? "°C" : "°F"}
              </p>
              <p>
                Feels like: {Math.round(hour.feels_like)}
                {unit === "metric" ? "°C" : "°F"}
              </p>
              <p>
                Wind:{" "}
                {unit === "metric"
                  ? Math.round(hour.wind_speed * 3.6) + " km/h"
                  : Math.round(hour.wind_speed * 2.237) + " mph"}
              </p>
              <p className="text-secondary">{hour.weather[0].main}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

HourlyForecast.propTypes = {
  weatherData: PropTypes.shape({
    hourly: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
        temp: PropTypes.number.isRequired,
        feels_like: PropTypes.number.isRequired,
        wind_speed: PropTypes.number.isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            main: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ),
  }),
  unit: PropTypes.oneOf(["metric", "imperial"]).isRequired,
  onUnitChange: PropTypes.func.isRequired,
};
