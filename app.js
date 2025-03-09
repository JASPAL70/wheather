document.getElementById('get-weather').addEventListener('click', function() {
  const city = document.getElementById('city').value;

  if (city !== '') {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        if (data.cod === 200) {
          weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
          `;
        } else {
          weatherInfo.innerHTML = `<p>${data.message}</p>`;
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-info').innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
      });
  }
});

