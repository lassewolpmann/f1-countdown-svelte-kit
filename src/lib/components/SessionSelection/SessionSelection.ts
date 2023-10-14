export const findCurrentSessionIndex = (nextEventSessions: { [key: string]: string }): number => {
    const sessionDates: string[] = Object.values(nextEventSessions);
    const nextSessionDate: string | undefined = sessionDates.filter((sessionDate: string): boolean => {
        const sessionTimestamp: number = new Date(sessionDate).getTime();
        const currentTimestamp: number = new Date().getTime();

        return sessionTimestamp > currentTimestamp
    }).at(0);

    if (nextSessionDate) {
        return sessionDates.indexOf(nextSessionDate)
    } else {
        return sessionDates.length - 1
    }
}