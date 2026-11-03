// ---------- API URLs ----------

const GEOCODING_API =
    "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast";


// ---------- HTML Elements ----------

const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");

const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");

const weatherDashboard = document.getElementById("weatherDashboard");

const currentWeatherTitle =
    document.getElementById("currentWeatherTitle");

const weatherDate =
    document.getElementById("weatherDate");

const weatherIcon =
    document.getElementById("weatherIcon");

const temperature =
    document.getElementById("temperature");

const weatherCondition =
    document.getElementById("weatherCondition");

const feelsLike =
    document.getElementById("feelsLike");

const humidity =
    document.getElementById("humidity");

const windSpeed =
    document.getElementById("windSpeed");

const rainChance =
    document.getElementById("rainChance");

const weatherCode =
    document.getElementById("weatherCode");

const forecastContainer =
    document.getElementById("forecastContainer");


// ---------- Weather Code Information ----------

function getWeatherInfo(code) {

    if (code === 0) {
        return {
            text: "Clear Sky",
            icon: "☀️"
        };
    }

    if (code === 1 || code === 2) {
        return {
            text: "Partly Cloudy",
            icon: "🌤️"
        };
    }

    if (code === 3) {
        return {
            text: "Overcast",
            icon: "☁️"
        };
    }

    if ([45, 48].includes(code)) {
        return {
            text: "Foggy",
            icon: "🌫️"
        };
    }

    if ([51, 53, 55].includes(code)) {
        return {
            text: "Drizzle",
            icon: "🌦️"
        };
    }

    if ([56, 57].includes(code)) {
        return {
            text: "Freezing Drizzle",
            icon: "🌧️"
        };
    }

    if ([61, 63, 65].includes(code)) {
        return {
            text: "Rain",
            icon: "🌧️"
        };
    }

    if ([66, 67].includes(code)) {
        return {
            text: "Freezing Rain",
            icon: "🌧️"
        };
    }

    if ([71, 73, 75, 77].includes(code)) {
        return {
            text: "Snow",
            icon: "❄️"
        };
    }

    if ([80, 81, 82].includes(code)) {
        return {
            text: "Rain Showers",
            icon: "🌦️"
        };
    }

    if ([85, 86].includes(code)) {
        return {
            text: "Snow Showers",
            icon: "🌨️"
        };
    }

    if ([95, 96, 99].includes(code)) {
        return {
            text: "Thunderstorm",
            icon: "⛈️"
        };
    }

    return {
        text: "Unknown",
        icon: "🌡️"
    };
}


// ---------- Loading State ----------

function showLoading() {

    loadingMessage.hidden = false;
    errorMessage.hidden = true;

    weatherDashboard.hidden = true;

    searchButton.disabled = true;
    searchButton.textContent = "Searching...";
}


// ---------- Hide Loading ----------

function hideLoading() {

    loadingMessage.hidden = true;

    searchButton.disabled = false;
    searchButton.textContent = "Search Weather";
}


// ---------- Error Handling ----------

function showError(message) {

    hideLoading();

    errorText.textContent = message;
    errorMessage.hidden = false;

    weatherDashboard.hidden = true;
}


// ---------- Get City Coordinates ----------

async function getCityCoordinates(city) {

    const url =
        `${GEOCODING_API}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to search for the city.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(
            "City not found. Please check the spelling and try again."
        );
    }

    return data.results[0];
}


// ---------- Get Weather Data ----------

async function getWeatherData(latitude, longitude) {

    const url =
        `${WEATHER_API}?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
        `&temperature_unit=celsius` +
        `&wind_speed_unit=kmh` +
        `&timezone=auto` +
        `&forecast_days=5`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            "Weather service is currently unavailable."
        );
    }

    return await response.json();
}


// ---------- Format Date ----------

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


// ---------- Format Forecast Day ----------

function formatForecastDay(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short"
    });
}


// ---------- Display Current Weather ----------

function displayCurrentWeather(city, data) {

    const current = data.current;

    const weatherInfo =
        getWeatherInfo(current.weather_code);

    currentWeatherTitle.textContent =
        `${city.name}, ${city.country_code}`;

    weatherDate.textContent =
        formatDate(current.time);

    weatherIcon.textContent =
        weatherInfo.icon;

    temperature.textContent =
        Math.round(current.temperature_2m);

    weatherCondition.textContent =
        weatherInfo.text;

    feelsLike.textContent =
        `Feels like ${Math.round(current.apparent_temperature)}°C`;

    humidity.textContent =
        `${current.relative_humidity_2m}%`;

    windSpeed.textContent =
        `${Math.round(current.wind_speed_10m)} km/h`;

    rainChance.textContent =
        `${current.precipitation || 0} mm`;

    weatherCode.textContent =
        current.weather_code;
}


// ---------- Display 5-Day Forecast ----------

function displayForecast(data) {

    const daily = data.daily;

    forecastContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {

        const weatherInfo =
            getWeatherInfo(daily.weather_code[i]);

        const card =
            document.createElement("article");

        card.className = "forecast-card";

        card.innerHTML = `
            <p class="forecast-day">
                ${formatForecastDay(daily.time[i])}
            </p>

            <div class="forecast-icon" aria-hidden="true">
                ${weatherInfo.icon}
            </div>

            <p class="forecast-condition">
                ${weatherInfo.text}
            </p>

            <p class="forecast-temperature">
                ${Math.round(daily.temperature_2m_max[i])}°C
            </p>

            <p class="forecast-range">
                Low ${Math.round(daily.temperature_2m_min[i])}°C
            </p>

            <p class="forecast-range">
                Rain ${daily.precipitation_probability_max[i] ?? 0}%
            </p>
        `;

        forecastContainer.appendChild(card);
    }
}


// ---------- Main Weather Function ----------

async function searchWeather(cityName) {

    showLoading();

    try {

        // Step 1: Find city coordinates
        const city =
            await getCityCoordinates(cityName);

        // Step 2: Fetch weather data
        const weatherData =
            await getWeatherData(
                city.latitude,
                city.longitude
            );

        // Step 3: Display current weather
        displayCurrentWeather(
            city,
            weatherData
        );

        // Step 4: Display 5-day forecast
        displayForecast(weatherData);

        // Show dashboard
        weatherDashboard.hidden = false;

        // Remove previous error
        errorMessage.hidden = true;

    } catch (error) {

        console.error("Weather Error:", error);

        showError(
            error.message ||
            "Something went wrong. Please try again."
        );

    } finally {

        hideLoading();
    }
}


// ---------- Form Submit ----------

weatherForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const cityName =
        cityInput.value.trim();

    if (!cityName) {

        showError(
            "Please enter a city name."
        );

        return;
    }

    searchWeather(cityName);
});