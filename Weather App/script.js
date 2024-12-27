const API_KEY = "2eae51938341b642d6c24dd00e35394e";
// https://api.openweathermap.org/data/2.5/weather?q=goa&appid=2eae51938341b642d6c24dd00e35394e


// async function showWeather() {
//         try{let latitude = 15.3333;
//         let longitude = 74.0833;
//         let city = "goa";
//         // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=2eae51938341b642d6c24dd00e35394e&units=metric`);
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric`);
//         // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=goa&appid=2eae51938341b642d6c24dd00e35394e&units=metric`);
//         const data = await response.json(); // good practice to use await , as we are printing in next line , might be it is not converted.
//         console.log("Weather data : ->" , data);

//         // displaying in UI
//         let newPara = document.createElement('p');
//         newPara.textContent = `${data?.main?.temp.toFixed(2)} ℃`
//         document.body.appendChild(newPara);
//     }
//     catch(err){
//         // err handle
//     }
// }

// good practice of above
// is to create a function which bring response from server by calling api , after which he call another function which update UI
async function fetchWeatherDetails(){
    let city = "goa";

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json(); // most of the time we work on json file type.

    console.log("Weather data :-" , data);

    renderWeatherInfo(data); //calling another function to render UI
}

function renderWeatherInfo(data){
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} ℃`
    document.body.appendChild(newPara);
}

async function getCustomerWeatherDeatils() {
    try {
        let long = 15.6333;
        let lati = 18.3333;

        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${API_KEY}&units=metric`);
        let data = await result.json();

        console.log(data);
    } catch (err) {
        console.log("Error found ", err);
    }
}

// # fetch user location ( search html geolocation in w3school)
function getLocation(){
    if(navigator.geolocation){// geolocation is a api , which have method to take location of user, so we checkingthat navigator is supporting geolocation api in device or not.
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        console.log("No geoLocation support");
    }
}

function showPosition(position){
    let lati = position.coords.latitude;
    let long = position.coords.longitude;

    console.log(lati , " " , long);
}