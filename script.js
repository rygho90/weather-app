const cityInput = document.querySelector('[data-city-name]')
const searchButton = document.querySelector('[data-search-button]')

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

searchButton.addEventListener("click", () => {
    const cityName = cityInput.value
    if (cityName == null || cityName == '') return
    getWeather(cityName)
})

