
  const apiKey = "d5326b041780f0943974a81cbb323700";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");
  const weatherIcon = document.querySelector(".weather-icon");

  async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      let data = await response.json();
        console.log(data);
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " Kmph";

      if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      }

      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "block";
      
    }

    
  }

  // Button click
  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });

  // Enter key press
  searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkWeather(searchBox.value);
    }
  });

  // Load default city on page load
  window.addEventListener("load", () => {
    checkWeather("Visakhapatnam");
  });

