const latlong= document.getElementById("latlong");
const map=document.getElementById("map");
let weatherData= document.getElementById("weatherData");
const firstpage=document.getElementById("firstpage");
const secondpage=document.getElementById("secondpage");
function getLocation() {
    firstpage.style.display='none';
    secondpage.style.display='block';
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    
  } else { 
    latlong.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  latlong.innerHTML = "Latitude: " + position.coords.latitude +
  " <br> Longitude: " + position.coords.longitude;
  showMap(position.coords.latitude,position.coords.longitude);
}
function showMap(latitude,longitude){
   map.src=`https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`;
    getWeatherReport( latitude,longitude);
}
function getWeatherReport( lat,long){
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7731a1e5be0459ca3e196363e9ab0fa5&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
           console.log("Weatherstack API Response:", data);
           displayWeatherData(data.timelines.daily.values);
            
        })
        .catch(error => console.error(`Error fetching weather data: ${error.message}`));
    }
    function displayWeatherData(data){
    
        weatherData.innerHTML=`
        
        <button class="weatherInfo">Humidity:${data.humidityAvg}</button>
        <button class="weatherInfo">Time Zone:${data.timeZone}</button ><br>
        <button class="weatherInfo"> Pressure:${data.pressureAvg}</button >
        <button class="weatherInfo"> Wind Speed:${data.windSpeedAvg}</button >
        <button class="weatherInfo">Wind Direction:${data.windDirectionAvg}</button><br>
        <button class="weatherInfo">UVIndex:${uvIndexAvg}</button >
        <button class="weatherInfo"> Feels Like:${data.temperatureAvg}</button >`
    }
    
       

