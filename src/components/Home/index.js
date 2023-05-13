import { useState,useEffect } from "react";
import "./index.css";
import Clock from 'react-live-clock';


const Home = () => {

    const [location,setLocation] =useState("")
    const [state,setState] = useState("")
    const [rain,setRain] = useState("")
    const [humidity,setHumudity] = useState("")
    const [wind,setWind] = useState("")
    const [temperature,setTemperature] = useState("")
    const [currentDate, setCurrentDate] = useState("");
    const [currentMonth, setCurrentMonth] = useState("May");

  // geting Current Date and Month
    useEffect(() => {
        const interval = setInterval(() => {
          const now = new Date();
          
          const month = now.getMonth() + 1;
          const date = now.getDate();
    
          setCurrentDate(date);
          setCurrentMonth(month);
        }, 1000); // Update every second
    
        return () => {
          clearInterval(interval);
        };
      }, []);

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
      
// Accessing data according to user Location
      const getData = async (lat, long) => {
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=82b18d0dfde84ec9a6a111046231205&q=${lat},${long}&aqi=yes`
          );
          return await response.json();
        } catch (err) {
          alert("Please enable location access to use this application.");
        }
      };
    
      const gotLocation = async (position) => {
        const result = await getData(
          position.coords.latitude,
          position.coords.longitude
        );
// console logging all necessary information
        console.log(result);
        setLocation(result.location.name)
        setState(result.location.region)
        setHumudity(result.current.humidity)
        setRain(result.current.precip_in)
        setTemperature(result.current.temp_c)
        setWind(result.current.wind_kph)
      };

// alert message when user doesn't give access to location
    
      const failedToGet = () => {
        alert("Failed to get current location. Please enable location access.");
      };

      // updating data every time state updates using UseEffect
    
      useEffect(() => {
        console.log(location)
        console.log(state);
        console.log(temperature);
        console.log(humidity);
        console.log(rain);
        console.log(wind);
      }, [location, state, temperature, humidity, rain, wind]);
    
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
                <h2>Rain {rain}%</h2>

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
    <span style={{fontWeight:"bold",fontSize:"22px"}} >{getDate.getMonthName(currentMonth)} {currentDate}</span>
    <h1 className="clock">
            <Clock format="HH:mm:ss" interval={1000} ticking={true} />
          </h1>
  </div>

  <span className="temp">{temperature}°</span>

  <div className="temp-scale">
    <span>Celcius</span>
  </div>
     </div>
    </div>
  );
};

export default Home;
