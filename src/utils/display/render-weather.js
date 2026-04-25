import { formatSmartDate, formatTime } from '../date.js';
import { format } from 'date-fns';

const content = document.querySelector('.content');
const cityLoc = document.querySelector('.city');

export function render(data) {
  console.log(data);
  const current = data.currentConditions;
  cityLoc.textContent = data.resolvedAddress.split(',')[0];
  console.log(data.days[0]);
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
      <div class="dateNow">
      ${format(data.days[0].datetime, 'EEEE')}
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
    <button class="today selected">Today</button>
    <button class="tommorrow">Tommorow</button>
    <button class="days10">10 Days</button>
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
  const daysTemp = document.createElement('div');
  daysTemp.classList.add('daysTemp');
  nextDays.appendChild(daysTemp);

  const todayBtn = document.querySelector('.today');
  const tomorrowBtn = document.querySelector('.tommorrow');
  const days10Btn = document.querySelector('.days10');

  const buttons = [todayBtn, tomorrowBtn, days10Btn];

  function setActive(activeBtn) {
    buttons.forEach((btn) => btn.classList.remove('selected'));
    activeBtn.classList.add('selected');
  }

  const today_weather = data.days[0].hours;

  todayBtn.addEventListener('click', () => {
    upcomingWeather(today_weather, daysTemp);
    setActive(todayBtn);
  });

  tomorrowBtn.addEventListener('click', () => {
    const tommorrow_weather = data.days[1].hours;
    upcomingWeather(tommorrow_weather, daysTemp);
    setActive(tomorrowBtn);
  });

  days10Btn.addEventListener('click', () => {
    const tommorrow_weather = data.days;
    upcomingWeather(tommorrow_weather, daysTemp, true);
    setActive(days10Btn);
  });

  upcomingWeather(today_weather, daysTemp);
}

function upcomingWeather(days, parent, isDate = false) {
  parent.replaceChildren();
  let conditionNOw = isDate ? days.slice(2) : days;
  conditionNOw.forEach((day) => {
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
    // dayText.textContent = formatSmartDate(day.datetime);
    dayText.textContent = isDate
      ? formatSmartDate(day.datetime)
      : formatTime(day.datetime);

    const conditionText = document.createElement('div');
    conditionText.classList.add('condition');
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
    parent.appendChild(days);
  });
}
