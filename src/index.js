import './styles/style.scss';
import './styles/reset.css';
const content = document.querySelector('.content');
const formEl = document.getElementById('weather-form');
const cityInputEl = document.getElementById('search-city');

//  The element for location you searched or you are in
const cityLoc = document.querySelector('.city');

async function fetchWeather(location) {
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

async function getAddress(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  const res = await fetch(url);
  const data = await res.json();

  fetchWeather(data.address.town);
}

navigator.geolocation.getCurrentPosition(async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  getAddress(lat, lon);
});

// fetchWeather('calbiga');

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = cityInputEl.value.trim();
  fetchWeather(city);
});

function render(data) {
  console.log(data);
  const current = data.currentConditions;
  cityLoc.textContent = data.resolvedAddress.split(',')[0];
  console.log(current);
  const main = `
<div class="weather-now">
  <div class="current-weather">
    <div class="top">
      <div class="group">
        Current Weather
        <select name="temp" id="temp">
          <option value="cel">Celcuis</option>
          <option value="far">Fahrenheit</option>
        </select>
      </div>
    </div>
    <div class="weatherStat">
      <div class="temp">
        <span class="current-temp">${current.temp}</span>
        <span class="temp-scales">°C</span>
      </div>
    </div>
    <div class="stat-feel">
      <div class="group">
        <div class="feels">Feels like ${current.feelslike}°</div>
        <div class="status">${current.conditions}</div>
      </div>
      <img src="#" alt="" />
    </div>
  </div>
  <div class="statuses">
    <div class="condition">
      <i class="bi bi-cloud-rain"></i>
      <div class="group">
        <span class="title">Chance of Rain</span>
        <div class="status">${current.precipprob}%</div>
      </div>
    </div>
    <div class="condition">
      <i class="bi bi-cloud-haze2"></i>
      <div class="group">
        <span class="title">Humidity</span>
        <div class="status">${current.humidity}%</div>
      </div>
    </div>
    <div class="condition">
      <i class="bi bi-cloud-haze2"></i>
      <div class="group">
        <span class="title">Wind Speed</span>
        <div class="status">${current.windspeed} mph</div>
      </div>
    </div>
    <div class="condition">
      <i class="bi bi-sun"></i>
      <div class="group">
        <span class="title">UV Index</span>
        <div class="status">${current.uvindex}</div>
      </div>
    </div>
    <div class="condition">
      <i class="bi bi-eye"></i>
      <div class="group">
        <span class="title">Visibility</span>
        <div class="status">${current.visibility} km</div>
      </div>
    </div>
    <div class="condition">
      <i class="bi bi-compass"></i>
      <div class="group">
        <span class="title">Wind Direction</span>
        <div class="status">${current.winddir}°</div>
      </div>
    </div>
  </div>
  <div class="sun-moon">
    <div class="top">
      <!-- <div class="group">Sun & Moon Summary</div> -->
    </div>
    .
  </div>
</div>
<div class="nextDays">
  <div class="top">
    <button class="selected">Today</button>
    <button>Tommorow</button>
    <button>10 Days</button>
  </div>
</div>
</div>
  `;

  content.innerHTML = main;
  const tempSelect = document.getElementById('temp');
  tempSelect.addEventListener('change', () => {
    console.log(tempSelect.value);
    render();
  });

  const nextDays = document.querySelector('.nextDays');

  const days = data.days;
  console.log(days);
  days.slice(0, 5).forEach((day) => {
    // main container
    const days = document.createElement('div');
    days.className = 'days';

    // left section
    const left = document.createElement('div');
    left.className = 'left';

    // image
    const img = document.createElement('img');
    img.src = '#';
    img.alt = '';

    // report container
    const report = document.createElement('div');
    report.className = 'report';

    // report text
    const dayText = document.createElement('div');
    dayText.textContent = day.datetime;

    const conditionText = document.createElement('div');
    conditionText.textContent = day.conditions;

    // append report text
    report.appendChild(dayText);
    report.appendChild(conditionText);

    // assemble left
    left.appendChild(img);
    left.appendChild(report);

    // right section
    const right = document.createElement('div');
    right.className = 'right';

    // temp container
    const temp = document.createElement('div');
    temp.className = 'temp';

    const currentTemp = document.createElement('span');
    currentTemp.className = 'current-temp';
    currentTemp.textContent = day.temp;

    const tempScales = document.createElement('span');
    tempScales.className = 'temp-scales';
    tempScales.textContent = '°C';

    temp.appendChild(currentTemp);
    temp.appendChild(tempScales);

    // wind + humidity
    const windHumidity = document.createElement('div');
    windHumidity.className = 'wind-humidity';

    const wind = document.createElement('div');
    wind.className = 'wind';
    wind.textContent = `Wind: ${day.windspeed} mph`;

    const humidity = document.createElement('div');
    humidity.className = 'humidity';
    humidity.textContent = `Humidity: ${day.humidity}`;

    windHumidity.appendChild(wind);
    windHumidity.appendChild(humidity);

    // assemble right
    right.appendChild(temp);
    right.appendChild(windHumidity);

    // assemble everything
    days.appendChild(left);
    days.appendChild(right);

    // finally append to DOM
    nextDays.appendChild(days);
  });
}
