import { render } from '../display/render-weather.js';

export async function fetchWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=X6G3G8LUTMG6WRYLUSQRQVHQQ`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log('not OK');
      return;
    }
    const data = await response.json();
    render(data);
  } catch (error) {
    console.log(error);
  }
}
