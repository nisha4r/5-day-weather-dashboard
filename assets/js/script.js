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

//With city name , get weather details from api
function getPresentWeather(cityName) {
    let cityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    fetch(cityUrl).then(function (response) {
        return response.json();

    }).then(function (data) {

        console.log("present: " + data);
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

//Five day forecast based on latitude and longitude
function fiveDayForecast(lat, lon) {
    let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(forecastUrl).then(function (response) {
        return response.json();

    }).then(function (data) {
        console.log("forecast: " + data);
        let fiveDayForecastEl = $(".day-forecast");
        console.log(fiveDayForecastEl.length);
        for (let i = 0; i < fiveDayForecastEl.length; i++) {
            let index = i * 8 + 5;
            console.log("day " + i + " :" + JSON.stringify(data.list[index]));
            let forecastDate = new Date(data.list[index].dt * 1000);
            let forecastDay = forecastDate.getDate();
            let forecastMonth = forecastDate.getMonth();
            let forecastYear = forecastDate.getFullYear();
            //date
            let forecastEl = $("<p></p>").text(forecastMonth + "/" + forecastDay + "/" + forecastYear).attr("class", "mt-3 mb-0 forecast-date");
            forecastEl.appendTo(fiveDayForecastEl[i]);
            //image
            let imageEl = $("<img></img>").attr("src", "https://openweathermap.org/img/wn/" + data.list[index].weather[0].icon + "@2x.png").attr("alt", data.list[index].weather[0].description);
            imageEl.appendTo(fiveDayForecastEl[i]);

            //temp
            let forecastTempEl = $("<p></p>").text(" Temp: " + calcFahrenheit(data.list[index].main.temp));
            forecastTempEl.append("&#176;F");
            forecastTempEl.appendTo(fiveDayForecastEl[i]);

            //wind
            let forecastWindEl = $("<p></p>").text("Wind: " + data.list[index].wind.speed + " MPH");
            forecastWindEl.appendTo(fiveDayForecastEl[i]);

            //humidity
            let forecastHumidityEl = $("<p></p>").text("Humidity: " + data.list[index].main.humidity + "%");
            forecastHumidityEl.appendTo(fiveDayForecastEl[i]);
        }
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

