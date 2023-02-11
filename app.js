const form = document.querySelector("form");
const error = document.querySelector("#error");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const weatherSection = document.querySelector("#weather");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = form.elements.city.value;
  const apiKey = "6347b8d3bc6d6f02f12838df667b49fb";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.cod === "404") {
      throw new Error(data.message);
    }
    error.textContent = "";
    temperature.textContent = (data.main.temp - 273.15).toFixed(2) + "°C";
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity + "%";
    windSpeed.textContent = data.wind.speed + "m/s";
    weatherSection.style.display = "block";
  } catch (err) {
    error.textContent = err;
    weatherSection.style.display = "none";
  }
});
