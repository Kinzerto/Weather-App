import { formatSmartDate, calculateTimeDistance } from '../utils/date.js';
import { convertTo12Format } from '../utils/date.js';
import sunriseImg from '../assets/images/sunrise.png';
import sunsetImg from '../assets/images/sunset.png';

export function riseAndSet(data) {
  if (!data) return;
  const astronomy = data;
  const date = astronomy.date;
  const isDate = astronomy.isDateNow;
  const sunrise = astronomy.sunrise;
  const sunset = astronomy.sunset;
  const dusk = astronomy.dusk;
  const dawn = astronomy.dawn;

  const sunrise12HoursFormat = convertTo12Format(date, sunrise);
  const sunset12HoursFormat = convertTo12Format(date, sunset);
  const dusk12HoursFormat = convertTo12Format(date, dusk);
  const dawn12HoursFormat = convertTo12Format(date, dawn);

  const weatherNow = document.querySelector('.weather-now');
  const sunAndMoon = document.createElement('div');
  sunAndMoon.className = 'sun-moon';

  const sun = `
    <div class="top">
      <div class="day">${formatSmartDate(date)}</div>
      <div class="date">${isDate}</div>
    </div>

    <div class="bottom">
      <div class="sunrise">
        <span>Sunrise</span>
        <img src="${sunriseImg}" alt="" />
        <div class="time sunrise">
          ${sunrise12HoursFormat}
        </div>
        <div class="type sunrise">Dawn: ${dawn12HoursFormat}</div>
        <p>
          Sunrise today in
          <span style=" text-transform: capitalize">
            calbiga
          </span>
          ${isEventDone(sunrise)} ${convertTo12Format(date, sunrise)} <br>
          (${calculateTimeDistance(date, sunrise)})
        </p>
      </div>

      <div class="sunset">
        <span>Sunset</span>
        <img src="${sunsetImg}" alt="" />
        <div class="time sunrise">
          ${sunset12HoursFormat}
        </div>
        <div class="type sunset">Dusk: ${dusk12HoursFormat}</div>
        <p>
          Sunset today in
          <span style=" text-transform: capitalize">
            calbiga
          </span>
          ${isEventDone(sunset)} ${convertTo12Format(date, sunset)} <br>
          (${calculateTimeDistance(date, sunset)})
        </p>
      </div>
    </div>
  `;
  sunAndMoon.innerHTML = sun;
  console.log(isEventDone(sunrise, date));
  console.log(isEventDone(sunset, date));
  weatherNow.appendChild(sunAndMoon);
}

function isEventDone(timeNow) {
  console.log(timeNow);
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();

  if (current < toMinutes(timeNow)) {
    return `will be at`;
  } else {
    return `was at`;
  }
}
function toMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}
