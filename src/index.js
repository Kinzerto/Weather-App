import './styles/reset.css';
import './styles/loader.scss';
import './styles/style.scss';

import { fetchWeather } from './api/weatherAPI.js';
import { getAddress } from './api/geoLocationApi.js';
import { astronomy } from './api/astronomyAPI.js';
import { renderCurrentWeather } from './display/render-current-weather.js';
import { formatDateComplete } from './utils/date.js';
import { state } from './state.js';
import { loader } from './utils/loader.js';
import rigbyImg from './assets/images/rigby.jpeg';

const profileEl = document.getElementById('profile');
profileEl.src = rigbyImg;
const formEl = document.getElementById('weather-form');
const cityInputEl = document.getElementById('search-city');

//  Get the location you searched and pass it to fetchWeather to get the location weather.
formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  state.scale = null;
  state.isKm = null;
  const city = cityInputEl.value.trim();
  if (!city) return;
  dataLocate(city);
  formEl.reset();
});

// basically this is used f or for getting ur location where you at, like “ask the browser for the user’s current location(if you allow the location permission), then use it”. This returns the latitude and longitude.
navigator.geolocation.getCurrentPosition(async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  // then it passed to fuction getAddress(in geoLocation.js file) it gets the locations Hometown(i picked only the hometown in this function, but you can get like street, city, country or someting to return a specific location data)
  const location = await getAddress(lat, lon);
  const address = location.address.town;

  dataLocate(address);
});

// combined 2 API into one for functionality
async function getCombinedData(city) {
  loader();
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
        location: weatherData.resolvedAddress,
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
