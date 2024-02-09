let intervalId; // Variable to hold the interval ID
function updateTime() {
    // Your
    let yourCityElement = document.querySelector("#your-city");
    let yourCityNameElement = document.querySelector(".city-name");
    let yourCityTimeElement = document.querySelector(".time");
    let yourCityDateElement = document.querySelector(".date"); // Your Element
    cityTimezone = moment.tz.guess();
    let yourCityName = cityTimezone.replace("_", " ").split("/")[1];
    let yourCityTime = moment().tz(cityTimezone);
    yourCityNameElement.innerHTML = yourCityName;
    yourCityTimeElement.innerHTML = yourCityTime.format(
        "h:mm:ss[<small>] A[</small >]"
    );
    yourCityDateElement.innerHTML = yourCityTime.format("dddd, MMMM Do YYYY");

}

updateTime();
//setInterval(updateTime, 1000); // this function is breaking page when selecting city from dropdown 



function showCityTime(event) {

    let citiesElement = document.querySelector("#cities");
    let cityTimezone = event.target.value;

    // Clear previous interval if it exists
    clearInterval(intervalId);
    console.log("After clearing interval:", intervalId);

    if (cityTimezone.length > 0) {
        if (cityTimezone === "current") {
            intervalId = setInterval(() => {
                cityTimezone = moment.tz.guess();
                let yourCityName = cityTimezone.replace("_", " ").split("/")[1];
                let yourCityTime = moment().tz(cityTimezone);
                citiesElement.innerHTML = `
                    <div class="city">
                        <lord-icon
                            src="https://cdn.lordicon.com/iikoxwld.json"
                            trigger="hover"
                            style="width: 70px; height: 70px"
                        ></lord-icon>
                        <span class="city-name"><strong>${yourCityName}</strong></span>
                        <div class="date">${yourCityTime.format("dddd, MMMM Do YYYY")}</div>
                    </div>
                    <div class="time">${yourCityTime.format("h:mm:ss[<small>] A[</small >]")}</div>
                `;
            }, 1000);
        } else {
            intervalId = setInterval(() => {
                let cityName = cityTimezone.replace("_", " ").split("/")[1];
                let cityTime = moment().tz(cityTimezone);
                citiesElement.innerHTML = `
                    <div class="city">
                        <img id="city-image" src="src/images/${cityName}.jpg" alt="City image" />
                        <span class="city-name"><strong>${cityName}</strong></span>
                        <div class="date">${cityTime.format("dddd, MMMM Do YYYY")}</div>
                    </div>
                    <div class="time">${cityTime.format("h:mm:ss[<small>] A[</small >]")}</div>
                `;
            }, 1000);
        }
    } else {
        console.error("Select City", cityTimezone);
        return;
    }
}


let citySelectElement = document.querySelector("#city-selector");
citySelectElement.addEventListener("change", showCityTime);

// Initial call to showCityTime
showCityTime({ target: { value: citySelectElement.value } });
