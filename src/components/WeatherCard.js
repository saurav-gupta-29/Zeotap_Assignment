// src/components/WeatherCard.js
import React from "react";

const WeatherCard = ({ title, value }) => (
  <div className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg rounded-lg p-6 text-center text-white">
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-xl">{value}</p>
  </div>
);

export default WeatherCard;
