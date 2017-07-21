function getWeather(){
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude
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
                $("#loading-weather").addClass("hide-item");
                $("#weather-button").removeClass("hide-item");
                $("#time").html(now.format('MMMM Do YYYY, h:mm:ss a')); 
                $("#weather-box").fadeIn();
            });

        },function(error){
            //use error.code to determine what went wrong
            $("#loading-weather").addClass("hide-item");
            var errorMessage = "Please turn on geolocation";
            $("#error-box").html(errorMessage);
            $("#weather-button").removeClass("hide-item");
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
        $("#temp-button").html("What's it in Fahrenheit");
        temp = ((temp - 32) * 5 / 9).toFixed(1);
    }
    $("#temperature").html(temp);
}



$(document).ready(function(){
    getWeather();
    $("#weather-button").on("click", function(){
         $("#error-box").html("");
        $("#weather-button").addClass("hide-item");
        $("#weather-box").fadeOut(300, function(){
            $("#loading-weather").removeClass("hide-item");
        });
        
        //$("#weather-button").html("<i class='fa fa-refresh fa-spin'></i> Getting the weather ...");
        getWeather();
    });

    $("#temp-button").on("click", function(){
        convertTemp();
    });

})