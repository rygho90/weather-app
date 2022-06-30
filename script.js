const cityInput = document.querySelector('[data-city-name]')
const getWeatherButton = document.querySelector('[data-get-weather-button]')
const getWeatherForm = document.querySelector('[data-get-weather-form]')

function getWeather(cityName) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=4563e2706edeb31a8842a408ad31a05e`,
    {mode: 'cors'})
    .then(response => response.json())
    .then(response => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${response[0].lat}&lon=${response[0].lon}&appid=4563e2706edeb31a8842a408ad31a05e`,
        {mode: 'cors'})
        .then(response => response.json())
        .then(response => console.log(response))
    })
}

getWeatherButton.addEventListener("click", () => {
    const cityName = cityInput.value
    if (cityName == null || cityName == '') return
    getWeather(cityName)
})

getWeatherForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('beep')
})

