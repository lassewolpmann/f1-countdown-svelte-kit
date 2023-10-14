export class Timer {
    private readonly nextEventSessions: { [key: string]: string };
    private readonly currentSessionIndex: number;

    public timerInterval: any;

    public delta: number;

    public deltaDays: number = 0;
    public deltaHours: number = 0;
    public deltaMinutes: number = 0;
    public deltaSeconds: number = 0;

    public deltaDaysPct: number = 0;
    public deltaHoursPct: number = 0;
    public deltaMinutesPct: number = 0;
    public deltaSecondsPct: number = 0;

    constructor(nextEventSessions: { [key: string]: string }, currentSessionIndex: number) {
        this.nextEventSessions = nextEventSessions;
        this.currentSessionIndex = currentSessionIndex;
        this.delta = this.calculateDelta();
    }

    calculateDelta = ()  => {
        const nextEventSessionDates: string[] = Object.values(this.nextEventSessions);
        const nextSessionTime: string | undefined = nextEventSessionDates.at(this.currentSessionIndex);

        let nextSessionTimestamp: number = 0;
        if (nextSessionTime) nextSessionTimestamp = new Date(nextSessionTime).getTime();

        this.delta = this.calculateDeltaInSeconds(nextSessionTimestamp);

        this.deltaDays = Math.floor(this.delta / 86400);
        this.deltaHours = Math.floor(this.delta % 86400 / 3600);
        this.deltaMinutes = Math.floor(this.delta % 86400 % 3600 / 60);
        this.deltaSeconds = Math.floor(this.delta % 86400 % 3600 % 60);

        this.deltaDaysPct = (this.delta / 86400) / 7;
        this.deltaHoursPct = (this.delta % 86400 / 3600) / 24;
        this.deltaMinutesPct = (this.delta % 86400 % 3600 / 60) / 60;
        this.deltaSecondsPct = (this.delta % 86400 % 3600 % 60) / 60;

        return this.delta
    }

    calculateDeltaInSeconds = (nextSessionTimestamp: number) => {
        let delta: number = Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000);

        if (Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000) <= 0) {
            delta = 0
        }

        return delta
    }
}