// src/pages/WeeklyForecast.jsx
import React from "react";
import PropTypes from "prop-types";

export default function WeeklyForecast({ weatherData, unit, onUnitChange }) {
  console.log("WeeklyForecast data:", weatherData); // Add this to debug

  if (!weatherData || !weatherData.daily) {
    return <p className="text-center p-4">Loading weekly data...</p>;
  }

  // Add additional check for array
  if (!Array.isArray(weatherData.daily)) {
    return <p>Error: Weather data is not in the correct format</p>;
  }

  return (
    <div className="forecast-container">
      <h2 className="text-center mb-4">7-Day Forecast</h2>
      <div className="unit-selector text-center mb-4">
        <label className="me-3">
          <input
            type="radio"
            value="metric"
            checked={unit === "metric"}
            onChange={onUnitChange}
          />{" "}
          Celsius
        </label>
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
      <div className="forecast-grid">
        {weatherData.daily.slice(0, 7).map((day, index) => {
          const date = new Date(day.dt * 1000);
          return (
            <div key={index} className="forecast-card">
              <div className="text-center">
                <p className="mb-2 fw-bold">
                  {date.toLocaleDateString("en-US", { weekday: "long" })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                  className="my-2"
                />
                <p className="mb-1">
                  {Math.round(day.temp.max)}
                  {unit === "metric" ? "°C" : "°F"}
                  {" / "}
                  {Math.round(day.temp.min)}
                  {unit === "metric" ? "°C" : "°F"}
                </p>
                <p>
                  Feels like: {Math.round(day.feels_like.day)}
                  {unit === "metric" ? "°C" : "°F"}
                </p>
                <p>
                  Wind:{" "}
                  {unit === "metric"
                    ? Math.round(day.wind_speed * 3.6) + " km/h"
                    : Math.round(day.wind_speed * 2.237) + " mph"}
                </p>
                <p className="text-secondary">{day.weather[0].main}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

WeeklyForecast.propTypes = {
  weatherData: PropTypes.shape({
    daily: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
        temp: PropTypes.shape({
          max: PropTypes.number.isRequired,
          min: PropTypes.number.isRequired,
        }).isRequired,
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
