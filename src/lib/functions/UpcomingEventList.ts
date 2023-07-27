import type { Event } from "$lib/types/Data";

export const parseName = (name: string) => {
    if (name.includes("Grand Prix")) {
        return name
    } else {
        return name + " Grand Prix"
    }
}

export const parseDate = (sessionDate: string | unknown) => {
    if (typeof sessionDate === "string") {
        return new Date(sessionDate).toLocaleString(undefined, {
            month: 'short',
            day: '2-digit'
        })
    } else {
        return undefined
    }
}

export const parseTime = (sessionDate: string | unknown) => {
    if (typeof sessionDate === "string") {
        return new Date(sessionDate).toLocaleString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        })
    } else {
        return undefined
    }
}

export const getLocationURL = (event: Event) => {
    return `https://www.google.com/maps/place/${event.latitude},${event.longitude}`
}