$("#search-button").on("click", function() {
    var searchValue = $("#search-value").val()
    console.log(searchValue)
    geoCode(searchValue)
})

function geoCode(searchValue) {
    $.ajax({
        URL: "http://api.openweathermap.org/geo/1.0/direct?q=" + searchValue + "&appid=8a19eb9f8b7949754f6b14f7fd648a12", 
        method: "GET"
    }).then(function(response){
        console.log(response)
    })
}