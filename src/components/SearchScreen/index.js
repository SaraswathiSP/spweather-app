
import React, { useState,useEffect } from 'react';
import './index.css';

import { v4 as uuidv4 } from 'uuid';

const favouriteLocations = [
  {
    id: uuidv4(),
    location: 'Hyderabad',
    temperature: '42',
    wind: '3.6',
    isFavourite: false,
  },
  {
    id: uuidv4(),
    location: 'Ooty',
    temperature: '32',
    wind: '2.8',
    isFavourite: false,
  },
  {
    id: uuidv4(),
    location: 'Tirupati',
    temperature: '42',
    wind: '3.6',
    isFavourite: true,
  },
];

const SearchScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(favouriteLocations);
  

  useEffect(() => {
    // Load weatherData from local storage on component mount
    const storedWeatherData = localStorage.getItem('weatherData');
    if (storedWeatherData) {
      setWeatherData(JSON.parse(storedWeatherData));
    } else {
      setWeatherData(favouriteLocations);
    }
  }, []);

  useEffect(() => {
    // Update local storage when weatherData changes
    localStorage.setItem('weatherData', JSON.stringify(weatherData));
  }, [weatherData]);


  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=82b18d0dfde84ec9a6a111046231205&q=${city}&days=7&aqi=yes&alerts=no`;

  const onClickFavouriteIcon = (id) => {
    setWeatherData((prevWeatherData) => {
      return prevWeatherData.map((data) => {
        if (data.id === id) {
          return { ...data, isFavourite: !data.isFavourite };
        }
        return data;
      });
    });
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const newWeatherData = {
        id: uuidv4(),
        location: data.location.name,
        temperature: data.current.temp_c,
        wind: data.current.wind_kph,
        isFavourite: false,
      };
      setWeatherData([...weatherData, newWeatherData]);
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
    setCity('');
  };

  const onlyFavourites = () => {
    setWeatherData((prevWeatherData) => prevWeatherData.filter((data) => data.isFavourite));
  };

  return (
    <div className='search-container'>
      <h1 className='favourite-heading'>User's Favourite Locations</h1>

      <form className='form' onSubmit={handleSubmit}>
        <button>
          <svg
            width='17'
            height='16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            role='img'
            aria-labelledby='search'
          >
            <path
              d='M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9'
              stroke='currentColor'
              strokeWidth='1.333'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
          </svg>
        </button>
        <input
          onChange={handleCityChange}
          className='input'
          placeholder='Search for a location...'
          required
          type='text'
          value={city}
        />
        <button className="reset" type="reset">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </form>
    
          <div className="only-favourites">
    <button type="button" className="fav-button" onClick={onlyFavourites}>
      Show Favourites
    </button>
  </div>

  <div className="user-favorite-locations">
    {weatherData.map((each) => (
      <div className="favourite-weather" key={each.id}>
        <img
          className="user"
          src="https://res.cloudinary.com/dg0telgxq/image/upload/v1683985185/cute-boy-face-cartoon-cute-boy-face-cartoon-vector-illustration-graphic-design-110654225_rpq8mj.jpg"
          alt="user"
        />
        <li className="info">
          <p>Location: {each.location}</p>
          <p>Temp: {each.temperature}°</p>
          <p>Wind: {each.wind}km/h</p>
        </li>
        <button
          key={each.id}
          type="button"
          onClick={() => onClickFavouriteIcon(each.id)}
          className={`favorite-button ${each.isFavourite ? 'active' : ''}`}
        >
          <img
            className="icon"
            src={
              each.isFavourite
                ? 'https://res.cloudinary.com/dg0telgxq/image/upload/v1683987232/fav_sm8azj.jpg'
                : 'https://res.cloudinary.com/dg0telgxq/image/upload/v1683987232/un_dt5hry.png'
            }
            alt="favoourite"
          />
        </button>
      </div>
    ))}
  </div>
</div>
  );
};

export default SearchScreen;