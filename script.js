const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const errorMsg = document.getElementById("errorMsg");
const container = document.querySelector(".container");
const notFound = document.querySelector(".not-found");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city === "") {
    showError("Please enter a city name");
  } else {
    getDetails(city);
  }
});

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.add("errActive");
  setTimeout(() => {
    errorMsg.textContent = "";
    errorMsg.classList.remove("errActive");
  }, 3000);
}

async function getDetails(cityName) {
  try {
    const apiKey = "48f2b10eec08aa64c42d65cbd7220d32"; 
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) {
      throw new Error("City not found");
    }

    const data = await res.json();

    // Hide 404
    notFound.style.display = "none";
    container.style.display = "flex";
    container.classList.add("active");

    // Set values
    document.querySelector(".temp span").textContent = Math.round(
      data.main.temp
    );

    // Weather image
    const weatherCondition = data.weather[0].main;
    const weatherImg = document.querySelector(".tempImg");
    weatherImg.src = `images/${weatherCondition}.png`;

    document.querySelector(".cityName").textContent = data.name;
    document.querySelector(".humidityRate").textContent =
      data.main.humidity + " %";
    document.querySelector(".windRate").textContent = data.wind.speed + " km/h";

    // Reset input
    cityInput.value = "";

    // Re-trigger animations
    document.querySelectorAll(".fade-in, .slide-up").forEach((el) => {
      el.classList.remove("show");
      void el.offsetWidth; // restart animation
      el.classList.add("show");
    });
  } catch (error) {
    container.style.display = "none";
    notFound.style.display = "block";
  }
}
