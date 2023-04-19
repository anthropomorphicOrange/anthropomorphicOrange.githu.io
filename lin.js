const currentTempEl = document.getElementById('current-temp');

const timeEl = document.getElementById('time');

const dateEl = document.getElementById('date');

const weatherForecastEl = document.getElementById('weather-forecast');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = 'c496712ba8adaccbf9b5cc10b7b09cc2';


setInterval(() => {

    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    let hour = time.getHours() - 1; 
    const minutes = time.getMinutes(); 
    if(hour % 12 === 0){

      hour = 12;

    }   
    const hoursIn12HrFormat = hour > 12 ? hour % 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM'


    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes)+ '' + `<span id="am-pm">${ampm}</span>`
    
    dateEl.innerHTML = days[day] +', ' +date+ ' ' + months[month];

}, 1000); 


getWeatherData()
function getWeatherData () {

    navigator.geolocation.getCurrentPosition((success) => {

          console.log(success);

          let {latitude, longitude} = success.coords;

          fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${40.8136}&lon=${-96.681679}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`)
          .then(res => res.json()).then(data => {

            console.log(data);
            showWeatherData(data);
          });

    })
}



function showWeatherData (data) {

 /*   timezone.innerHTML = 'America/Cocoa Beach';
    countryEl.innerHTML = data.lat +  'N' + data.lon + 'E'; */

    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

   


    let otherDayForecast = '';

    data.daily.forEach((day, idx) => {

      if(idx < 5){
  
        currentTempEl.innerHTML += ` 
        
        
          
        <div>
        <div class="border-8 border-slate-700 md:flex-col lg:flex-col flex-col items-start justify-start m-24 px-0 py-0 bg-pink-100/[.8] text-center text-stone-700 rounded-2xl" id="current-temp">
        <div data-category="current-temp" >
        <div class="py-1 px-1" data-category="day">${window.moment(day.dt * 1000).format('ddd')}</div>
       <div class="pl-10 py-5"> <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png"  alt="weather icon" class="w-icon"> </div>                                          
        <div class="py-1 px-10 md:py-10 md:px-10 lg:py-10 lg:px-10" data-category="night">Night: ${day.temp.night}&#176;</div>  
        <div class="py-1 px-10" data-category="day">Day: ${day.temp.day}&#176;</div>
    </div>
    </div>
    </div>
        
       
        `
    

      }
      /*
      else { 

        otherDayForecast += ` 

        <div class="flex flex-column items-center justify-center ml-10 mr-10 mt-72 box-border border-1 border-white-500 border- px-10 py-10  bg-pink-100/[.8] text-center text-stone-800 rounded-2xl">
          <div class="py-5 pr-0 pl-5" data-category="day">${window.moment(day.dt * 1000).format('ddd')}</div>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather icon" class="w-icon">                                           
          <div class="py-4 pl-0 pr-1" data-category="night">Night - ${day.temp.night}&#176;</div>  
          <div class="py-4 pl-2 pr-5" data-category="day">Day - ${day.temp.day}#176;</div>
     </div>

                
        `
     
      }
      */
      if((day.lat == 28.3619) && (day.lon == -80.6677) ){

        timezone.innerHTML = "Cocoa Beach";
      }

  

    })

  /*  weatherForecastEl.innerHTML = otherDayForecast; */


    

}