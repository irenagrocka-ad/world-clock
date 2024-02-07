
function updateTime() {

    let londonElement = document.querySelector("#london");
    let londonDateElement = londonElement.querySelector(".date");
    let londonTimeElement = londonElement.querySelector(".time");
    londonTime = moment().tz("Europe/London");

    londonDateElement.innerHTML = londonTime.format("dddd [the] Do [of] MMMM	YYYY");
    londonTimeElement.innerHTML = `${londonTime.format("h:mm:ss[<small>] A[</small >]")}`;

    //Los Angeles
    let losAngelesElement = document.querySelector("#los-angeles");
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    losAngelesTime = moment().tz("America/Los_Angeles");

    losAngelesDateElement.innerHTML = losAngelesTime.format("dddd [the] Do [of] MMMM	YYYY");
    losAngelesTimeElement.innerHTML = `${losAngelesTime.format("h:mm:ss[<small>] A[</small >]")}`;
}

updateTime();

setInterval(updateTime, 1000);