export const findCurrentSessionIndex = (nextEventSessions: object) => {
    const nextEventSessionNames = Object.keys(nextEventSessions);
    const nextEventSessionsAsArray = Object.entries(nextEventSessions);
    const filtered = nextEventSessionsAsArray.filter(([sessionName, time]) => {
        const currentTimestamp = new Date().getTime();
        const sessionTimestamp = new Date(time).getTime();

        return currentTimestamp < sessionTimestamp;
    });

    const nextSession = filtered[0];
    const nextSessionIndex = nextEventSessionsAsArray.indexOf(nextSession);

    if (nextSessionIndex > nextEventSessionNames.length - 1) {
        return nextEventSessionNames.length - 1;
    } else {
        return nextSessionIndex;
    }
}