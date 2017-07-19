function getWeather(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude
            $("#location").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
            $("#weatherButton").html("<i class='fa fa-refresh'></i> Got Weather");
            var link = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
            $.getJSON(link, function(json) {
                
                var weather = json["weather"][0]["main"];
                var temperature = json["main"]["temp"];
                console.log(weather);
                $("#weather").html(weather);
                $("#temperature").html(temperature);
            });

        });

    
    }
    
}



$(document).ready(function(){
    $("#weatherButton").on("click", function(){
        $("#weatherButton").html("<i class='fa fa-refresh fa-spin'></i> Getting Weather");
        getWeather();
    });

})