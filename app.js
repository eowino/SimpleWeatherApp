"use strict";

//Variables
var api_key = "&apikey=hoArfRosT1215";
var userLocationID = "";
var userLocationName = "Location Not Found";
var weatherDescription = "";
var weatherIcon = "";
var temperatureCel= "NaN";
var temperatureFar= "NaN";
var locationURL = "https://apidev.accuweather.com/locations/v1/search?q=";
var weatherURL = "https://apidev.accuweather.com/currentconditions/v1/";
var weatherURLTail = ".json?language=en&apikey=hoArfRosT1215";
var weatherIcons = {
	"Sunny":"wi-day-sunny",
	"Cloudy":"wi-cloudy",
	"Rain":"wi-rain",
	"Drizzle":"wi-rain",
	"Shower":"wi-day-showers",
	"Flurries":"wi-day-showers",
	"Storm":"wi-day-thunderstorm",
	"Snow":"wi-snow",
	"Windy":"wi-windy",
	"Cold":"wi-snowflake-cold",
	"Ice":"wi-snowflake-cold",
	"Hot":"wi-hot",
	"Fog":"wi-fog",
	"Overcast":"wi-day-sunny-overcast",
	"Sleet":"wi-sleet",
	"Clear":"wi-night-clear",
	"Moonlight":"wi-night-partly-cloudy"
};

//Functions
var getLocation = function(){
	var userInput = $("#search").val().toLocaleLowerCase();
	var urlLocation = locationURL + userInput + api_key;

	if( userInput.length > 0 ){
		$.ajax({			
			url: locationURL + userInput + api_key,
			success: function(response) {
				if(response.length > 0) { 
					userLocationID = response[0].Key;
					userLocationName = response[0].EnglishName + ", " + response[0].Country.LocalizedName;
					getWeather();
				}
			}
		});
	}else {
		$(".alert").slideDown(300);
		defaultValues();
	}
};

var defaultValues = function(){
	userLocationName = "Not Found";
	weatherDescription = "NaN";
	temperatureCel = "NaN";
	temperatureFar = "NaN";
	$("#icon").removeClass();
	updateHTML();
};

var getWeather = function(weather){
	$.ajax({			
		url: weatherURL + userLocationID + weatherURLTail,
		success: function(response) {
			temperatureCel = response[0].Temperature.Metric.Value + "°";
			temperatureFar = response[0].Temperature.Imperial.Value + "°";
			weatherDescription = response[0].WeatherText;
			setWeatherIcon();
			updateHTML();
		}
	});
};

var updateHTML = function(temp){
	$("#area").html(userLocationName);
	$("#description").html(weatherDescription);
	tempToggle();
	
};

var tempToggle = function(){
	if( $('#toCelsius:checked').length ){
		$("#temperature").html(temperatureCel);
	}else {
		$("#temperature").html(temperatureFar);
	}
};

var setWeatherIcon = function(){
	$.each( weatherIcons, function( key, value ) {
		if(weatherDescription.toLowerCase().indexOf(key.toLowerCase()) >= 0){
			//key add class wi val;
			$("#icon").addClass("wi " + value);
			return false;
		}
	});
};

$(document).ready(function(){
	updateHTML();
	$("#searchBtn").click(function(){
		getLocation();
	});
	$("#toCelsius").change(function(){
		tempToggle();
	});
	$("#toFahrenheit").change(function(){
		tempToggle();
	});

	$("#search").keydown(function(){
		if($(".alert").is(':visible')){
			$(".alert").slideUp(300);
		}
	});

	$("#search").keydown(function(e){
		if(e.keyCode == 13){
			$("#searchBtn").click();
		}
	});
});
