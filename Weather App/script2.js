// by watching lectures
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let oldTab = userTab;
const API_KEY = "2eae51938341b642d6c24dd00e35394e";
oldTab.classList.add("current-tab");
getfromSessionStorage();
// ek kaam aur pending hi

// console.log(sessionStorage);

// check if coordinates are already present in session storage 
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");// session storage is a object , which stores session detail, that we get thorugh geological api
    if(!localCoordinates){
        // agar local coordinates nhi mile
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);// coverts  json string into JSON object
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){// coordinates is a JSON object which wwe get after parsing json string.
    const {lat, lon} = coordinates;
    // console.log(lat);// working
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");


    // API call
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();// this line conerts into json object

        loadingScreen.classList.remove("remove");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);// data is JS object
    } catch (err) {
        //hw
        loadingScreen.classList.remove("active");
    }
}

function renderWeatherInfo(weatherInfo){// weather Info is JavaScript object , that we get through json string returned by promise.
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    // console.log(weatherInfo);
    // console.log( "hello");
    // fetch values from weatherInfo object and put it UI elements
    // 1 hr 16minconsole.log( "hello1");
    cityName.innerText = weatherInfo?.name;// as in database after connverting given response into json we see that it is direct child of object
    // console.log( "hello2");
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;// optional chaining humhe error nhi deta hi agar object nhi hi to ye return krta hi ek undefined
    // console.log( "hello3");
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    // console.log( "hello4");
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;// paragraph ka attrributee hi , humara innertext
    // console.log( "hello5");// working
}  

function switchTab(newTab){
    if(newTab != oldTab){// button ke UI me change kr diya
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        // tab ke UI me change krna
        if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        } 
        else{
            // means pehle search tab pr tha , ab weather tab visible krna h
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage(); // getting current location from current session if stored
        }
    }

}

userTab.addEventListener("click",()=>{
    // pass userTab as input parameter 
    switchTab(userTab);
});
searchTab.addEventListener("click",()=>{
    // pass userTab as input parameter 
    console.log( "search1");
    switchTab(searchTab);
    console.log( "search2");
});

// getLocation();
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener('click',getLocation);

function getLocation(){
    console.log("getLocation called."); // working
    if(navigator.geolocation){// geolocation is a api , which have method to take location of user, so we checkingthat navigator is supporting geolocation api in device or not.
        console.log("geoLocation exist");// working
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        // show alert 
        console.log("No geoLocation support");
    }
}


function showPosition(position) {// position attribute is passed defaulty after successful of method of getCurrentPosition() in navigator.geolocation

    const userCoordinates = {// storing position
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    // console.log(lat);

    // sessionstorage object ke ander store kr rhe h , to we need data in json string format
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));// stringify , covets objects into string
    fetchUserWeatherInfo(userCoordinates);

}

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    // console.log("Searcha");// working
    e.preventDefault();
    let cityName = searchInput.value;// as searchInput is input holder , so it have value

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        //hW
    }
}