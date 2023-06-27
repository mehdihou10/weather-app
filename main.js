//https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=30fd1ca0f698cc4c6ad07eec60e908b9


//select elements
let search = document.querySelector(".weather-app i");
let input = document.querySelector(".weather-app input");
let deg = document.querySelector(".weather-app .deg span");
let cityName = document.querySelector(".weather-app .name");
let hum = document.querySelector(".hum span");
let wind = document.querySelector(".num .wind span");
let weatherImg = document.querySelector(".weather-app .informations > img");

//search city
search.onclick = function(){
  //fetch data

  getdata().then((accp)=>{ 

    console.log(accp)
    deg.innerHTML = Math.trunc(accp.main.temp - 273.15);
    cityName.innerHTML = accp.name;
    hum.innerHTML = accp.main.humidity;
    wind.innerHTML = (accp.wind.speed * 3.6).toFixed(2);

    let degres = +deg.innerHTML;

    if(degres < 0){
      weatherImg.src = "images/snow.png";
    }

    else if(degres > 0 & degres < 5){
      weatherImg.src = "images/rain.png";
    }

    else if(degres > 5 && degres < 10){
      weatherImg.src = "images/drizzle.png";
    }

    else if(degres > 10 & degres < 20){
      weatherImg.src = "images/clouds.png";
    }

    else{
      weatherImg.src = "images/clear.png";
    }
    
  })
  .catch((er) =>{

    alert(er);

  });
};

// async function getdata(){

//   try{
//     let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=30fd1ca0f698cc4c6ad07eec60e908b9`);

//     let data = await result.json();

    

//   } catch(er){
//     console.log(Error("fault"))
//   }
// }

function getdata(){
  return new Promise((res,rej)=>{

    let rq = new XMLHttpRequest();


    rq.onload = function(){
      if(this.status === 200 & this.readyState === 4){
        res(JSON.parse(this.responseText));
      }
      else{
        rej("Write Valid City Name");
      }
    }

    rq.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=30fd1ca0f698cc4c6ad07eec60e908b9`);
    rq.send();
  })
}
