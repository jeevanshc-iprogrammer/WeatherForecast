document.getElementById('lower').style.visibility = "hidden";
document.getElementById('forecast').style.visibility = "hidden";

const d = new Date();
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function checkWeather(){
    const city = document.getElementById("city").value;
    callFirst(city);
    callSecond(city);
}


async function callFirst(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ba0e5eedae49070b51c85ad8c30def0&units=metric`);
        const result = await response.json();
        return processWeatherDetails(result);
    }catch(error){
        return error
    }
}


function processWeatherDetails(result){
    document.getElementById('lower').style.visibility = "visible";

    let locationIcon = document.querySelector('.weather-icon');
    const {icon} = result.weather[0];
    locationIcon.innerHTML = `<img src="icons/${icon}.png">`

    document.getElementById("cityName").innerHTML = `${document.getElementById("city").value}'s Weather`;
    document.getElementById("desc").innerHTML = result.weather[0].description;
    document.getElementById("minTemp").innerHTML = result.main.temp_min + "℃";
    document.getElementById("maxTemp").innerHTML = result.main.temp_max + "℃";
    document.getElementById("humidity").innerHTML = result.main.humidity + "g.m-3";
    document.getElementById("wind").innerHTML = result.wind.speed;
    document.getElementById("city").value = "";
    
}


async function callSecond(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3ba0e5eedae49070b51c85ad8c30def0&units=metric`);
        const result = await response.json();
        return processWeeklyWeatherDetails(result);
    }catch(error){
        console.log(error);
    }
}


function processWeeklyWeatherDetails(result){
    document.getElementById('forecast').style.visibility = "visible";
    for(let i=0;i<5;i++){
        document.getElementById(`day${i+1}min`).innerHTML = Number(result.list[i].main.temp_min);
        document.getElementById(`day${i+1}max`).innerHTML = Number(result.list[i].main.temp_max);
        document.getElementById(`day${i+1}desc`).innerHTML = result.list[i].weather[0].description;
        document.getElementById(`img${i+1}`).src = 'https://openweathermap.org/img/wn/' + result.list[i].weather[0].icon + ".png";
        document.getElementById(`day${i+1}`).innerHTML = weekdays[checkDay(i)];
    }
}


function checkDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }else{
        return day + d.getDay();
    }
}