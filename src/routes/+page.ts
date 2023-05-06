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

export async function load() {
    const apiURL: URL = new URL('https://raw.githubusercontent.com/sportstimes/f1/main/_db/f1/2023.json');

    const allEvents: Array<Event> = await getAllEvents(apiURL);
    const nextEvents: Array<Event> = getNextEvents(allEvents);

    const nextEvent: Event = nextEvents[0];
    const previousEvent: Event = getPreviousEvent(allEvents, nextEvents);

    const nextEventSessions: Array<any> = nextEvent['sessions'];
    const previousEventSessions: Array<any> = previousEvent['sessions'];

    return {
        allEvents: allEvents,
        nextEvents: nextEvents,
        nextEvent: nextEvent,
        previousEvent: previousEvent,
        nextEventSessions: nextEventSessions,
        previousEventSessions: previousEventSessions
    }
}

async function getAllEvents(url: URL) {
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