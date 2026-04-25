import { fetchWeather } from './weather.js';

// this API returns location based on the return value(lat, lon parameter) on navigator.geolocation on index.js
export async function getAddress(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  const res = await fetch(url);
  const data = await res.json();

  fetchWeather(data.address.town);
}
