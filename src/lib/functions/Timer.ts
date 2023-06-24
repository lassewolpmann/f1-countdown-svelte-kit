export const deltaToDays = (delta: number) => {
    return Math.floor(delta / 86400)
}

export const deltaToHours = (delta: number) => {
    return Math.floor(delta % 86400 / 3600)
}

export const deltaToMinutes = (delta: number) => {
    return Math.floor(delta % 86400 % 3600 / 60)
}

export const deltaToSeconds = (delta: number) => {
    return Math.floor(delta % 86400 % 3600 % 60)
}

export const daysToPercent = (delta: number) => {
    return (delta / 86400) / 7
}

export const hoursToPercent = (delta: number) => {
    return (delta % 86400 / 3600) / 24
}

export const minutesToPercent = (delta: number) => {
    return (delta % 86400 % 3600 / 60) / 60
}

export const secondsToPercent = (delta: number) => {
    return (delta % 86400 % 3600 % 60) / 60
}

export const calculateDelta = (nextEventSessions: { [key: string]: string },
                               currentSessionIndex: number)  => {
    let nextEventSessionNames = Object.keys(nextEventSessions);
    let nextSessionTime = nextEventSessions[nextEventSessionNames[currentSessionIndex]];
    let nextSessionTimestamp = new Date(nextSessionTime).getTime();

    return calculateDeltaInSeconds(nextSessionTimestamp)
}

const calculateDeltaInSeconds = (nextSessionTimestamp: number) => {
    let delta: number = Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000);

    if (Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000) <= 0) {
        delta = 0
    }

    return delta
}