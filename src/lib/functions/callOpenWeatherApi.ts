import { PUBLIC_OPEN_WEATHER_API_KEY } from '$env/static/public';
import { sql } from "@vercel/postgres";

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
    // TODO: Add rate limiting for API calls
    // Current limits: 3,000 calls/minute and 100,000,000 calls/month
    // At the current rate of site visits, rate limiting won't be necessary
    // It's still a good idea to implement it sooner than later

    // TODO: Create Postgres database and store site calls

    const sessionTimestamp = new Date(sessionDate).getTime();
    const currentTimestamp = new Date().getTime();
    const deltaSessionToCurrent = sessionTimestamp - currentTimestamp;
    const fourDaysInSeconds = 4 * 24 * 60 * 60 * 1000;

    const apiKey: string = PUBLIC_OPEN_WEATHER_API_KEY;

    const forecastAccuracy: string = deltaSessionToCurrent > fourDaysInSeconds ? 'daily' : 'hourly';

    const apiUrl: URL = new URL(`https://pro.openweathermap.org/data/2.5/forecast/${forecastAccuracy}`);
    apiUrl.searchParams.append('lat', lat.toString());
    apiUrl.searchParams.append('lon', lon.toString());
    apiUrl.searchParams.append('appid', apiKey);
    apiUrl.searchParams.append('units', 'metric');
    apiUrl.searchParams.append('mode', 'json');

    if (deltaSessionToCurrent > fourDaysInSeconds) {
        apiUrl.searchParams.append('cnt', '16');
    }

    const res = await fetch(apiUrl);

    if (res.ok) {
        const data = await res.json();
        return data['list'];
    }
}

export const getSessionDateForecast = (allForecast: Forecast[], sessionDate: string) => {
    const sessionTimestamp = new Date(sessionDate).getTime();

    return allForecast.filter((forecast: Forecast) => {
        const forecastTimestamp = forecast.dt * 1000;

        return forecastTimestamp > sessionTimestamp
    }).at(0)
}