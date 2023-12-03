const latlong= document.getElementById("latlong");
const map=document.getElementById("map");
let weatherData= document.getElementById("weatherData");
const firstpage=document.getElementById("firstpage");
const secondpage=document.getElementById("secondpage");
const heading=document.getElementById("heading");
function getLocation() {
    firstpage.style.display='none';
    secondpage.style.display='block';
    heading.innerText="Here Is Your Location";
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
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=fd4825f30c609974cb823fac79f7c626&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
           console.log("Weatherstack API Response:", data);
           displayWeatherData(data);
            
        })
        .catch(error => console.error(`Error fetching weather data: ${error.message}`));
    }
    function displayWeatherData(data){
         let time=secondsToTimeZoneString(data.timezone) ;
        weatherData.innerHTML=`
        <h1>Your Weather Data</h1>
        <button class="weatherInfo">Location:${data.name}</button>
        <button class="weatherInfo"> Wind Speed:${data.wind.speed}kmph</button >
        <button class="weatherInfo">Humidity:${data.main.humidity}</button><br>
        <button class="weatherInfo">Time Zone: GMT ${time.sign} ${time.hours}:${time.minutes}</button >
        <button class="weatherInfo"> Pressure:${data.main.pressure}atm</button >
        <button class="weatherInfo">Wind Direction:${degreeToDirection(data.wind.deg)}</button><br>
        <button class="weatherInfo">Temperature:${data.main.temp}</button >
        <button class="weatherInfo"> Feels Like:${data.main.feels_like} degree</button >`
    }
    function degreeToDirection(degree){
        if (degree >= 337.5 || degree < 22.5) {
            return "North";
          } else if (degree >= 22.5 && degree < 67.5) {
            return "North East";
          } else if (degree >= 67.5 && degree < 112.5) {
            return "East";
          } else if (degree >= 112.5 && degree < 157.5) {
            return "South East";
          } else if (degree >= 157.5 && degree < 202.5) {
            return "South";
          } else if (degree >= 202.5 && degree < 247.5) {
            return "South West";
          } else if (degree >= 247.5 && degree < 292.5) {
            return "West";
          } else {
            return "North West";
          }
    }
    function secondsToTimeZoneString(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        const sign = hours >= 0 ? '+' : '-';
        console.log({sign, hours: Math.abs(hours), minutes, seconds: remainingSeconds });
        return {sign, hours: Math.abs(hours), minutes, seconds: remainingSeconds };
      }
       

