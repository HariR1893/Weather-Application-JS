const apiKey = "fd71690922b4ce193f43b0cfb671380c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchIp = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// function for updating the weather information to the screen

function updateWeatherData(data) {
  // updating weather data
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

  // updating image based on weather condition
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "Image/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "Image/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "Image/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "Image/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "Image/mist.png";
  }

  document.querySelector(".weather").style.display = "block";
}

// event handling for search the query

searchbtn.addEventListener("click", () => {
  checkWeather(searchIp.value);
});

function enterKey(event) {
  if (event.key === "Enter") {
    checkWeather(searchIp.value);
  }
}

searchIp.addEventListener("keypress", enterKey);

// function for searching city

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    var data = await response.json();
    updateWeatherData(data);
  }
}

// function for current location

async function getCurrentWeatherByLocation() {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocResp = await fetch(`${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`);

        if (currentLocResp.status === 404) {
          showError("City not found.");
        } else {
          const currentLocData = await currentLocResp.json();
          updateWeatherData(currentLocData);
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  } catch (error) {
    console.error(error);
    showError("An error occurred while fetching data.");
  }
}

// Add event listener to the current location button
const currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", getCurrentWeatherByLocation);

// ... (previous code)

// Function to show the weather information
function showWeather() {
  document.querySelector(".weather").style.display = "block";
}

// Function to show the error message
function showError() {
  document.querySelector(".error").style.display = "block";
}

// Function to hide the weather and error elements
function hideWeatherAndError() {
  document.querySelector(".weather").style.display = "none";
  document.querySelector(".error").style.display = "none";
}

// Call hideWeatherAndError to initially hide the elements
hideWeatherAndError();

// Call fetchWeatherByLocation when the page loads
window.addEventListener("load", getCurrentWeatherByLocation);

// ... (rest of the code)

