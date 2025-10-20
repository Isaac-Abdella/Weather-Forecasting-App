// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "./pages/Home";
import HourlyForecast from "./pages/HourlyForecast";
import WeeklyForecast from "./pages/WeeklyForecast";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import "./App.css";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 48.4284,
    lon: -123.3656,
    display: "Victoria",
  });
  const [unit, setUnit] = useState("metric"); // "metric" for Celsius, "imperial" for Fahrenheit

  const fetchWeather = async (lat, lon) => {
    setIsLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=minutely&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWeatherData({
        ...data,
        name: selectedLocation.display,
      });

      console.log("Weather data:", data); // Debug log
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedLocation.lat, selectedLocation.lon);
  }, [selectedLocation, unit]);

  const handleLocationSelect = (location) => {
    setSelectedLocation({
      lat: location.lat,
      lon: location.lon,
      display: location.display,
    });
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  // Early return if weatherData is null
  if (!weatherData && !error) {
    return (
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <SearchBar onLocationSelect={handleLocationSelect} />
          <div className="text-center p-4">Loading weather data...</div>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <SearchBar onLocationSelect={handleLocationSelect} />
        {isLoading && (
          <div className="text-center p-4">Loading weather data...</div>
        )}
        {error && <div className="text-center text-danger p-4">{error}</div>}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                weatherData={{ ...weatherData.current, name: weatherData.name }}
                unit={unit}
                onUnitChange={handleUnitChange}
              />
            }
          />
          <Route
            path="/weekly"
            element={
              <WeeklyForecast
                weatherData={{ daily: weatherData.daily }}
                unit={unit}
                onUnitChange={handleUnitChange}
              />
            }
          />
          <Route
            path="/hourly"
            element={
              <HourlyForecast
                weatherData={{ hourly: weatherData.hourly }}
                unit={unit}
                onUnitChange={handleUnitChange}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
