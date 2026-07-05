async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'd955a8643ee4fdc2eee5b12cab0c4a9f';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "200") {
            let htmlContent = `<h2>${data.city.name}</h2>`;
            
            for (let i = 0; i < data.list.length; i += 8) {
                const dayData = data.list[i];
                htmlContent += `
                    <p>Date: ${dayData.dt_txt.split(' ')[0]}</p>
                    <p>Temp: ${dayData.main.temp}°C</p>
                    <p>Humidity: ${dayData.main.humidity}%</p>
                    <p>Weather: ${dayData.weather[0].description}</p>
                    <hr>
                `;
            }
            document.getElementById('weatherResult').innerHTML = htmlContent;
        } else {
            document.getElementById('weatherResult').innerHTML = '<p>City not found!</p>';
        }
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = '<p>Error fetching data.</p>';
    }
}