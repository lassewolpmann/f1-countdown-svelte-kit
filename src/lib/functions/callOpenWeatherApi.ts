import { PUBLIC_OPEN_WEATHER_API_KEY } from '$env/static/public';

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

    let cnt;
    if (deltaSessionToCurrent > fourDaysInSeconds) {
        cnt = '16';
    } else {
        cnt = '96';
    }

    apiUrl.searchParams.append('cnt', cnt);

    const res = await fetch(apiUrl);

    if (res.ok) {
        const data = await res.json();
        return data['list'];
    }
}

export const getSessionDateForecast = (allForecast: Forecast[], sessionDate: string) => {
    const sessionTimestamp = new Date(sessionDate).getTime();

    const filteredForecast = allForecast.filter((forecast: Forecast) => {
        const forecastTimestamp = forecast.dt * 1000;

        if (allForecast.length === 16) {
            // Daily forecast has 16 entries
            const sessionDate = new Date(sessionTimestamp).getDate();
            const forecastDate = new Date(forecastTimestamp).getDate();

            // Return entry that has the same date as session (date in this context means, day of the month (1-31))
            return sessionDate === forecastDate
        } else if (allForecast.length === 96) {
            // Hourly forecast has 96 entries
            return sessionTimestamp < forecastTimestamp
        }
    })

    if (filteredForecast.length > 0) {
        return filteredForecast.at(0)
    } else {
        return undefined
    }
}