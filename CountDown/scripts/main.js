const th = document.getElementById("timeHeader");

function start(){
    let timeInput = document.getElementById("time").value;
    if(timeInput){
        console.log(timeInput);
    }
    else{
        console.log("Fail")
    }
}

function setTimer(){
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    if(hour > 12)
    {
        hour -= 12;
    }
    if(hour < 10)
    {
        hour = "0" + hour;
    }
    if(minute < 10)
    {
        minute = "0" + minute;
    }
    if(second < 10)
    {
        second = "0" + second;
    }

    th.innerText = `${hour}:${minute}:${second}`;
}

setInterval(setTimer, 1000);
