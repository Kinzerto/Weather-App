import sunny from '../assets/images/rain.gif';
import { formatSmartDate, formatTime } from '../utils/date.js';

export function upcomingWeather(days, parent, isDate = false) {
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
    img.src = sunny;
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
    tempScales.textContent = '°F';

    temp.appendChild(currentTemp);
    temp.appendChild(tempScales);

    // wind + humidity
    const windHumidity = document.createElement('div');
    windHumidity.className = 'wind-humidity';

    const wind = document.createElement('div');
    wind.className = 'wind';
    wind.textContent = `Wind: ${day.windspeed}mph`;

    const humidity = document.createElement('div');
    humidity.className = 'humidity';
    humidity.textContent = `Humidity: ${day.humidity}%`;

    windHumidity.appendChild(wind);
    windHumidity.appendChild(humidity);

    // assemble right
    right.appendChild(temp);
    right.appendChild(windHumidity);

    // assemble everything
    days.appendChild(left);
    days.appendChild(right);

    parent.appendChild(days);
  });
}
