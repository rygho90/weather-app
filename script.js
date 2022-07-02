const cityInput = document.querySelector('[data-city-name]')
const getWeatherButton = document.querySelector('[data-get-weather-button]')
const getWeatherForm = document.querySelector('[data-get-weather-form]')
const getWeatherContainer = document.querySelector('[data-get-weather-container]')
const homeFooter = document.querySelector('[data-home-footer]')

const contentContainer = document.querySelector('[data-content-container]')
const locationTitle = document.querySelector('[data-location-title]')
const weatherDescription = document.querySelector('[data-weather-description]')
const fahrenheitSpan = document.querySelector('[data-fahrenheit]')
const celsiusSpan = document.querySelector('[data-celsius]')
const humiditySpan = document.querySelector('[data-humidity]')
const fahrenheitFeelsSpan = document.querySelector('[data-fahrenheit-feels]')
const celsiusFeelsSpan = document.querySelector('[data-celsius-feels]')
const windSpan = document.querySelector('[data-wind]')
const contentFooter = document.querySelector('[data-content-footer]')
const weatherImg = document.querySelector('[data-weather-img]')

function getWeather(cityName) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=4563e2706edeb31a8842a408ad31a05e`,
    {mode: 'cors'})
    .then(response => response.json())
    .then(response => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=4563e2706edeb31a8842a408ad31a05e&units=imperial`,
        {mode: 'cors'})
        .then(response => response.json())
        .then(data => renderData(data))
    })
}

function searchForWeather() {
    const cityName = cityInput.value.trim()
    if (!cityName) return
    getWeather(cityName)    
    getWeatherContainer.style.display = "none"
    contentContainer.classList.remove('hidden')
    homeFooter.style.display = "none"
    contentFooter.classList.remove('hidden')
}

function renderData(data) {
    console.log(data);
    locationTitle.textContent = data.name
    weatherDescription.textContent = data.weather[0].description
    fahrenheitSpan.textContent = Math.round(data.main.temp)
    celsiusSpan.textContent = Math.round(toCelsius(data.main.temp))
    humiditySpan.textContent = data.main.humidity
    fahrenheitFeelsSpan.textContent = Math.round(data.main.feels_like)
    celsiusFeelsSpan.textContent = Math.round(toCelsius(data.main.feels_like))
    windSpan.textContent = Math.round(data.wind.speed)
    renderGif(data.weather[0].description)
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 0.556
}

function renderGif(searchTerm) {
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=dvS423pJg2AmQ1zvJnZZpgtQdaB3DUc6&s=${searchTerm}`, {mode: 'cors'})
    .then(response => response.json())
    .then(gif => weatherImg.src = gif.data.images.original.url)
  }

getWeatherForm.addEventListener('submit', e => {
    e.preventDefault();
    searchForWeather();
    cityInput.value = ''
})

