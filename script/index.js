import { getGeoLocation } from "../script/getLocation.js";

const apiKey = "1e3c6b472bf8fdebe863a4eef8b3be01";
const apiUrlCity =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrlCoords =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const searchBox = document.querySelector(".js-search-input");
const searchBtn = document.querySelector(".search-button-js");
const weatherIcon = document.querySelector(".icon-weather");

window.handleGeoClick = () => {
  getGeoLocation(checkWeather);
};

async function checkWeather(query) {
  // const response = await fetch(apiUrl + query + "&appid=" + apiKey);
  let url;
  if (
    typeof query === "object" &&
    query !== null &&
    "lat" in query &&
    "lon" in query
  ) {
    url = `${apiUrlCoords}lat=${query.lat}&lon=${query.lon}&appid=${apiKey}`;
  } else if (typeof query === "string") {
    url = `${apiUrlCity}${query}&appid=${apiKey}`;
  } else {
    alert("Invalid weather query.");
    return;
  }

  const response = await fetch(url);

  if (response.status === 404) {
    alert(`invalid city name`);
    document.querySelector(".weather-container").style.display = "none";
    searchBox.value = "";
  } else {
    var data = await response.json();

    const selcus = data.main.temp;
    const minKelvin = data.main.temp_min;
    const maxKelvin = data.main.temp_max;

    const timeOffset = data.timezone;
    let sunriseTimestamp = data.sys.sunrise;
    let sunsetTimestamp = data.sys.sunset;
    const feelLike = data.main.feels_like;

    const dateOfSunrise = new Date((sunriseTimestamp + timeOffset) * 1000);
    const dateOfSunset = new Date((sunsetTimestamp + timeOffset) * 1000);

    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });

    const formatSunrise = timeFormatter.format(dateOfSunrise);
    const formatSunset = timeFormatter.format(dateOfSunset);

    document.querySelector(".degree").innerHTML = Math.round(selcus) + "°c";
    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".wind-speed").innerHTML = `${data.wind.speed} km/h`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity} %`;
    document.querySelector(".min-tem").innerHTML = Math.round(minKelvin) + "°c";
    console.log(data);
    document.querySelector(".max-temp").innerHTML =
      Math.round(maxKelvin) + "°c";
    document.querySelector(".time-sunrise").innerHTML = `${formatSunrise}`;
    document.querySelector(".time-sunset").innerHTML = `${formatSunset}`;
    document.querySelector(".feelLike").innerHTML =
      "Feels like " + Math.round(feelLike) + "°c";

    let weatherData = data.weather[0].main;

    console.log(weatherData);
    let foggyData = [
      "Mist",
      "Smoke",
      "Haze",
      "Dust",
      "Fog",
      "Sand",
      "Ash",
      "Squall",
      "Tornado",
    ];

    if (weatherData === "Thunderstorm") {
      weatherIcon.src = "./asset/image/svg/thunderstorm.svg";
    } else if (weatherData === "Drizzle") {
      weatherIcon.src = "./asset/image/svg/drizzle.svg";
    } else if (weatherData === "Rain") {
      weatherIcon.src = "./asset/image/svg/rain-day.svg";
    } else if (weatherData === "Snow") {
      weatherIcon.src = "./asset/image/svg/snow.svg";
    } else if (weatherData in foggyData) {
      weatherIcon.src = "./asset/image/svg/fog-day.svg";
    } else if (weatherData === "Clear") {
      weatherIcon.src = "./asset/image/svg/clear.svg";
    } else if (weatherData === "Clouds") {
      weatherIcon.src = "./asset/image/svg/cloudy-day.svg";
    }
    document.querySelector(".weather-container").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    checkWeather(searchBox.value);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".weather-container").style.display = "none";
});
