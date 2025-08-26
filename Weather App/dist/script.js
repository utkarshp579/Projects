"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
getFromSessionStorage();
function getFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}
function fetchUserWeatherInfo(coordinates) {
    return __awaiter(this, void 0, void 0, function* () {
        const { lat, lon } = coordinates;
        grantAccessContainer.classList.remove("active");
        loadingScreen.classList.add("active");
        try {
            const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const data = yield response.json(); // can replace `any` with a weather api Interface
            loadingScreen.classList.remove("active");
            userInfoContainer.classList.add("active");
            // renderWeatherInfo(data);
        }
        catch (err) {
            loadingScreen.classList.remove("active");
            console.error("Error fetching user weather info:", err);
        }
    });
}
