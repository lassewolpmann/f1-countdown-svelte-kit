/** @type {import('./$types').PageLoad} */
import { getWeatherForecast, findCurrentForecast } from "$lib/functions/WeatherForecast";
import type { Forecast } from "$lib/functions/WeatherForecast";

interface Event {
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    round: number;
    slug: string;
    localeKey: string;
    sessions: { [key: string]: string };
}

interface SeriesData {
    nextEvents: Array<Event>,
    previousEvent: Event | undefined,
    weatherForecast: Array<Forecast[]>
}

export const load = (async ({ fetch }: any) => {
    const data: { [key: string]: SeriesData } = {}

    const seriesList: string[] = ['f1', 'f2', 'f3'];

    for (const series of seriesList) {
        const allEvents: Array<Event> = await getAllEvents(series, fetch);
        const nextEvents: Array<Event> = getNextEvents(allEvents);

        data[series] = {} as SeriesData;
        data[series].weatherForecast = [];
        data[series].nextEvents = nextEvents;
        data[series].previousEvent = getPreviousEvent(allEvents, nextEvents);

        // Weather Forecast
        let nextEvent: Event | undefined = nextEvents.at(0);
        if (!nextEvent) nextEvent = {} as Event;

        const lat: number = nextEvent.latitude;
        const lon: number = nextEvent.longitude;

        const fourDaysInMs: number = 4 * 24 * 60 * 60 * 1000;

        for (const sessionName of Object.keys(nextEvent.sessions)) {
            const sessionTimestamp: number = new Date(nextEvent.sessions[sessionName]).getTime();
            let forecast: Forecast[], accuracy, filteredForecast: any[] = [];
            const range = 4;

            if (sessionTimestamp - new Date().getTime() < fourDaysInMs) {
                accuracy = 'hourly';
                forecast = await getWeatherForecast(lat, lon, accuracy, fetch);
            } else {
                accuracy = 'daily';
                forecast = await getWeatherForecast(lat, lon, accuracy, fetch);
            }

            if (forecast) {
                const currentForecastIndex: number = findCurrentForecast(sessionTimestamp, forecast, accuracy);

                for (let i = currentForecastIndex - range; i <= currentForecastIndex + range; i++) {
                    if (i < 0) {
                        filteredForecast.push(undefined);
                    } else {
                        filteredForecast.push(forecast.at(i));
                    }
                }
            } else {
                filteredForecast = []
            }

            data[series].weatherForecast.push(filteredForecast);
        }
    }

    return {
        seriesList: seriesList,
        seriesData: data
    }
});

async function getAllEvents(series: string, fetch: any) {
    const currentYear: number = new Date().getFullYear();

    const apiURL: URL = new URL(`https://raw.githubusercontent.com/sportstimes/f1/main/_db/${series}/${currentYear}.json`);
    const res: Response = await fetch(apiURL);

    const allEvents = await res.json();

    return allEvents['races']
}

function getNextEvents(allEvents: Array<Event>): Event[] {
    const timestamp: number = new Date().getTime();

    let nextEvents: Array<Event> = allEvents.filter((event: Event): boolean => {
        const eventSessions: object = event['sessions'];
        const eventSessionTimestamps: string[] = Object.values(eventSessions);

        const raceEndTime: string | undefined = eventSessionTimestamps.at(-1);

        return raceEndTime ? new Date(raceEndTime).getTime() > timestamp : false
    })

    if (nextEvents.length === 0) {
        const lastEvent: Event | undefined = allEvents.at(-1);
        if (lastEvent) nextEvents = [lastEvent];
    }

    return nextEvents
}

function getPreviousEvent(allEvents: Array<Event>, nextEvents: Array<Event>): Event {
    let previousEvent;

    if (allEvents.length === nextEvents.length) {
        previousEvent = allEvents.at(-1);
    } else {
        const previousEventIndex = allEvents.length - nextEvents.length - 1;
        previousEvent = allEvents.at(previousEventIndex);
    }

    if (!previousEvent) previousEvent = {} as Event

    return previousEvent
}