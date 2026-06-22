const USERNAME = "UPI_payments1";
const FEED = "temperature";
const AIO_KEY = "YOUR_AIO_KEY";

async function loadDashboard(){

    try{

        const response = await fetch(
            `https://io.adafruit.com/api/v2/${USERNAME}/feeds/${FEED}/data`,
            {
                headers:{
                    "X-AIO-Key": AIO_KEY
                }
            }
        );

        const data = await response.json();

        if(!data || data.length === 0){
            return;
        }

        const latest = data[0];

        const currentTemp =
        parseFloat(latest.value);

        document.getElementById("temperature").innerHTML =
        `${currentTemp.toFixed(2)} °C`;

        document.getElementById("gaugeValue").innerHTML =
        `${currentTemp.toFixed(0)} °C`;

        const percentage =
        Math.min((currentTemp / 600) * 100,100);

        document.getElementById("gaugeFill").style.width =
        percentage + "%";

        document.getElementById("timestamp").innerHTML =
        new Date(latest.created_at).toLocaleString();

        const temps =
        data.map(item => parseFloat(item.value));

        const avg =
        (
            temps.reduce((a,b)=>a+b,0)
            / temps.length
        ).toFixed(2);

        const max =
        Math.max(...temps);

        const min =
        Math.min(...temps);

        document.getElementById("avgTemp").innerHTML =
        `${avg} °C`;

        document.getElementById("maxTemp").innerHTML =
        `${max} °C`;

        document.getElementById("minTemp").innerHTML =
        `${min} °C`;

        const statusEl =
        document.getElementById("statusText");

        const alertBox =
        document.getElementById("alertBox");

        const currentCard =
        document.querySelector(".current-card");

        statusEl.className = "";

        if(currentTemp < 35){

            statusEl.innerHTML =
            "🟢 NORMAL";

            statusEl.classList.add("normal");

            alertBox.innerHTML =
            "Temperature Normal";

            alertBox.style.color =
            "#00ff88";

            currentCard.classList.remove(
                "critical-card"
            );
        }

        else if(currentTemp < 50){

            statusEl.innerHTML =
            "🟡 WARNING";

            statusEl.classList.add("warning");

            alertBox.innerHTML =
            "Temperature Warning";

            alertBox.style.color =
            "#ffd43b";

            currentCard.classList.remove(
                "critical-card"
            );
        }

        else{

            statusEl.innerHTML =
            "🔴 CRITICAL";

            statusEl.classList.add("critical");

            alertBox.innerHTML =
            "Temperature Critical";

            alertBox.style.color =
            "#ff4d4d";

            currentCard.classList.add(
                "critical-card"
            );
        }

        document.getElementById("feedStatus").innerHTML =
        "✅ Feed Connected";

        document.getElementById("syncStatus").innerHTML =
        "✅ Live Sync Active";

    }

    catch(error){

        console.error(error);

        document.getElementById("feedStatus").innerHTML =
        "❌ Feed Error";

        document.getElementById("syncStatus").innerHTML =
        "❌ Sync Failed";
    }
}

function updateClock(){

    document.getElementById("liveClock").innerHTML =
    new Date().toLocaleTimeString();
}

loadDashboard();
updateClock();

setInterval(loadDashboard,5000);
setInterval(updateClock,1000);