import { upcomingWeather } from './render-upcoming-weather.js';
import sunny from '../assets/images/rain.gif';
import { riseAndSet } from './render-astronomy.js';

const content = document.querySelector('.content');
const cityLoc = document.querySelector('.city');

export function dataCity(city) {
  console.log(city);
}

export function renderCurrentWeather(data) {
  if (!data) return;
  const weather = data.weather;
  cityLoc.textContent = weather.weatherData.resolvedAddress;
  const astronomy = data.astronomy;
  const current = weather.current;

  const main = `
          <div class="weather-now">
            <div class="current-weather">
              <div class="top">
                <div class="group">
                  Current Weather
                  <select name="temp" id="temp">
                    <option value="far">Fahrenheit</option>
                    <option value="cel">Celcuis</option>
                  </select>
                </div>
                <div class="dateNow">Wednesday</div>
              </div>
              <div class="weatherStat">
                <div class="temp">
                  <span class="current-temp">${current.temp}</span>
                  <span class="temp-scales">°F</span>
                </div>
              </div>
              <div class="stat-feel">
                <div class="group">
                  <div class="feels">Feels like <span class="current-temp">${current.feelslike}</span>°</div>
                  <div class="status">${current.conditions}</div>
                </div>
                <img src="${sunny}" alt="" />
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
                  <div class="status">${current.windspeed}mph</div>
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
                  <div class="status">${current.visibility}</div>
                </div>
              </div>
              <div class="condition">
                <i class="bi bi-compass"></i>
                <div class="group">
                  <span class="title">Wind Direction</span>
                  <div class="status">${current.winddir}° | ${getWindDir(current.winddir)}</div>
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

  const weatherNow = document.querySelector('.weather-now');
  const nextDays = document.querySelector('.nextDays');

  const observer = new ResizeObserver(() => {
    const height = weatherNow.offsetHeight;
    nextDays.style.maxHeight = height + 'px';
  });

  observer.observe(weatherNow);

  const daysTemp = document.createElement('div');
  daysTemp.classList.add('daysTemp');
  nextDays.appendChild(daysTemp);
  const today_weather = weather.days[0].hours;

  const todayBtn = document.querySelector('.today');
  const tomorrowBtn = document.querySelector('.tommorrow');
  const days10Btn = document.querySelector('.days10');

  const buttons = [todayBtn, tomorrowBtn, days10Btn];

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

  upcomingWeather(today_weather, daysTemp);
  riseAndSet(astronomy);
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
