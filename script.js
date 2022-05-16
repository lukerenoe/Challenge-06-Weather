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
        // create current weather function based on coordinates returned by geo code, plug them into current
        // response[0].lat response[0]lon
    currentWeather(response[0].lat, response[0].lon)
    fiveDayForecast(response[0].lat, response[0].lon)
    })
}

function currentWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + 
    "&appid=8a19eb9f8b7949754f6b14f7fd648a12&units=imperial")
    .then(function (data){
        return data.json()
    }).then(function (response){
        console.log(response)

//              (create css class)
var temp = $("<h2>").addClass("style").text("Temperature: " + response.current.temp)
var humidity = $("<h2>").text("Humidity: " + response.current.humidity)






var weatherCard = $("<div>").addClass("card")

weatherCard.append(temp, humidity)
        $("#todayweather").append(weatherCard)
        
    })
}
function fiveDayForecast(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + 
    "&appid=8a19eb9f8b7949754f6b14f7fd648a12&units=imperial")
    .then(function (data){
        return data.json()
    }).then(function (response){
        console.log(response)
for (let i = 0; i < response.daily.length-3; i++) {
    var temp = $("<p>").text("Temperature: " + response.daily[i].temp.day)
    var weatherCard = $("<div>").addClass("card")

weatherCard.append(temp)
        $("#fiveforecast").append(weatherCard)
}



        
    })
}
