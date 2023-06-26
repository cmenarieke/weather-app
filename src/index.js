/// Date and Time
let now = new Date();
let weekdays = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];

let weekday = weekdays[now.getDay()];

let weekdayNotification = document.querySelector(".current-day");
weekdayNotification.innerHTML = `Today is ${weekday}`;

let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = `${hour}:${minutes}`;

let time = document.querySelector(`.current-time`);
time.innerHTML = `and the time is ${currentTime}`;

/// Conditions & Temperature Update

function updateTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector(
    `#todays-temp`
  ).innerHTML = `Current temperature: ${temperature}`;
  weatherConditions(response);
}

function weatherConditions(response) {
  let conditions = response.data.weather[0].description;
  document.querySelector(`.weather-condition`).innerHTML = `${conditions}`;
  let humidity = response.data.main.humidity;
  document.querySelector(
    `.todays-humidity`
  ).innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector(`.todays-wind`).innerHTML = `Wind Speed: ${wind}/mph`;
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector(`#search-city`).value;
  document.querySelector(
    `.city-search`
  ).innerHTML = `Today's temperature in ${cityInput}`;
  let unit = `imperial`;
  let apiKey = `cb286bad3607984b41ed10c8de5cf00e`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(updateTemperature);
}

let newCity = document.querySelector(`#new-city-search`);
newCity.addEventListener("submit", citySearch);

function showCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector(
    `#todays-temp`
  ).innerHTML = `Current temperature: ${temperature}`;
  let location = response.data.name;
  document.querySelector(
    `.city-search`
  ).innerHTML = `Today's temperature in ${location}`;

  weatherConditions(response);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = `imperial`;
  let apiKey = `cb286bad3607984b41ed10c8de5cf00e`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentTemp);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let locationButton = document.querySelector(`#current-location`);
locationButton.addEventListener(`click`, getLocation);

function defaultCity(city) {
  let unit = `imperial`;
  let apiKey = `cb286bad3607984b41ed10c8de5cf00e`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentTemp);
}

defaultCity("Honolulu");

/// Bonus Challenge

function updateFahrenheitTemp(event) {
  event.preventDefault();
  let update = document.querySelector(`#todays-temp`);
  update.innerHTML = `76`;
}

let fahrenheitTemp = document.querySelector(`.fahrenheit`);
fahrenheitTemp.addEventListener("click", updateFahrenheitTemp);

function updateCelsiusTemp(event) {
  event.preventDefault();
  let update = document.querySelector(`#todays-temp`);
  update.innerHTML = `24`;
}

let celsiusTemp = document.querySelector(`.celsius`);
celsiusTemp.addEventListener("click", updateCelsiusTemp);
