document.addEventListener("DOMContentLoaded", function () {

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
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error);
    });
}

//display weather data on the page
function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById("weatherData");
    weatherDataDiv.innerHTML = "";
    for (let i = 0; i < data.list.length; i++) {
        const forcast = data.list[i];
        const forcastDate = new Date(forcast.dt * 1000); 
        const temperature = forcast.main.temp;
        const description = forcast.weather[0].description
        //create HTML elements to display forcast data
        const forcastDiv = document.createElement("div");
        forcastDiv.classList.add("forcast-item");
        forcastDiv.innerHTML = `
        <h3>Date: ${forcastDate.toDateString()}</h3>
        <p>Time: ${forcastDate.toTimeString()}</p>
        <p>Temperature: ${temperature} K</p>
        <p>Weather: ${description}</p>
        `;

        //append forecast data to weatherDataDiv
        weatherDataDiv.appendChild(forcastDiv);
    }
}

    //event listener to the form submission 
    document.getElementById("searchForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const cityName = document.getElementById("cityInput").value;
        fetchWeatherData(cityName);
    });

});