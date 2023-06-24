/** @type {import('./$types').PageLoad} */
import { getWeatherForecast } from "$lib/functions/WeatherForecast";
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
    weatherForecast: Forecast
}

export const load = (async ({ fetch }: any) => {
    const data: { [key: string]: SeriesData } = {}

    const seriesList: string[] = ['f1', 'f2', 'f3'];
    const currentYear: number = new Date().getFullYear();

    for (const series of seriesList) {
        const apiURL: URL = new URL(`https://raw.githubusercontent.com/sportstimes/f1/main/_db/${series}/${currentYear}.json`);

        const allEvents: Array<Event> = await getAllEvents(apiURL, fetch);
        const nextEvents: Array<Event> = getNextEvents(allEvents);

        data[series] = {} as SeriesData;
        data[series].nextEvents = nextEvents;
        data[series].previousEvent = getPreviousEvent(allEvents, nextEvents);

        const nextEvent: Event = nextEvents[0];
        const lat: number = nextEvent.latitude;
        const lon: number = nextEvent.longitude;

        const nextEventSessions: { [key: string]: any } = nextEvent['sessions'];
        const nextEventSessionNames: string[] = Object.keys(nextEvent['sessions']);

        const firstSessionName = nextEventSessionNames.at(0);
        let firstSessionDate;

        if (firstSessionName) {
            firstSessionDate = nextEventSessions[firstSessionName];
        }

        data[series].weatherForecast = await getWeatherForecast(lat, lon, firstSessionDate, fetch)
    }

    return {
        seriesList: seriesList,
        seriesData: data
    }
});

async function getAllEvents(url: URL, fetch: any) {
    const res: Response = await fetch(url);

    const allEvents = await res.json();

    return allEvents['races']
}

function getNextEvents(allEvents: Array<Event>): Event[] {
    const timestamp: number = new Date().getTime();

    let nextEvents: Array<Event> = allEvents.filter((event: Event): boolean => {
        const eventSessions: object = event['sessions'];
        const eventSessionTimestamps: string[] = Object.values(eventSessions);

        const raceEndTime: string | undefined = eventSessionTimestamps.at(-1);

        return raceEndTime !== undefined ? new Date(raceEndTime).getTime() > timestamp : false
    })


    if (nextEvents.length === 0) { // @ts-ignore
        nextEvents = [allEvents.at(-1)];
    }

    return nextEvents
}


function getPreviousEvent(allEvents: Array<Event>, nextEvents: Array<Event>): Event {
    // @ts-ignore
    return allEvents.length === nextEvents.length ? allEvents.at(0) : allEvents.at(-1);
}