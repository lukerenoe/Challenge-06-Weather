$("#search-button").on("click", function() {
    var searchValue = $("#search-value").val()
    console.log(searchValue)
    geoCode(searchValue)
})

function geoCode(searchValue) {
    $.ajax({
        url: "https://api.openweathermap.org/geo/1.0/direct?q=" + searchValue + "&appid=8a19eb9f8b7949754f6b14f7fd648a12", 
        type: "GET"
    }).then(function(response){
        console.log(response)
        // create current weather function based on coordinates returned by geo code, plug them into currentWeather
    currentWeather(response[0].name, response[0].lat, response[0].lon)
    fiveDayForecast(response[0].lat, response[0].lon)
    })
}
function currentWeather(searchValue, lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + 
    "&appid=8a19eb9f8b7949754f6b14f7fd648a12&units=imperial")
    .then(function (data){
        return data.json()
    }).then(function (response){
        console.log(response)
var cityName = $("<h1>").text(searchValue)
//              (create css class)
var temp = $("<h2>").addClass("style").text("Temperature: " + response.current.temp)
var humidity = $("<h2>").text("Humidity: " + response.current.humidity)
var windSpeed = $("<h2>").text("Wind Speed: " + response.current.wind_speed)
var uvi = $("<button>").text("UVI: " + response.current.uvi)

if (response.current.uvi <= 6) {
    uvi.addClass("btn btn-success")
}
else if (response.current.uvi > 6 && response.current.uvi <= 10) {
    uvi.addClass("btn btn-secondary")
}
else {
    uvi.addClass("btn btn-danger")
}

var currentDate = $("<h2>").text(moment.unix(response.current.dt).format("MM/DD/YYYY"))
var weatherCard = $("<div>").addClass("card")

weatherCard.append(cityName, currentDate, temp, humidity, uvi, windSpeed)
        $("#todayweather").append(weatherCard)
        
    })
}

// function saveSearch() {
//     var searchArray = JSON.parse (localStorage.getItem ("cities") ) || []
//     searchArray.push(newSearch)
//     var newSearch = $("#search-value").val()
//     localStorage.setItem("cities", JSON.stringify(searchArray))
//     displaySearches()
//     console.log (saveSearch())
//     }


function fiveDayForecast(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + 
    "&appid=8a19eb9f8b7949754f6b14f7fd648a12&units=imperial")
    .then(function (data){
        return data.json()
    }).then(function (response){
        console.log(response)
    
for (let i = 1; i < response.daily.length-2; i++) {
    var temp = $("<p>").text("Temperature: " + response.daily[i].temp.day)
    var humidity = $("<p>").text("Humidity: " + response.daily[i].humidity)
    var wind = $("<p>").text("WindSpeed:" + response.daily[i].wind_speed)
    var weatherCard = $("<div>").addClass("card")
    var forecastDate = $("<p>").text(moment.unix(response.daily[i].dt).format("ddd"))
    var iconUrl = `https://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png`
    var icon = $("<img>").attr("src", iconUrl).addClass("sizeicon")
weatherCard.append(forecastDate, icon, temp, humidity, wind)
        $("#fiveforecast").append(weatherCard)
}
})
}
