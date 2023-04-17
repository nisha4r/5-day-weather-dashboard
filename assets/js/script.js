let presentEl = $('#present');
let cityEl = $('#city-input');
let searchButtonEl = $('#search-button');
let presentCityEl = $('#present-city');
let presentWeatherPicEl = $('#present-weather-pic');
let tempEl = $('#temp');
let windSpeedEl = $('#wind-speed');
let humidityEl = $('#humidity');
let DayHeaderEl = $('#5-day-header');
let searchLocalStorage = localStorage.getItem("search-history");
let searchHistoryEl = $('#search-history');
const apiKey = "d5a2bbdd1d9a734f5dc0711353e26539"; // api key
function getPresentWeather(cityName) {
    let cityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    fetch(cityUrl).then(function (response) {
        return response.json();

    }).then(function (data) {

        console.log("present: "+data);
        let presentDate = new Date(data.dt * 1000);
        let date = presentDate.getDate();
        let month = presentDate.getMonth();
        let year = presentDate.getFullYear();
        presentCityEl.text(data.name + " (" + month + "/" + date + "/" + year + ") ");
        presentWeatherPicEl.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
        presentWeatherPicEl.attr("alt", data.weather[0].description);
        tempEl.text("Temp: " + calcFahrenheit(data.main.temp));
        tempEl.append("&#176;F");
        windSpeedEl.text("Wind: " + data.wind.speed + " MPH");
        humidityEl.text("Humidity: " + data.main.humidity + "%");

        //calling 5 day forecast and pass latitude , longitude in function.
        fiveDayForecast(data.coord.lat, data.coord.lon);




    });
}

function fiveDayForecast(lat, lon) {
    let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(forecastUrl).then(function (response) {
        return response.json();

    }).then(function (data) {
        console.log("forecast: "+data);
        let fiveDayForecastEl = $(".day-forecast");
        console.log(fiveDayForecastEl.length);
    });
}


function search() {
    console.log(cityEl);
    let cityName = cityEl.val();
    console.log(cityName);
    getPresentWeather(cityName);
}

function calcFahrenheit(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}

