const weatherForm = document.getElementById("weather-form");
const titleBar = document.getElementById("title-bar");
const weatherInfo = document.getElementById("weather-info");
const cityArea = document.getElementById("city-area");
const tempArea = document.getElementById("temp-area");
const description = document.getElementById("description");

weatherInfo.style.display = "none";

async function fetchWeather(city) {
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

    const cityName = document.createElement("h2");
    cityName.textContent = data.name;
    cityName.classList.add("city-name");
    cityArea.appendChild(cityName);

    const countryShorter = document.createElement("h2");
    countryShorter.textContent = data.sys.country;
    countryShorter.classList.add("country-shorter");
    cityArea.appendChild(countryShorter);

    weatherInfo.appendChild(cityArea);

    const weatherIcon = document.createElement("img");
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    tempArea.appendChild(weatherIcon);

    const temp = document.createElement("p");
    temp.textContent = ` ${Math.round(((data.main.temp - 32) * 5) / 9)}°C`;
    temp.classList.add("temperature");
    tempArea.appendChild(temp);
    weatherInfo.appendChild(tempArea);

    const status = document.createElement("p");
    status.textContent = data.weather[0].description;
    status.classList.add("description-text");
    description.appendChild(status);

    weatherInfo.appendChild(description);
  } catch (error) {
    console.error("Hata oluştu:", error.message);
  }
}

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = document.getElementById("search-bar").value;

  if (searchText) {
    titleBar.style.display = "none";
    weatherInfo.style.display = "block";
    fetchWeather(searchText);
  }
});
