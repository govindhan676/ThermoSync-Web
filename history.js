const USERNAME = "UPI_payments1";
const FEED = "temperature";
const AIO_KEY = "YOUR_AIO_KEY";

let allData = [];

async function loadHistory() {

    try {

        const response = await fetch(
            `https://io.adafruit.com/api/v2/${USERNAME}/feeds/${FEED}/data`,
            {
                headers: {
                    "X-AIO-Key": AIO_KEY
                }
            }
        );

        allData = await response.json();

        if (!allData || allData.length === 0) {
            return;
        }

        displayTable(allData);
        calculateStats(allData);

    }
    catch (error) {

        console.error("History Error:", error);

    }
}

function displayTable(data) {

    const tableBody =
    document.getElementById("tableBody");

    tableBody.innerHTML = "";

    data.forEach(item => {

        const date =
        new Date(item.created_at);

        const row = `
        <tr>
            <td>${date.toLocaleDateString()}</td>
            <td>${date.toLocaleTimeString()}</td>
            <td>${item.value} °C</td>
        </tr>
        `;

        tableBody.insertAdjacentHTML(
            "beforeend",
            row
        );
    });
}

function calculateStats(data) {

    if (!data || data.length === 0)
        return;

    const temps =
    data.map(item =>
        parseFloat(item.value)
    );

    document.getElementById(
        "totalRecords"
    ).innerText =
    data.length;

    document.getElementById(
        "maxTemp"
    ).innerText =
    Math.max(...temps);

    document.getElementById(
        "minTemp"
    ).innerText =
    Math.min(...temps);
}

function filterData() {

    const selectedDate =
    document.getElementById(
        "dateFilter"
    ).value;

    if (!selectedDate) {

        displayTable(allData);
        calculateStats(allData);
        return;
    }

    const filtered =
    allData.filter(item => {

        const itemDate =
        new Date(item.created_at)
        .toISOString()
        .split("T")[0];

        return itemDate === selectedDate;
    });

    displayTable(filtered);
    calculateStats(filtered);
}

function downloadCSV() {

    let csv =
    "Date,Time,Temperature\n";

    allData.forEach(item => {

        const date =
        new Date(item.created_at);

        csv +=
        `${date.toLocaleDateString()},${date.toLocaleTimeString()},${item.value}\n`;
    });

    const blob =
    new Blob(
        [csv],
        {
            type: "text/csv"
        }
    );

    const url =
    URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href = url;
    a.download =
    "ThermoSync_Data.csv";

    a.click();

    URL.revokeObjectURL(url);
}

function downloadPDF() {

    const { jsPDF } =
    window.jspdf;

    const doc =
    new jsPDF();

    doc.setFontSize(20);

    doc.text(
        "ThermoSync Temperature Report",
        20,
        20
    );

    doc.setFontSize(12);

    let y = 40;

    allData.forEach(item => {

        const date =
        new Date(item.created_at);

        const line =
        `${date.toLocaleDateString()} | ${date.toLocaleTimeString()} | ${item.value} °C`;

        doc.text(
            line,
            20,
            y
        );

        y += 10;

        if (y > 270) {

            doc.addPage();

            y = 20;
        }
    });

    doc.save(
        "ThermoSync_Report.pdf"
    );
}

loadHistory();