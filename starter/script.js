const input = 

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY ='&appid=30abde8af5dc54f445196160c7e3f072&units=metric'
const API_UNITS = '&units=metric'

const getWeather = () => {
const city = input.value
    const URL = API_LINK + city + API_KEY + API_UNITS
}

let searchButton = $("#search-button");
let listOfCities = $(".input-group-append");
let inputEl = $("#search-input");
let currentWeatherEl = $("#today");
let weatherCardsContainer = $("#weather-cards-container");
let cityButton = $("<button>");

