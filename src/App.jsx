import React, { useEffect, useState } from 'react';
import './App.css';
import typing from './images/typing.png'

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(false);

  function fetchWeather() {
    if (city.trim() === '') {
      setError(true);
      return;
    }

    setError(false);

    fetch(`https://api.weatherapi.com/v1/current.json?key=3dbe3b7a3a1744b58dd210014231506&q=${city}&aqi=yes`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchWeather();
  }, [city]);

  function strokeChange(event) {
    setCity(event.target.value);
  }

  return (
    <div className='container'>
      <div className='weather'>
        <input type='text' onChange={strokeChange} placeholder='Enter Desired City Here..' />

        {error ? (
          <div className='content2'>
            <p className='error'>Please enter a city name.</p>
            <img src={typing} alt="" className='typing' />
          </div>
        ) : (
          <div className='content'>
            <p className='city'>{weatherData.location && weatherData.location.name}</p>
            <p className='country'>{weatherData.location && weatherData.location.country}</p>
            <p className='time'>{weatherData.location && weatherData.location.localtime}</p>

            <div className='degree'>
              <img className='icon' src={weatherData.current && weatherData.current.condition.icon} alt='' />
              {weatherData.current && <p className='condition'>{weatherData.current.condition.text}</p>}
              {weatherData.current && <p className='tem'>{weatherData.current.temp_c}&deg;C</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
