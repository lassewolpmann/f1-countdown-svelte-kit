/** @type {import('./$types').PageLoad} */

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
    allEvents: Array<Event>,
    nextEvents: Array<Event>,
    nextEvent: Event,
    previousEvent: Event,
    nextEventSessions: Array<any>,
    previousEventSessions: Array<any>
}

// @ts-ignore
export const load = (async ({ fetch }) => {
    const data: { [key: string]: SeriesData } = {}

    const seriesList: string[] = ['f1', 'f2', 'f3'];
    const currentYear: number = new Date().getFullYear();

    for (const series of seriesList) {
        const apiURL: URL = new URL(`https://raw.githubusercontent.com/sportstimes/f1/main/_db/${series}/${currentYear}.json`);

        const allEvents: Array<Event> = await getAllEvents(apiURL, fetch);
        const nextEvents: Array<Event> = getNextEvents(allEvents);

        data[series] = {} as SeriesData;
        data[series].allEvents = allEvents;
        data[series].nextEvents = nextEvents;
        data[series].nextEvent = nextEvents[0];
        data[series].previousEvent = getPreviousEvent(allEvents, nextEvents);
        data[series].nextEventSessions = nextEvents[0]['sessions'];
        data[series].previousEventSessions = getPreviousEvent(allEvents, nextEvents)['sessions'];
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
    // const timestamp = new Date('2023-07-01 19:35:00Z').getTime();

    let nextEvents: Array<Event> = allEvents.filter((event: Event): boolean => {
        const eventSessions: object = event['sessions'];
        const eventSessionTimestamps: string[] = Object.values(eventSessions);

        const raceEndTime: string = eventSessionTimestamps[eventSessionTimestamps.length - 1];
        const raceEndTimestamp = new Date(raceEndTime).getTime();

        return raceEndTimestamp > timestamp
    })

    // If current event is last event of season
    if (nextEvents.length === 0) {
        nextEvents = [allEvents[allEvents.length - 1]]
    }

    return nextEvents
}


function getPreviousEvent(allEvents: Array<Event>, nextEvents: Array<Event>): Event {
    if (allEvents.length === nextEvents.length) {
        // If current event is first event of season
        return allEvents[0]
    } else {
        return allEvents[allEvents.length - nextEvents.length - 1]
    }
}