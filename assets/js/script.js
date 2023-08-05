document.addEventListener("DOMContentLoaded", function () {

        //call displaySearchedCities on page load
        displaySearchedCities();

// Function to fetch weather data
function fetchWeatherData(cityName) {
    const weatherApikey = "51f615dbed5fbc27f3137d2ba941cf4a";
    const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${weatherApikey}`;

    //making the API request using fetch()
    fetch(weatherApi)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        //process the weather data to the console
        console.log("Weather data:", data);
        displayWeatherData(data);
        saveSearchedCity(cityName);
        displaySearchedCities();
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error);
    });
}

// Convert Kelvin to Fahrenheit
function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9 / 5 + 32;
}

//display weather data on the page
function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById("weatherData");
    weatherDataDiv.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayForecast = data.list.find((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000);
        forecastDate.setHours(0, 0, 0, 0);
        return forecastDate.getTime() === today.getTime();
    });

    const forecastRow = document.createElement("div");
    forecastRow.classList.add("row");

    if (todayForecast) {
        const todayForecastDate = new Date(todayForecast.dt * 1000);
        const windSpeed = todayForecast.wind.speed.toFixed(2);
        const temperatureKelvin = todayForecast.main.temp;
        const temperatureFahrenheit = kelvinToFahrenheit(temperatureKelvin).toFixed(2);
        const description = todayForecast.weather[0].description;
        const weatherIcon = `http://openweathermap.org/img/wn/${todayForecast.weather[0].icon}.png`;

        const todayForecastCol = document.createElement("div");
        todayForecastCol.classList.add("col-12", "forecast-item", "today-forecast");
        todayForecastCol.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h3 class="card-title"> Today's Forecast (${todayForecastDate.toDateString()})</h3>
                <img src="${weatherIcon}" alt-"Weather Icon">
                <p>Temperature: ${temperatureFahrenheit} °F</p>
                <p>Wind Speed: ${windSpeed} MPH</p>
                <p>Weather: ${description}</p>
            </div>
        </div>        
        `;
        forecastRow.appendChild(todayForecastCol);
    }

    //Display rest of the 5 day forecast
    const forecasts = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000);
        forecastDate.setHours(0, 0, 0, 0);
        return forecastDate.getTime() !== today.getTime();
    });

    for (let i = 0; i < Math.min(forecasts.length, 5); i++) {
        const forecast = forecasts[i];
        const forecastDate = new Date(forecast.dt * 1000);
        const windSpeed = forecast.wind.speed.toFixed(2);
        const temperatureKelvin = forecast.main.temp;
        const temperatureFahrenheit = kelvinToFahrenheit(temperatureKelvin).toFixed(2);
        const description = forecast.weather[0].description;
        const weatherIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

        //bootstrap column to dispaly forecast datat
        const forecastCol = document.createElement("div");
        forecastCol.classList.add("col-sm-4", "forecast-item");
        forecastCol.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">${forecastDate.toDateString()}</h3>
                <img src="${weatherIcon}" alt="Weather Icon">
                <p>Temperature: ${temperatureFahrenheit} °F</p>
                <p>Wind Speed: ${windSpeed} MPH</p>
                <p>Weather: ${description}</p>
            </div>
        </div>        
        `;
        //append forecast data to forecastRow
        forecastRow.appendChild(forecastCol);
    }
    //append the forecastRow to weatherDataDiv
    weatherDataDiv.appendChild(forecastRow);
}

//save the searched city to the local client-side storage
function saveSearchedCity(cityName) {
    const searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
    if (!searchedCities.includes(cityName)) {
        searchedCities.push(cityName);
        localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
    }
}

//display searched cities on the page 
function displaySearchedCities() {
    const searchedCitesDiv = document.getElementById("searchedCities");
    const searchedCites = JSON.parse(localStorage.getItem("searchedCities")) || [];

    //clear previous data
    searchedCitesDiv.innerHTML = "";

    //display each searched city
    searchedCites.forEach(city => {
        const cityDiv = document.createElement("div");
        cityDiv.textContent = city;
        searchedCitesDiv.appendChild(cityDiv);
        city
    })
}

    //event listener to the form submission 
    document.getElementById("searchForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const cityName = document.getElementById("cityInput").value;
        fetchWeatherData(cityName);
    });
});