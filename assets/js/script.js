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

        console.log(data);
        let presentDate = new Date(data.dt * 1000);
        let date = presentDate.getDate();
        let month = presentDate.getMonth();
        let year = presentDate.getFullYear();
        presentCityEl.text(data.name + " (" + month + "/" + date + "/" + year + ") ");




    });
}


function search() {
    console.log(cityEl);
    let cityName = cityEl.val();
    console.log(cityName);
    getPresentWeather(cityName);
}

