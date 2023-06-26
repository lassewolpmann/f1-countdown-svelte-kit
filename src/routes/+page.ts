/** @type {import('./$types').PageLoad} */
import { getWeatherForecast, getSessionDateForecast } from "$lib/functions/WeatherForecast";
import type { Forecast } from "$lib/functions/WeatherForecast";

interface Event {
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    round: number;
    slug: string;
    localeKey: string;
    sessions: Array<any>;
}

interface SeriesData {
    nextEvents: Array<Event>,
    previousEvent: Event | undefined,
    weatherForecast: Array<Forecast>
}

export const load = (async ({ fetch }: any) => {
    const data: { [key: string]: SeriesData } = {}

    const seriesList: string[] = ['f1', 'f2', 'f3'];

    for (const series of seriesList) {
        const allEvents: Array<Event> = await getAllEvents(series, fetch);
        const nextEvents: Array<Event> = getNextEvents(allEvents);

        data[series] = {} as SeriesData;
        data[series].nextEvents = nextEvents;
        data[series].previousEvent = getPreviousEvent(allEvents, nextEvents);

        // Weather Forecast
        data[series].weatherForecast = [];

        let nextEvent: Event | undefined = nextEvents.at(0);
        if (!nextEvent) nextEvent = {} as Event;

        const lat: number = nextEvent.latitude;
        const lon: number = nextEvent.longitude;

        const eventDailyForecast = await getWeatherForecast(lat, lon, 'daily', fetch);
        const eventHourlyForecast = await getWeatherForecast(lat, lon, 'hourly', fetch);

        const nextEventSessions: { [key: string]: any } = nextEvent['sessions'];
        const nextEventSessionNames: string[] = Object.keys(nextEvent['sessions']);

        for (const sessionName of nextEventSessionNames) {
            const sessionDate = nextEventSessions[sessionName];

            const sessionTimestamp = new Date(sessionDate).getTime();
            const currentTimestamp = new Date().getTime();
            const deltaSessionToCurrent = sessionTimestamp - currentTimestamp;

            // Need to subtract one hour to account for weather forecast accuracy
            const fourDaysInSeconds = (4 * 24 * 60 * 60 * 1000) - (60 *  60 * 1000);

            let sessionForecast;

            if (deltaSessionToCurrent < fourDaysInSeconds) {
                sessionForecast = getSessionDateForecast(eventHourlyForecast, sessionDate);
            } else {
                sessionForecast = getSessionDateForecast(eventDailyForecast, sessionDate);
            }

            if (sessionForecast) data[series].weatherForecast.push(sessionForecast);
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