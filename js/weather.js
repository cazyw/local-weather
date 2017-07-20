function getWeather(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude
            $("#weather-button").html("<i class='fa fa-refresh'></i> Got Weather");
            var link = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
            $.getJSON(link, function(json) {                
                var weather = json["weather"][0]["description"];
                var weatherID = json["weather"][0]["id"];
                var temperature = (json["main"]["temp"]).toFixed(1);
                var place = json["name"];
                var country = json["sys"]["country"];
                var now = new moment();
                $("#weather").html(weather);
                $("#temperature").html(temperature);
                $("#scale").html(" \'C");
                $("#place").html(place + " " + country);
                $("#weather-icon").addClass("wi-owm-"+weatherID);
                $("#loading-weather").css('display', 'none');
                $("#time").html(now.format('MMMM Do YYYY, h:mm:ss a')); 
                $("#weather-box").fadeIn();
            });

        });
    
    }
    
}

function convertTemp(){
    var temp = $("#temperature").text();
    if ($("#scale").text() == " \'C"){
        $("#scale").html(" \'F");
        $("#temp-button").html("What's it in Celcius");
        temp = ((temp * 9 / 5) + 32).toFixed(1);
    } else {
        $("#scale").html(" \'C");
        $("#temp-button").html("What's it in Farenheit");
        temp = ((temp - 32) * 5 / 9).toFixed(1);
    }
    $("#temperature").html(temp);
}



$(document).ready(function(){
    getWeather();
    $("#weather-button").on("click", function(){
        $("#weather-button").html("<i class='fa fa-refresh fa-spin'></i> Getting Weather");
        getWeather();
    });

    $("#temp-button").on("click", function(){
        convertTemp();
    });

})