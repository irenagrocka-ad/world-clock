/**
 * Function to update the time for the current location and display it on the page
 */
let intervalId; // Variable to hold the interval ID
function updateTimeCurrentLocation() {
    // Your current location time updating function
    let yourCityElement = document.querySelector("#your-city");
    let yourCityNameElement = document.querySelector(".city-name");
    let yourCityTimeElement = document.querySelector(".time");
    let yourCityDateElement = document.querySelector(".date");
    cityTimezone = moment.tz.guess();
    let yourCityName = cityTimezone.replace("_", " ").split("/")[1];
    let yourCityTime = moment().tz(cityTimezone);
    yourCityNameElement.innerHTML = yourCityName;
    yourCityTimeElement.innerHTML = yourCityTime.format(
        "h:mm:ss[<small>] A[</small>]"
    );
    yourCityDateElement.innerHTML = yourCityTime.format("dddd, MMMM Do YYYY");
}

/**
 * Function to update the time for the selected city and display it on the page
 * - Timezone of the selected city
 */
function updateTimeSelectedCity(cityTimezone) {
    // Update selected city time by seconds
    let citiesElement = document.querySelector("#cities");
    let cityName = cityTimezone.replace("_", " ").split("/")[1];
    let cityTime = moment().tz(cityTimezone);
    citiesElement.innerHTML = `
        <div class="city">
            <span class="city-name"><strong>${cityName}</strong></span>
            <div class="date">${cityTime.format("dddd, MMMM Do YYYY")}</div>
        </div>
        <img id="city-image" src="src/images/${cityName}.jpg" alt="City image"/>
        <div class="time">${cityTime.format("h:mm:ss[<small>] A[</small>]")}</div>
    `;
}

/**
 * Function to handle the change event when a city is selected from the dropdown
 */
function showCityTime(event) {
    let cityTimezone = event.target.value;
    // Clear previous interval if it exists
    clearInterval(intervalId);

    if (cityTimezone.length > 0) {
        if (cityTimezone === "current") {
            updateTimeCurrentLocation(); // Update current location time immediately
            intervalId = setInterval(updateTimeCurrentLocation, 1000); // Update current location time continuously
        } else {
            updateTimeSelectedCity(cityTimezone); // Update selected city time immediately
            intervalId = setInterval(() => updateTimeSelectedCity(cityTimezone), 1000); // Update selected city time continuously
        }
    } else {
        console.error("Select City", cityTimezone);
        return;
    }
}

let citySelectElement = document.querySelector("#city-selector");
citySelectElement.addEventListener("change", showCityTime);

// Initial call to showCityTime with default value
showCityTime({ target: { value: 'current' } });