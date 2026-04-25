import './styles/style.scss';
import './styles/reset.css';

import { fetchWeather } from './utils/api/weather.js';
import { getAddress } from './utils/api/location.js';

const formEl = document.getElementById('weather-form');
const cityInputEl = document.getElementById('search-city');

//  The element for location you searched or you are in

// fetchWeather('calbiga');

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = cityInputEl.value.trim();
  fetchWeather(city);
});

// basically this is used for for getting ur location where you at like “ask the browser for the user’s current location, then use it.”
navigator.geolocation.getCurrentPosition(async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  // then it passed to fuction getAddress(in wheather.js file) then return the locations Hometown(i picked only the hometown but you can choose like street, city or someting )
  getAddress(lat, lon);
});
