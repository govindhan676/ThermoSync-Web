const USERNAME = "UPI_payments1";
const FEED = "temperature";
const AIO_KEY = "YOUR_AIO_KEY";

async function loadGraph()
{
    const url =
    `https://io.adafruit.com/api/v2/${USERNAME}/feeds/${FEED}/data`;

    const response =
    await fetch(url,{
        headers:{
            "X-AIO-Key":AIO_KEY
        }
    });

    const data =
    await response.json();

    const labels = [];
    const temps = [];

    data.reverse().forEach(item => {

        const date =
        new Date(item.created_at);

        labels.push(
            date.toLocaleTimeString()
        );

        temps.push(
            parseFloat(item.value)
        );
    });

    const ctx =
    document.getElementById(
        "tempChart"
    );

    new Chart(ctx,{
        type:"line",

        data:{
            labels:labels,

            datasets:[{
                label:"Temperature (°C)",

                data:temps,

                tension:0.3
            }]
        }
    });
}

loadGraph();