// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const cities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Kolkata",
    "Hyderabad",
  ];
  const [weatherData, setWeatherData] = useState({});
  const apiKey = "23f0ab1a377171975f67c30728685d92";

  const fetchWeatherData = async () => {
    const data = {};
    for (let city of cities) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        data[city] = response.data;
      } catch (error) {
        console.error(`Error fetching weather data for ${city}`, error);
      }
    }
    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Fetch data every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-400 to-blue-600 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Weather in Major Cities
      </h1>
      {cities.map((city) => (
        <div key={city} className="mb-12">
          <h2 className="text-3xl font-semibold text-center text-white mb-6">
            {city}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-center">
            <WeatherCard
              title="Main"
              value={
                weatherData[city]?.weather
                  ? weatherData[city].weather[0].main
                  : ""
              }
            />
            <WeatherCard
              title="Feels Like"
              value={
                weatherData[city]?.main
                  ? `${weatherData[city].main.feels_like}°C`
                  : ""
              }
            />
            <WeatherCard
              title="Temperature"
              value={
                weatherData[city]?.main
                  ? `${weatherData[city].main.temp}°C`
                  : ""
              }
            />
            <WeatherCard
              title="Date/Time"
              value={
                weatherData[city]?.dt
                  ? new Date(weatherData[city].dt * 1000).toLocaleString()
                  : ""
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
