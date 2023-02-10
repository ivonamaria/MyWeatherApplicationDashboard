// Selecting the search button, list of cities, input, current weather, weather cards container, and city button
let searchButton = document.querySelector('#search-button');
let listOfCities = document.querySelector('.input-group-append');
let input = document.querySelector('#search-input');
let currentWeather = document.querySelector('#today');
let weatherCardsContainer = document.querySelector('#weather-cards-container');
let cityButton = document.querySelector('button');

// Variables needed for API call
const API_LINK = 'https://api.openweathermap.org/data/2.5/forecast?&q=';
const API_KEY = '&mode=json&appid=30abde8af5dc54f445196160c7e3f072';
const API_UNITS = '&units=metric';

// Function to get the weather information for a given city
const getWeather = () => {
  // Get the value of the city input or default to London
  const city = input.value || 'London'
  const URL = API_LINK + city + API_KEY + API_UNITS

  // Make an API call to get the weather data
  axios.get(URL).then(res => {
    // Log the data to the console
    console.log(res.data)
    console.log(res.data.list[0].main.temp)
    console.log(res.data.list[0].wind.speed)
    console.log(res.data.list[0].main.humidity)

    // Clear the current weather data
    currentWeather.innerHTML = '';

    // Create a title element for the city
    const titleEl = document.createElement('h1');
    titleEl.textContent = city;
    currentWeather.appendChild(titleEl);

    // Create a temperature element
    const temp = document.createElement('p');
    temp.textContent = "temp: " + res.data.list[0].main.temp + "°C";
    currentWeather.appendChild(temp);

    // Create a wind element
    const wind = document.createElement('p');
    wind.textContent = "wind: " + res.data.list[0].wind.speed;
    currentWeather.appendChild(wind);

    // Create a humidity element
    const humidity = document.createElement('p');
    humidity.textContent = "humidity: " + res.data.list[0].main.humidity;
    currentWeather.appendChild(humidity);
  })
}


cityButton.addEventListener('click', function (e) {
    e.preventDefault()
    getWeather()
})
