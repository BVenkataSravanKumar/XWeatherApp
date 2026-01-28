import { useState } from "react";
import "./App.css";

const API_KEY = "7d52690825d44cb7a2f155332262801 "; 
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Invalid city");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p className="loading">Loading data…</p>}

      {weather && (
        <div className="cards">
          <div className="card">
            <h3>Temperature</h3>
            <p>{weather.current.temp_c}°C</p>
          </div>

          <div className="card">
            <h3>Humidity</h3>
            <p>{weather.current.humidity}%</p>
          </div>

          <div className="card">
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>

          <div className="card">
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
