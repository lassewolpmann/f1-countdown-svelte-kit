import type { UpcomingEvent } from "$lib/types/UpcomingEventList";

export const parseName = (name: string) => {
    if (name.includes("Grand Prix")) {
        return name
    } else {
        return name + " Grand Prix"
    }
}

export const parseDate = (event: UpcomingEvent) => {
    const eventSessions: object = event.sessions;
    const sessionDates: string[] = Object.values(eventSessions);
    const lastSessionDate = sessionDates.at(-1);

    if (lastSessionDate) {
        return new Date(lastSessionDate).toDateString()
    } else {
        return undefined
    }
}

export const parseTime = (event: UpcomingEvent) => {
    const eventSessions: object = event.sessions;
    const sessionDates: string[] = Object.values(eventSessions);
    const lastSessionDate = sessionDates.at(-1);

    if (lastSessionDate) {
        return new Date(lastSessionDate).toLocaleTimeString()
    } else {
        return undefined
    }
}

export const getLocationURL = (event: UpcomingEvent) => {
    return `https://www.google.com/maps/place/${event.latitude},${event.longitude}`
}