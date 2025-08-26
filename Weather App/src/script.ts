const userTab = document.querySelector<HTMLElement>("[data-userWeather]");
const searchTab = document.querySelector<HTMLElement>("[data-searchWeather]");
const userContainer = document.querySelector<HTMLElement>(".weather-container");

const grantAccessContainer = document.querySelector<HTMLElement>(
  ".grant-location-container"
);
const searchForm = document.querySelector<HTMLElement>("[data-searchForm]");
const loadingScreen = document.querySelector<HTMLElement>(".loading-container");
const userInfoContainer = document.querySelector<HTMLElement>(
  ".user-info-container"
);

let oldTab: HTMLElement = userTab as HTMLElement;
const API_KEY: string = "2eae51938341b642d6c24dd00e35394e";

oldTab.classList.add("current-tab");

getFromSessionStorage();

type Coordinates = { lat: number; lon: number };

function getFromSessionStorage(): void{
    const localCoordinates = sessionStorage.getItem("user-coordinates");

    if (!localCoordinates) {
        (grantAccessContainer as HTMLElement).classList.add("active");
    } else {
        const coordinates : Coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}


//Minimal interface for weather data , can be expand later
interface WeatherInfo{
    name: string;
}

async function fetchUserWeatherInfo(coordinates : Coordinates) : Promise<void>{
    const { lat, lon } = coordinates;
    (grantAccessContainer as HTMLElement).classList.remove("active");
    (loadingScreen as HTMLElement).classList.add("active");

    try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const data: any = await response.json(); // can replace `any` with a weather api Interface
                (loadingScreen as HTMLElement).classList.remove("active");
        (userInfoContainer as HTMLElement).classList.add("active");
        
        // renderWeatherInfo(data);
    } catch (err) {
        (loadingScreen as HTMLElement).classList.remove("active");
        console.error("Error fetching user weather info:", err);
    }
}