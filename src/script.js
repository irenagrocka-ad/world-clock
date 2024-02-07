
function showCityTime(event) {
    let citiesElement = document.querySelector("#cities");
    let cityTimezone = event.target.value;

    if (cityTimezone.length > 0) {
        if (cityTimezone === "current") {
            setInterval(() => {
                cityTimezone = moment.tz.guess();
                let yourCityName = cityTimezone.replace("_", " ").split("/")[1];
                let yourCityTime = moment().tz(cityTimezone);
                citiesElement.innerHTML = `
                    <div class="city">
                        <span><strong>${yourCityName}</strong></span>
                        <div class="date">${yourCityTime.format("dddd, MMMM Do YYYY")}</div>
                    </div>
                    <div class="time">${yourCityTime.format("h:mm:ss[<small>] A[</small >]")}</div>
                `;
            }, 1000);
        } else {
            setInterval(() => {
                let cityName = cityTimezone.replace("_", " ").split("/")[1];
                let cityTime = moment().tz(cityTimezone);
                citiesElement.innerHTML = `
                    <div class="city">
                        <span><strong>${cityName}</strong></span>
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

showCityTime({ target: { value: citySelectElement.value } });