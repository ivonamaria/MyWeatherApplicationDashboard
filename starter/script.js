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

const getWeather = () => {
    const city = input.value || 'London';
    const URL = API_LINK + city + API_KEY + API_UNITS;

    axios.get(URL)
        .then(res => {
            console.log(res.data);
            let today = res.data.list[0];
            let todayWeather = `${Math.floor(today.main.temp)}°C, ${today.weather[0].description}`;
            currentWeather.innerHTML = todayWeather;

            let weatherCards = '';
            for (let i = 1; i < 6; i++) {
                let day = res.data.list[i];
                weatherCards += 
                `<div class="col-sm-2"> 
                    <div class="card text-white bg-primary mb-3"> 
                        <div class="card-header">${day.dt_txt}</div> 
                        <div class="card-body"> 
                            <h5 class="card-title">${Math.floor(day.main.temp)}°C</h5> 
                            <p class="card-text">${day.weather[0].description}</p> 
                        </div> 
                    </div> 
                </div>`;
            }
            weatherCardsContainer.innerHTML = weatherCards;
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Unable to fetch weather data for the city. Please try again.');
        });
};

// Event listeners
searchButton.addEventListener('click', getWeather);
input.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        getWeather();
    }
});
cityButton.addEventListener('click', () => {
    let city = event.target.innerHTML;
    input.value = city;
    getWeather();
});
