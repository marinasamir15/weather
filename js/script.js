
let weather = document.getElementById("weather");
let search = document.getElementById("search");


let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let numberDays;
let data;
let result;

async function weatherdata(location = "cairo", num = 3) {
  try {
    numberDays = num;
    data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=147647f2aad34fe3a1384852241001&q=${location}&days=${num}`
    );
    result = await data.json();
    
    displaycurrent()
    displayWeather();
  } catch (error) {
    console.error("Error retrieving weather data:", error);
    // Display an error message to the user
    weather.innerHTML = `<p class="error-message">Error retrieving weather data. Please try again later.</p>`;
  }
}
function displaycurrent(){
    let cartona='';
    if (result && result.forecast && result.forecast.forecastday) {
    cartona+=`
    <div class="col-lg-4">
    <div class="card bg-dark h-100 ">
      <div class="card-header text-light bg-black d-flex justify-content-between">
        <p>${
            weekDays[new Date(result.forecast.forecastday[0].date).getDay()]
        }</p>
        <p>${new Date(result.forecast.forecastday[0].date).getDate()}
        ${months[new Date(result.forecast.forecastday[0].date).getMonth()]}
        </p>
      </div>
      <div class="card-body">
        <p class="fs-4 text-light">${result.location.name},${result.location.region},${result.location.country}</p>
        <div class="heat p-3 text-light d-flex justify-content-between">
          <h2 class="fs-1">${result.current.temp_c}&deg;C</h2>
          <img src="https:${result.current.condition.icon}" class="w-25"/>
        </div>
      </div>
      <p class="text-info p-3">${result.current.condition.text}</p>
      <div class="card-footer d-flex justify-content-between text-white">
        
       <span> <i class="fa-solid fa-umbrella"></i> ${result.current.humidity} %</span>
       <span><i class="fa-solid fa-wind"></i> ${result.current.wind_kph} km/h</span>
       <span><i class="fa-solid fa-compass"></i> ${result.current.wind_dir}</span>
      

      <div>
        <i></i>
      </div>
      </div>
    </div>
  </div> 

    `
    weather.innerHTML=cartona;
} }

function displayWeather() {
  let cartona = "";
  if (result && result.forecast && result.forecast.forecastday) {
    for (let i = 1; i < numberDays; i++) {
      const currentDay = result.forecast.forecastday[i];
      cartona += `
        <div class="col-lg-4">
          <div class="card bg-dark text-center h-100">
            <div class="card-header text-light bg-black">
              <p>${weekDays[new Date(currentDay.date).getDay()]}</p>
            </div>
            <div class="card-body">
              <div class="heat p-3 text-light">
                <img src="https:${currentDay.day.condition.icon}" alt="weather" class="w-25 mb-4"/>
                <h2 class="fs-2 mb-2">${currentDay.day.maxtemp_c} &deg;C</h2>
                <p class="fs-5 mb-2">${currentDay.day.mintemp_c} &deg;C</p>
              </div>
            </div>
            <p class="text-info p-3">${currentDay.day.condition.text}</p>
          </div>
        </div>
      `;
    }
    weather.innerHTML += cartona;
  }
}

function searchcity() {
  if (search.value === "") {
    weatherdata();
  } else {
    weatherdata(search.value);
  }
}

async function displayAllData() {
  
  await weatherdata();
 
}

displayAllData();

navigator.geolocation.getCurrentPosition(function (position) {
  let cityLocation = position.coords.latitude + "," + position.coords.longitude;
  (async function () {
    await weatherdata(cityLocation);
  })();
});

