import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <NavLink
        to="/hourly"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Hourly Forecast
      </NavLink>
      <NavLink
        to="/weekly"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Weekly Forecast
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        About
      </NavLink>
    </nav>
  );
};

export default Navbar;
