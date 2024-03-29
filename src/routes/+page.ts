/** @type {import('./$types').PageLoad} */
import type { AllSeriesData, Event } from "$lib/types/Data";
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }: any) => {
    const allSeriesData: AllSeriesData = {};
    const seriesList: string[] = ['f1', 'f2', 'f3'];

    for (const series of seriesList) {
        const allEvents: Event[] = await getAllEvents(series, fetch);
        const nextEvents: Event[] = getNextEvents(allEvents);

        const previousEvent: Event = getPreviousEvent(allEvents, nextEvents);

        allSeriesData[series] = {
            nextEvents: nextEvents,
            previousEvent: previousEvent,
        };
    }

    // Make sure that every series has a data entry in allSeriesData
    for (const series of seriesList) {
        if (!allSeriesData[series]) throw error(404, {
            message: "Couldn't retrieve data from API"
        })
    }

    return {
        seriesList: seriesList,
        seriesData: allSeriesData
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
    // const timestamp: number = new Date('2023-10-30').getTime();

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