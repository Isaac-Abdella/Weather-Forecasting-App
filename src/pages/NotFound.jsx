import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page-container text-center">
      <h1 className="mb-2">404 - Page Not Found</h1>
      <p className="mb-3">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="nav-link">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
