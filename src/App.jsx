import React, { useState } from "react";

import "./App.css";
import { fetchWeather } from "./API/fetchWeather";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    try {
      // porcess ahead if "Enter" key is pressed
      if (e.key === "Enter") {
        // return if query is empty
        if (!query) {
          toast.info("Please enter a valid city", { position: "top-center" });
          return;
        }
        const data = await fetchWeather(query);
        setWeather(data);
        setQuery("");
        return;
      }
    } catch (error) {
      toast.error(
        "Oops! Weather info not available. Please try again later or check your query",
        {
          position: "top-center",
        }
      );
      console.log(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="main-container">
        <input
          type="text"
          className="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={search}
        />
        {weather.main && (
          <div className="city">
            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>
            <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>
            <div className="info">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
