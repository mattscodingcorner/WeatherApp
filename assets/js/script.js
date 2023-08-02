document.addEventListener("DOMContentLoaded", function () {
// JavaScript to fetch weather data 
const apiKey = "51f615dbed5fbc27f3137d2ba941cf4a";

// Function to fetch weather data
function fetchWeatherData(cityName) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={51f615dbed5fbc27f3137d2ba941cf4a}';

    //making the API request using fetch()
    fetch(apiUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        //process the weather data to the console
        console.log("Weather data:", data);
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error);
    });
}

//display weather data on the page
function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById("weatherData");
    weatherDataDiv.innerHTML = `
    <h2>Weather Forcast for ${data.city.name}</h2>
    <p>Teamperature: ${data.list[0].main.temp} K</p>
    <p>Weather: ${data.list[0].weather[0].description}</p>
`;
}

    //event listener to the form submission 
    document.getElementById("searchForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const cityName = document.getElementById("cityInput").value;
        fetchWeatherData(cityName);
    });

});