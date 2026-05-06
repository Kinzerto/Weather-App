import './styles/style.scss';
import './styles/reset.css';

import { fetchWeather } from './api/weatherAPI.js';
import { getAddress } from './api/geoLocationApi.js';
import { astronomy } from './api/astronomyAPI.js';
import { renderCurrentWeather } from './display/render-current-weather.js';
import { formatDateComplete } from './utils/date.js';

const formEl = document.getElementById('weather-form');
const cityInputEl = document.getElementById('search-city');
console.log(fetchWeather('calbiga'));

//  Get the location you searched and pass it to fetchWeather to get the location weather.
formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = cityInputEl.value.trim();
  dataLocate(city);
});

// basically this is used for for getting ur location where you at, like “ask the browser for the user’s current location(if you allow the location permission), then use it”. This returns the latitude and longitude.
navigator.geolocation.getCurrentPosition(async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  // then it passed to fuction getAddress(in geoLocation.js file) it gets the locations Hometown(i picked only the hometown in this function, but you can get like street, city, country or someting to return a specific location data)
  getAddress(lat, lon);
});

async function getCombinedData(city) {
  try {
    // const geoData = await getAddress(city);

    const weatherData = await fetchWeather(city);
    if (!weatherData) {
      throw new Error('Weather data failed');
    }
    const lat = weatherData.latitude;
    const lon = weatherData.longitude;

    const astroData = await astronomy(lat, lon).catch(() => null);

    const astro = astroData?.astronomy;

    return {
      weather: {
        weatherData,
        current: weatherData.currentConditions,
        days: weatherData.days,
        today: weatherData.days[0],
        tommorow: weatherData.days[1],
      },

      astronomy: {
        date: astro.date,
        isDateNow: formatDateComplete(astro.date),
        sunrise: astro ? astro.sunrise : null,
        sunset: astro ? astro.sunset : null,
        dawn: astro ? astro.morning.civil_twilight_begin : null,
        dusk: astro ? astro.evening.civil_twilight_end : null,
      },
    };
  } catch (err) {
    console.error(err);
  }
}

async function dataLocate(loc) {
  const weather = await getCombinedData(loc);

  renderCurrentWeather(weather);
}

dataLocate('calbiga');
