import type { UpcomingEvent } from "$lib/types/UpcomingEventList";

export const parseName = (name: string) => {
    if (name.includes("Grand Prix")) {
        return name
    } else {
        return name + " Grand Prix"
    }
}

export const parseDate = (sessionDate: string | unknown) => {
    if (typeof sessionDate === "string") {
        return new Date(sessionDate).toDateString()
    } else {
        return undefined
    }
}

export const parseTime = (sessionDate: string | unknown) => {
    if (typeof sessionDate === "string") {
        return new Date(sessionDate).toLocaleTimeString()
    } else {
        return undefined
    }
}

export const getLocationURL = (event: UpcomingEvent) => {
    return `https://www.google.com/maps/place/${event.latitude},${event.longitude}`
}