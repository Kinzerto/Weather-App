import { upcomingWeather } from './render-upcoming-weather.js';
import { riseAndSet } from './render-astronomy.js';
import { toCelsius, toKm } from '../utils/unitsConverter.js';
import { state } from '../state.js';
import { getWeatherImage } from '../utils/dynamicIcon.js';
import { format } from 'date-fns';

const content = document.querySelector('.content');
const cityLoc = document.querySelector('.city');

export async function renderCurrentWeather(data) {
  if (!data) return;
  const weather = data.weather;
  const location = weather.weatherData.resolvedAddress.toLowerCase().split(',');
  cityLoc.textContent = location[1]
    ? `${location[0]}, ${location[1]}`
    : location[0];
  const astronomy = data.astronomy;
  const current = weather.current;
  const weatherIcon = await getWeatherImage(current.icon);

  const main = `
          <div class="weather-now">
            <div class="current-weather">
              <div class="top">
                <div class="group">
                  Current Weather
                  <div class="unitGroup">
                  <select name="unit" id="unit">
                    <option value="miles">Mile</option>
                    <option value="km">Km</option>
                  </select>
                  <select name="temp" id="temp">
                    <option value="far">°F</option>
                    <option value="cel">°C</option>
                  </select>
                  </div>
                </div>
                <div class="dateNow">${format(new Date(), 'EEEE')}</div>
              </div>
              <div class="weatherStat">
                <div class="temp">
                  <span class="current-temp" data-current-temp="${current.temp}">${current.temp}</span>
                  <span class="temp-scales">°F</span>
                </div>
              </div>
              <div class="stat-feel">
                <div class="group">
                  <div class="feels" >Feels like <span class="current-temp" data-current-temp="${current.feelslike}">${current.feelslike}</span>°</div>
                  <div class="status">${current.conditions}</div>
                </div>
                <img src="${weatherIcon}" alt="" />
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
                <i class="bi bi-droplet"></i>
                <div class="group">
                  <span class="title">Humidity</span>
                  <div class="status">${current.humidity}%</div>
                </div>
              </div>
              <div class="condition">
                <i class="bi bi-wind"></i>
                <div class="group">
                  <span class="title">Wind Speed</span>
                  <div class="status mph" data-mph-val="${current.windspeed}">${current.windspeed} mph</div>
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
                  <div class="status miles" data-miles-val="${current.visibility}">${current.visibility} miles</div>
                </div>
              </div>
              <div class="condition">
                <i class="bi bi-compass"></i>
                <div class="group">
                  <span class="title">Wind Direction</span>
                  <div class="status">${current.winddir}° | <small>${getWindDir(current.winddir)}</small></div>
                </div>
              </div>
            </div>

          </div>
        
        <div class="nextDays">
          <div class="top">
            <button class="today selected">Today</button>
            <button class="tommorrow">Tommorow</button>
            <button class="days10">10 Days</button>
          </div>
        </div>
        </div>
  `;
  content.innerHTML = main;

  const todayBtn = document.querySelector('.today');
  const tomorrowBtn = document.querySelector('.tommorrow');
  const days10Btn = document.querySelector('.days10');
  const weatherNow = document.querySelector('.weather-now');
  const nextDays = document.querySelector('.nextDays');

  const today_weather = weather.days[0].hours;
  const buttons = [todayBtn, tomorrowBtn, days10Btn];

  //SELECT ELEMENT AND ITS ELEMENTS NEEDED
  const distanceUnit = document.querySelector('select#unit');
  const tempUnit = document.querySelector('select#temp');

  const daysTemp = document.createElement('div');
  daysTemp.classList.add('daysTemp');
  nextDays.appendChild(daysTemp);

  const observer = new ResizeObserver(() => {
    const height = weatherNow.offsetHeight;
    nextDays.style.maxHeight = height + 'px';
  });

  observer.observe(weatherNow);

  function setActive(activeBtn) {
    buttons.forEach((btn) => btn.classList.remove('selected'));
    activeBtn.classList.add('selected');
  }

  todayBtn.addEventListener('click', () => {
    upcomingWeather(today_weather, daysTemp);
    setActive(todayBtn);
  });

  tomorrowBtn.addEventListener('click', () => {
    const tommorrow_weather = weather.days[1].hours;
    upcomingWeather(tommorrow_weather, daysTemp);
    setActive(tomorrowBtn);
  });

  days10Btn.addEventListener('click', () => {
    const tommorrow_weather = weather.days;
    upcomingWeather(tommorrow_weather, daysTemp, true);
    setActive(days10Btn);
  });

  riseAndSet(astronomy);
  upcomingWeather(today_weather, daysTemp);

  // SELECT ELEMENT
  tempUnit.addEventListener('change', () => {
    const currentTemp = document.querySelectorAll('.current-temp');
    const tempScales = document.querySelectorAll('.temp-scales');
    state.scale = tempUnit.value;
    if (tempUnit.value === 'cel') {
      currentTemp.forEach((temp) => {
        const dataAttr = temp.dataset.currentTemp;
        temp.textContent = toCelsius(dataAttr);
      });

      tempScales.forEach((scales) => {
        scales.textContent = '°C';
      });
    } else {
      currentTemp.forEach((temp) => {
        const dataAttr = temp.dataset.currentTemp;
        temp.textContent = dataAttr;
      });

      tempScales.forEach((scales) => {
        scales.textContent = '°F';
      });
    }
  });

  distanceUnit.addEventListener('change', () => {
    const windSpeedEl = document.querySelector('.status.mph');
    const visibilityEl = document.querySelector('.status.miles');
    const windEl = document.querySelectorAll('.wind');
    state.isKm = distanceUnit.value;
    if (distanceUnit.value === 'km') {
      windSpeedEl.textContent = `${toKm(windSpeedEl.dataset.mphVal)} kmh`;
      visibilityEl.textContent = `${toKm(visibilityEl.dataset.milesVal)} km`;
      windEl.forEach((el) => {
        el.textContent = `Wind: ${toKm(el.dataset.windMphVal)} kmh`;
      });
    } else {
      windSpeedEl.textContent = `${windSpeedEl.dataset.mphVal} mph`;
      visibilityEl.textContent = `${visibilityEl.dataset.milesVal} miles`;
      windEl.forEach((el) => {
        el.textContent = `Wind: ${el.dataset.windMphVal} mph`;
      });
    }
  });
}

function getWindDir(deg) {
  if (deg >= 337.5 || deg < 22.5) return 'North'; // N
  if (deg < 67.5) return 'North East'; // NE
  if (deg < 112.5) return 'East'; // E
  if (deg < 157.5) return 'South East'; // SE
  if (deg < 202.5) return 'South East'; // S
  if (deg < 247.5) return 'South West'; // SW
  if (deg < 292.5) return 'West'; // W
  return 'North West'; // NW
}
