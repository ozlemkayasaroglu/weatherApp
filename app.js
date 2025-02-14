const container = document.getElementById("container");
const weatherForm = document.getElementById("weather-form");
const titleBar = document.getElementById("title-bar");
const weatherSet = document.getElementById("weather-set");
const weatherInfo = document.getElementById("weather-info");
const cityArea = document.getElementById("city-area");
const tempArea = document.getElementById("temp-area");
const description = document.getElementById("description");
const weatherDetails = document.getElementById("weather-details");
const weatherBox = document.getElementById("weather-box");

const feelsLikeArea = document.getElementById("feelsLikeArea");
const feelsLikeTextArea = document.getElementById("feelsLikeTextArea");
const humidityArea = document.getElementById("humidityArea");
const humidityTextArea = document.getElementById("humidityTextArea");
const windSpeedTextArea = document.getElementById("windSpeedTextArea");
const windSpeedArea = document.getElementById("windSpeedArea");
const pressureTextArea = document.getElementById("pressureTextArea");
const pressureArea = document.getElementById("pressureArea");

const feelsLikeTemp = document.getElementById("feels-like-temp");
const humidityTemp = document.getElementById("humidity-temp");
const windSpeedTemp = document.getElementById("wind-speed-temp");
const pressureTemp = document.getElementById("pressure-temp");

weatherInfo.style.display = "none";
weatherDetails.style.display = "none";

function convertToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

async function updateWeatherDetails(data) {
  feelsLikeTemp.textContent = `${convertToCelsius(data.main.feels_like)}°C`;
  feelsLikeTextArea.appendChild(feelsLikeTemp);
  feelsLikeArea.appendChild(feelsLikeTextArea);

  humidityTemp.textContent = `${convertToCelsius(data.main.humidity)}%`;
  humidityTextArea.appendChild(humidityTemp);
  humidityArea.appendChild(humidityTextArea);

  windSpeedTemp.textContent = `${data.wind.speed}m/s`;
  windSpeedTemp.classList.add("wind-speed-temp");
  windSpeedTextArea.appendChild(windSpeedTemp);

  pressureTemp.textContent = `${data.main.pressure}hPa`;
  pressureTextArea.appendChild(pressureTemp);
  pressureArea.appendChild(pressureTextArea);
}
async function fetchWeather(city) {
  cityArea.innerHTML = "";
  tempArea.innerHTML = "";
  description.innerHTML = "";

  const loadingSpinner = document.createElement("div");
  loadingSpinner.classList.add("loading-spinner");
  loadingSpinner.innerHTML = `
  <div class="spinner"></div>
  <p>Hava durumu yükleniyor...</p>
`;
  weatherInfo.appendChild(loadingSpinner);

  try {
    const response = await fetch(
      `https://weather-api-chi-two.vercel.app/weather?city=${city}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    weatherInfo.removeChild(loadingSpinner);

    if (!data || !data.name) {
      alert("Şehir bulunamadı.");
      return;
    }

    const cityName = document.createElement("h2");
    cityName.textContent = data.name;
    cityName.classList.add("city-name");

    const countryShorter = document.createElement("h2");
    countryShorter.textContent = data.sys.country;
    countryShorter.classList.add("country-shorter");

    const weatherIcon = document.createElement("img");
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const temp = document.createElement("p");
    temp.textContent = ` ${Math.round(((data.main.temp - 32) * 5) / 9)}°C`;
    temp.classList.add("temperature");

    const status = document.createElement("p");
    status.textContent = data.weather[0].description;
    status.classList.add("description-text");

    cityArea.appendChild(cityName);
    cityArea.appendChild(countryShorter);
    tempArea.appendChild(weatherIcon);
    tempArea.appendChild(temp);
    description.appendChild(status);
    weatherInfo.appendChild(weatherBox);

    await updateWeatherDetails(data);
  } catch (error) {
    if (weatherInfo.contains(loadingSpinner)) {
      weatherInfo.removeChild(loadingSpinner);
    }
    console.error("Hata oluştu:", error.message);
    alert("Şehir bulunamadı.");
  }
}

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = document.getElementById("search-bar").value;

  if (searchText) {
    titleBar.style.display = "none";
    weatherInfo.style.display = "block";
    weatherDetails.style.display = "block";
    fetchWeather(searchText);
  }
});
