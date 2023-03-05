// Selecting the search button, list of cities, input, current weather, weather cards container, and city button
const searchButton = document.querySelector('#search-button');
const listOfCities = document.querySelector('.input-group-append');
const input = document.querySelector('#search-input');
const currentWeather = document.querySelector('#today');
const cityButton = document.querySelector('#city-button');

// Variables needed for API call
const API_LINK = 'https://api.openweathermap.org/data/2.5/forecast?';
const API_KEY = '30abde8af5dc54f445196160c7e3f072';
const API_UNITS = '&units=metric';
const lat = 37.7749; // example latitude
const lon = -122.4194; // example longitude
const forecastURL = `${API_LINK}lat=44.34&lon=10.99&appid=${API_KEY}${API_UNITS}`;
console.log(forecastURL)
// Function to get the weather information for a given city
const getWeather = () => {
  // Get the value of the city input or default to London
  const city = input.value || 'London';
  const URL = `${API_LINK}q=${city}&appid=${API_KEY}${API_UNITS}`;

  // Make an API call to get the weather data
  axios.get(URL).then(res => {
    // Log the data to the console
    console.log(res.data);
    console.log(res.data.list[0].main.temp);
    console.log(res.data.list[0].wind.speed);
    console.log(res.data.list[0].main.humidity);

    // Clear the current weather data
    currentWeather.innerHTML = '';

    // Create a title element for the city
    const titleEl = document.createElement('h1');
    titleEl.textContent = `${city} (${moment().format('D MMM YYYY')})`;
    currentWeather.appendChild(titleEl);

    // Create a weather icon element
    const icon = document.createElement('img');
    icon.setAttribute('src', `http://openweathermap.org/img/w/${res.data.list[0].weather[0].icon}.png`);
    currentWeather.appendChild(icon);

    // Create a temperature element with weather icon
    const temp = document.createElement('p');
    temp.innerHTML = `Temp: ${res.data.list[0].main.temp} &#8451; `;
    currentWeather.appendChild(temp);

    // Create a wind element with weather icon
    const wind = document.createElement('p');
    wind.innerHTML = `Wind: ${res.data.list[0].wind.speed} mph `;
    currentWeather.appendChild(wind);

    // Create a humidity element with weather icon
    const humidity = document.createElement('p');
    humidity.innerHTML = `Humidity: ${res.data.list[0].main.humidity} % `;
    currentWeather.appendChild(humidity);

    displayForecast(city)

    // Clear the input field after search
    input.value = '';
  }).catch(error => {
    console.log(error);
    alert('Could not find weather data for the selected city.');
  });
  
}

// Function to create a weather card for a given day's forecast data
function createWeatherCard(forecast) {
  // const date = forecast.dt_txt.split(' ')[0];
  const dateObj = new Date(forecast.dt_txt);
  const date = dateObj.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  

  const temperature = Math.round(forecast.main.temp);
  const icon = forecast.weather[0].icon;
  const description = forecast.weather[0].description;
  const windSpeed = forecast.wind.speed;
  const humidity = forecast.main.humidity;

  const card = document.createElement('div');
  card.classList.add('card', 'mb-3');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = date;

  const cardSubtitle = document.createElement('h6');
  cardSubtitle.classList.add('card-subtitle', 'mb-2', 'text-muted');

  const cardTemperature = document.createElement('p');
  cardTemperature.classList.add('card-text');
  cardTemperature.textContent = `Temp: ${temperature}°C`;

  const cardWind = document.createElement('p');
  cardWind.classList.add('card-text');
  cardWind.textContent = `Wind: ${windSpeed} mph`;

  const cardHumidity = document.createElement('p');
  cardHumidity.classList.add('card-text');
  cardHumidity.textContent = `Humidity: ${humidity}%`;

  const weatherIcon = document.createElement('img');
  weatherIcon.src = `https://openweathermap.org/img/w/${icon}.png`;
  weatherIcon.alt = description;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardSubtitle);
  cardBody.appendChild(cardTemperature);
  cardBody.appendChild(cardWind);
  cardBody.appendChild(cardHumidity);
  cardBody.appendChild(weatherIcon);
  card.appendChild(cardBody);

  return card;
}


// Function to display the 5-day weather forecast for a given city
function displayForecast(cityName) {
  // const forecastURL = `${API_LINK}forecast?q=${cityName}&appid=${API_KEY}${API_UNITS}`;
  const forecastURL = `${API_LINK}lat=44.34&lon=10.99&appid=${API_KEY}${API_UNITS}`;

  fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
      const forecastData = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));
console.log(data)
      const forecastCardsContainer = document.createElement('div');
      forecastCardsContainer.classList.add('row');

      forecastData.forEach(forecast => {
        const forecastCard = createWeatherCard(forecast);
        forecastCardsContainer.appendChild(forecastCard);
      });

      // Clear the current weather and display the forecast cards
      currentWeather.appendChild(forecastCardsContainer);
    })
    .catch(error => {
      console.log(error);
    });
}

searchButton.addEventListener('click', function (e) {
  e.preventDefault();
  getWeather();
});

// Event listener for the city button to display the 5-day weather forecast for the input city
cityButton.addEventListener('click', () => {
  const cityName = input.value.trim();
  displayForecast(cityName);
});
