const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
  };

  async function fetchWeather(location) {
    try {
      const response = await fetch(`${api.base}weather?q=${location}&units=metric&appid=${api.key}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      console.log(error);
      alert("Could not fetch weather data. Please try again.");
    }
  }

  function displayWeather(data) {
    if (data && data.weather && data.weather.length > 0) {
      document.getElementById('city-name').textContent = data.name;
      document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
      document.getElementById('weather-condition').textContent = data.weather[0].description;
      
      // Update visibility, wind speed, humidity, and pressure
      document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
      document.getElementById('wind-speed').textContent = `${Math.round(data.wind.speed)} km/h`;
      document.getElementById('humidity').textContent = `${data.main.humidity}%`;
      document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
      
      // Example date formatting (you can customize this)
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      document.getElementById('date-time').textContent = now.toLocaleDateString(undefined, options);
      
      // Background setting based on weather
      if (data.weather[0].main === 'Clear') {
        document.body.style.backgroundImage = "url('./assets/clear.jpg')";
      } else if (data.weather[0].main === 'Rain') {
        document.body.style.backgroundImage = "url('./assets/rain.jpg')";
      } else if (data.weather[0].main === 'Clouds') {
        document.body.style.backgroundImage = "url('./assets/cloudy.jpg')";
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchform');
    const input = document.getElementById('input');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const location = input.value;
      fetchWeather(location);
      input.value = ''; // Clear the input field
    });

    // Fetch default weather data
    fetchWeather("rawalpindi");
  });
