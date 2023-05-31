export const calculateDelta = (nextEventSessions: { [key: string]: string },
                               previousEventSessions:  { [key: string]: string },
                               currentSessionIndex: number)  => {
    let nextEventSessionNames = Object.keys(nextEventSessions);
    let previousEventSessionNames = Object.keys(previousEventSessions);

    let nextSessionTime = nextEventSessions[nextEventSessionNames[currentSessionIndex]];
    let previousSessionTime = previousEventSessions[previousEventSessionNames[currentSessionIndex]];

    let nextSessionTimestamp = new Date(nextSessionTime).getTime();
    let previousSessionTimestamp = new Date(previousSessionTime).getTime();

    let deltaInSeconds = calculateDeltaInSeconds(nextSessionTimestamp);
    let deltaInDays = calculateDaysDelta(nextSessionTimestamp, previousSessionTimestamp);

    return {
        delta: deltaInSeconds,
        days: Math.floor(deltaInSeconds / 86400),
        hours: Math.floor(deltaInSeconds % 86400 / 3600),
        minutes: Math.floor(deltaInSeconds % 86400 % 3600 / 60),
        seconds: Math.floor(deltaInSeconds % 86400 % 3600 % 60),
        daysPct: (deltaInSeconds / 86400) / deltaInDays,
        hoursPct: (deltaInSeconds % 86400 / 3600) / 24,
        minutesPct: (deltaInSeconds % 86400 % 3600 / 60) / 60,
        secondsPct: (deltaInSeconds % 86400 % 3600 % 60) / 60
    }
}

const calculateDeltaInSeconds = (nextSessionTimestamp: number) => {
    let delta: number = Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000);

    if (Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000) <= 0) {
        delta = 0
    }

    return delta
}

function calculateDaysDelta(nextSessionTimestamp: number, previousSessionTimestamp: number) {
    const deltaBetweenRaces = Math.floor((nextSessionTimestamp - previousSessionTimestamp) / 1000)

    return Math.floor(deltaBetweenRaces / 86400)
}