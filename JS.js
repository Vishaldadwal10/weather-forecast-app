const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');


const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

let loading = false;

 async function checkweather(city){
    loading = true;
    searchBtn.className = "fa-solid fa-spinner"

    const api_key = "e015ed73aa0fd98cfe58e629f60f2722";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then
    ((response )=> { searchBtn.className = "fa-solid fa-magnifying-glass" ; 
        return response.json()});


        if(weather_data.cod ===`404`){
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("error");
            return;
        }
        console.log("run");
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
    
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`

    wind_speed.innerHTML = `${weather_data.wind.speed}km/H`

     
    switch(weather_data.weather[0].description){
            case 'clear sky':
            weather_img.src ="clear.png";
            break;
            case 'mist':
            weather_img.src ="mist.png";
            break;
            case 'light rain':
            weather_img.src ="rain.png";
            break;
            case 'snow':
            weather_img.src ="snow.png";
            break;
            case 'broken clouds':
            weather_img.src ="cloud.png";
            break;

    }

    console.log(weather_data);

}

if(loading ){
    searchBtn.className = "fa-solid fa-spinner"
}
else{
    searchBtn.className = "fa-solid fa-magnifying-glass"
}
searchBtn.addEventListener('click',()=>{
    checkweather(inputBox.value);

})
