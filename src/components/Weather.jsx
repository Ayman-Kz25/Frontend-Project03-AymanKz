import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import clear_icon from "../assets/clear.png";
import cloudy_icon from "../assets/cloudy.png";
import partly_cloudy_icon from "../assets/partly-cloud.png";
import scattered_cloud_icon from "../assets/scattered_cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import mist_icon from "../assets/mist.png";
import fog_icon from "../assets/fog.png";
import hail_icon from "../assets/hail.png";
import light_rain_icon from "../assets/light-rain.png";
import heavy_rain_icon from "../assets/heavy-rain.png";
import snow_icon from "../assets/snow.png";
import thunder_icon from "../assets/thunder.png";
import windy_icon from "../assets/windy.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const getWeatherIcon = (main, description, icon) => {
    switch (main) {
      case "Clear":
        return clear_icon;

      case "Clouds":
        if (description.includes("scattered")) return scattered_cloud_icon;
        if (description.includes("few") || description.includes("partly"))
          return partly_cloudy_icon;
        return cloudy_icon;

      case "Rain":
        if (description.includes("light")) return light_rain_icon;
        if (description.includes("heavy")) return heavy_rain_icon;
        return drizzle_icon; // moderate rain → drizzle

      case "Drizzle":
        return drizzle_icon;

      case "Thunderstorm":
        return thunder_icon;

      case "Snow":
        if (description.includes("hail")) return hail_icon; // snowy hail
        return snow_icon;

      case "Mist":
        return mist_icon;

      case "Fog":
      case "Haze":
      case "Smoke":
        return fog_icon;

      case "Wind":
      case "Breeze":
        return windy_icon;

      default:
        return clear_icon; // fallback (safe default)
    }
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name First!");
      return;
    }
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = getWeatherIcon(
        data.weather[0].main,
        data.weather[0].description,
        data.weather[0].icon
      );

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        loc: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("An error occured in fetching the data!");
    }
  };

  return (
    <div className="weather-card">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Enter City Name" />
        <button type="button" onClick={() => search(inputRef.current.value)}>
          <i class="ri-search-line"></i>
        </button>
      </div>

      {weatherData ? (
        <>
          <div className="weather">
            <img src={weatherData.icon} className="weather-icon" alt="" />
            <p className="temp">{weatherData.temp}°C</p>
            <p className="loc">{weatherData.loc}</p>
          </div>

          <div class="weather-data">
            <div class="col">
              <a>
                <i class="ri-drop-fill"></i>
              </a>
              <div>
                <p class="humidity">{weatherData.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div class="col">
              <a>
                <i class="ri-windy-fill"></i>
              </a>
              <div>
                <p class="wind">{weatherData.windSpeed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
