import { useState, useEffect } from "react";
import "./index.css";
import Clock from 'react-live-clock';

const Home = () => {
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [pressure, setPressure] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [temperature, setTemperature] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState("May");
  const [cond, setCond] = useState("");
  const [airquality, setAirquality] = useState("");

const getDate = {
  getMonthName: function (month) {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Invalid month";
    }
  },
};

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const month = now.getMonth() + 1;
      const date = now.getDate();

      setCurrentDate(date);
      setCurrentMonth(month);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getData = async (lat, long) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=82b18d0dfde84ec9a6a111046231205&q=${lat},${long}&aqi=yes`
      );
      return await response.json();
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
      alert("Failed to fetch weather data. Please try again.");
    }
  };

  const gotLocation = async (position) => {
    try {
      const result = await getData(
        position.coords.latitude,
        position.coords.longitude
      );

      setLocation(result.location.name);
      setState(result.location.region);
      setHumidity(result.current.humidity);
      setPressure(result.current.pressure_mb);
      setTemperature(result.current.temp_c);
      setWind(result.current.wind_kph);
      setCond(result.current.condition.text);
      const quality = result.current.air_quality.pm2_5.toString();
      const firstDigits = quality.slice(0, 2);
      setAirquality(firstDigits);
    } catch (err) {
      console.error("Failed to get weather data:", err);
      alert("Failed to get weather data. Please try again.");
    }
  };

  const failedToGet = () => {
    alert("Failed to get current location. Please enable location access.");
  };

  useEffect(() => {
    console.log(location);
    console.log(state);
    console.log(temperature);
    console.log(humidity);
    console.log(pressure);
    console.log(wind);
    console.log(cond);
    console.log(airquality);
  }, [location, state, temperature, humidity, pressure, wind, cond, airquality]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
  }, []);


  return (
    <div className="home-container"> 
        <div className="extra-weather-info">
            <div className="single-weather-info">
                <img src="https://res.cloudinary.com/dg0telgxq/image/upload/v1683970316/wind1_bjvmm8.png" alt="" className="weather-image"/>
                <h2>Wind {wind}km/h</h2>

            </div>
            <div className="single-weather-info">
                <img src="https://res.cloudinary.com/dg0telgxq/image/upload/v1683970489/h_whfbss.png" alt="" className="weather-image"/>
                <h2>Humidity {humidity}%</h2>

            </div>
            <div className="single-weather-info">
                <img src="https://res.cloudinary.com/dg0telgxq/image/upload/v1683970487/rain1_ckgfyb.jpg" alt="" className="weather-image"/>
                <h2>Pressure {pressure}mb</h2>

            </div>
            <div className="single-weather-info">
                <img src="https://res.cloudinary.com/dg0telgxq/image/upload/v1683970486/temp_thaz3k.jpg" alt="" className="weather-image"/>
                <h2>Temperature {temperature}°</h2>

            </div>
        </div>
      <div className="card">
  <div className="container">
    <div className="cloud front">
      <span className="left-front"></span>
      <span className="right-front"></span>
    </div>
    <span className="sun sunshine"></span>
    <span className="sun"></span>
    <div className="cloud back">
      <span className="left-back"></span>
      <span className="right-back"></span>
    </div>
  </div>

  <div className="card-header">
    <span>{location} <br/>{state}</span>
    <span style={{fontWeight:"bold",fontSize:"22px"}} >{getDate.getMonthName(currentMonth)} {currentDate} <span style={{}}>{cond}</span></span>
    <h1 className="clock">
            <Clock format="HH:mm:ss" interval={1000} ticking={true} />
          </h1>
  </div>


  <span className="temp">{temperature}°</span>

  <div className="temp-scale">
    <span>Celcius</span>
  </div>
     </div>
     <div className="air-quality">
      <h1>Air Quality</h1>
      <h2 style={{marginTop:"-10px"}}>Main Pollution: PM {airquality}</h2>
      <div style={{display:"flex",justifyContent:"flex-start"}}>
      <h1>313-<br/> Standard</h1>
      <h1 style={{backgroundColor:"#FFEA20", fontSize:"15px",padding:'10px',borderRadius:10,height:20}}>AQI</h1>
      

      </div>
    
     </div>
    </div>
  );
};

export default Home;
