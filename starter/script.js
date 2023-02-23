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
    titleEl.textContent = city;
    currentWeather.appendChild(titleEl);

    // Create a weather icon element
    const icon = document.createElement('img');
    icon.setAttribute('src', `http://openweathermap.org/img/w/${res.data.list[0].weather[0].icon}.png`);
    currentWeather.appendChild(icon);

    // Create a temperature element with weather icon
    const temp = document.createElement('p');
    temp.innerHTML = `temp: ${res.data.list[0].main.temp} &#8451; `;
    currentWeather.appendChild(temp);

    // Create a wind element with weather icon
    const wind = document.createElement('p');
    wind.innerHTML = `wind: ${res.data.list[0].wind.speed} mph `;
    currentWeather.appendChild(wind);

    // Create a humidity element with weather icon
    const humidity = document.createElement('p');
    humidity.innerHTML = `humidity: ${res.data.list[0].main.humidity} % `;
    currentWeather.appendChild(humidity);


    // Clear the input field after search
    input.value = '';
  }).catch(error => {
    console.log(error);
    alert('Could not find weather data for the selected city.');
  });
}

searchButton.addEventListener('click', function (e) {
  e.preventDefault();
  getWeather();
});

cityButton.addEventListener('click', function (e) {
  e.preventDefault();
  getWeather();
});
