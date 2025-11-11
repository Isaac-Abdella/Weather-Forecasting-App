import React, { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import "./SearchBar.css";

const SearchBar = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Use useRef to store the debounced function
  const debouncedFetchRef = useRef();

  const fetchSuggestions = useCallback(async (searchTerm) => {
    if (!searchTerm?.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=0388a7c4834fea76d68c801807a575ce`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setSuggestions(
          data.map((item) => ({
            display: `${item.name}, ${item.state ? `${item.state},` : ""} ${
              item.country
            }`,
            lat: item.lat,
            lon: item.lon,
          }))
        );
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since it doesn't depend on any props or state

  // Initialize the debounced function once when component mounts
  useEffect(() => {
    debouncedFetchRef.current = debounce((searchTerm) => {
      fetchSuggestions(searchTerm);
    }, 400);

    // Cleanup
    return () => {
      debouncedFetchRef.current?.cancel();
    };
  }, [fetchSuggestions]);

  // Handle query changes
  useEffect(() => {
    if (query) {
      debouncedFetchRef.current?.(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = useCallback(
    (suggestion) => {
      setQuery(suggestion.display);
      setSuggestions([]);
      onLocationSelect(suggestion);
    },
    [onLocationSelect]
  );

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <div className="loading-indicator">⏳</div>}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSelect(item)}
              className="suggestion-item"
            >
              {item.display}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
};

export default SearchBar;
