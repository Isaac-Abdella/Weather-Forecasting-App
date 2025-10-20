import React from "react";

const About = () => {
  return (
    <div className="forecast-container">
      <div className="forecast-card">
        <h2 className="text-center mb-4">About Weather App</h2>
        <div className="text-center">
          <p className="mb-3">
            This is a weather forecasting application that provides current,
            hourly, and weekly weather information.
          </p>
          <div className="d-flex flex-column gap-3">
            <div className="mb-2">
              <h3 className="mb-2">Features</h3>
              <ul className="list-unstyled">
                <li>Current weather conditions</li>
                <li>Hourly forecast</li>
                <li>7-day forecast</li>
                <li>Location search</li>
              </ul>
            </div>
            <div className="mb-2">
              <h3 className="mb-2">Technologies Used</h3>
              <ul className="list-unstyled">
                <li>React</li>
                <li>OpenWeather API</li>
                <li>Bootstrap-style CSS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
