interface Event {
    latitude: number,
    localeKey: string,
    location: string,
    longitude: number,
    name: string,
    round: number,
    sessions: object,
    sessionsTableVisible: boolean,
    slug: string
}

export const parseName = (name: string) => {
    if (name.includes("Grand Prix")) {
        return name
    } else {
        return name + " Grand Prix"
    }
}

export const parseDate = (date: string) => {
    return new Date(date).toDateString()
}

export const parseTime = (date: string) => {
    return new Date(date).toLocaleTimeString()
}

export const getLocationURL = (event: Event) => {
    return `https://www.google.com/maps/place/${event.latitude},${event.longitude}`
}