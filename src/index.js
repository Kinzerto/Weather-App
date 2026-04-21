async function fetchWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=X6G3G8LUTMG6WRYLUSQRQVHQQ`,
    );
    if (!response.ok) {
      console.log('not OK');
      return;
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

fetchWeather('CALBIGA');
