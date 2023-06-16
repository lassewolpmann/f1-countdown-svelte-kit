interface Forecast {
    clouds: object,     // Cloudiness in %
    dt: number,         // Timestamp
    dt_txt: string,     // Date in Text
    main: object,       // Main Weather information (temperature, pressure, humidity, etc.)
    pop: number,        // Probability of precipitation
    rain: object,       // Rain volume for last 3 hours, mm
    sys: object,        // Part of the day (n - night, d - day)
    visibility: number, // Average visibility, metres
    weather: object,    // Weather group
    wind: object        // Wind information
}

export const callOpenWeatherApi = async (lat: number, lon: number, sessionDate: string) => {
    const apiKey: string = 'bed46005bff7d73b44ae36e6f99be191';
    const apiUrl: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await fetch(apiUrl);

    if (res.ok) {
        const data = await res.json();
        return data['list'];
    }
}

export const getSessionDateForecast = (allForecast: Forecast[], sessionDate: string) => {
    const sessionTimestamp = new Date(sessionDate).getTime() / 1000;
    return allForecast.filter((forecast: Forecast) => {
        const forecastTimestamp = forecast.dt;

        return forecastTimestamp > sessionTimestamp
    }).at(0)
}