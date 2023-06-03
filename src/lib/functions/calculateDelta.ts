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