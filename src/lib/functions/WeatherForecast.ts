import {PUBLIC_OPEN_WEATHER_API_KEY} from '$env/static/public';

export interface Forecast {
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

export const getWeatherForecast = async (lat: number, lon: number, forecastAccuracy: string, fetch: any) => {
    // TODO: Add rate limiting for API calls
    // Current limits: 3,000 calls/minute and 100,000,000 calls/month
    // At the current rate of site visits, rate limiting won't be necessary
    // It's still a good idea to implement it sooner than later

    const apiKey: string = PUBLIC_OPEN_WEATHER_API_KEY;
    const apiUrl: URL = new URL(`https://pro.openweathermap.org/data/2.5/forecast/${forecastAccuracy}`);
    apiUrl.searchParams.append('lat', lat.toString());
    apiUrl.searchParams.append('lon', lon.toString());
    apiUrl.searchParams.append('appid', apiKey);
    apiUrl.searchParams.append('units', 'metric');
    apiUrl.searchParams.append('mode', 'json');

    // Get 16 days for daily forecast and 24 hours for hourly forecast
    const cnt: string = forecastAccuracy === 'daily' ? '16' : '96';
    apiUrl.searchParams.append('cnt', cnt);

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        return data['list'];
    } catch (error) {
        console.log(error);
        return undefined
    }
}

export const findCurrentForecast = (sessionTimestamp: number, weatherForecast: Forecast[], accuracy: string) => {
    const currentWeatherForecast: Forecast | undefined = weatherForecast.filter((forecast: Forecast) => {
        if (accuracy === 'hourly') {
            const sessionMinutes: number = new Date(sessionTimestamp).getUTCMinutes();

            // Round down minutes from 1-29, round up from 30-59
            if (sessionMinutes !== 0) {
                if (sessionMinutes < 30) {
                    sessionTimestamp = sessionTimestamp - (sessionMinutes * 60 * 1000);
                } else {
                    sessionTimestamp = sessionTimestamp + ((60 * 60 * 1000) - (sessionMinutes * 60 * 1000));
                }
            }

            const forecastTimestamp: number = forecast.dt * 1000;

            return forecastTimestamp >= sessionTimestamp
        } else {
            const forecastDate: number = new Date(forecast.dt * 1000).getUTCDate();
            const sessionDate: number = new Date(sessionTimestamp).getUTCDate();

            return forecastDate === sessionDate
        }
    }).at(0)

    return weatherForecast.findIndex((forecast: Forecast): boolean => forecast === currentWeatherForecast)
}