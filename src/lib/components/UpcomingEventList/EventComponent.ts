import type { Event } from "$lib/types/Data"

export class EventComponent {
    event: Event
    locationURL: string;
    sessionNames: string[];
    eventName: string;
    sessionsHidden: boolean;

    sessionsDateTime: string[];
    sessionDates: string[];
    sessionTimes: string[];

    raceDate: string | undefined;
    raceTime: string | undefined;

    constructor(event: Event) {
        this.event = event;
        this.locationURL = `https://www.google.com/maps/place/${this.event.latitude},${this.event.longitude}`;
        this.eventName = this.parseName(this.event.name);
        this.sessionNames = Object.keys(this.event.sessions);
        this.sessionsHidden = true;

        this.sessionsDateTime = Object.values(this.event.sessions);
        this.sessionDates = [];
        this.sessionTimes = [];

        for (const sessionDateTime of this.sessionsDateTime) {
            const sessionDate = this.parseDate(sessionDateTime);
            const sessionTime = this.parseTime(sessionDateTime);

            if (sessionDate) this.sessionDates.push(sessionDate);
            if (sessionTime) this.sessionTimes.push(sessionTime);
        }

        this.raceDate = this.sessionDates.at(-1);
        this.raceTime = this.sessionTimes.at(-1);
    }

    parseName = (name: string) => {
        if (name.includes("Grand Prix")) {
            return name
        } else {
            return name + " Grand Prix"
        }
    }

    parseDate = (sessionDate: string | undefined) => {
        if (sessionDate) {
            return new Date(sessionDate).toLocaleString(undefined, {
                month: 'short',
                day: '2-digit'
            })
        } else {
            return undefined
        }
    }

    parseTime = (sessionDate: string | undefined) => {
        if (sessionDate) {
            return new Date(sessionDate).toLocaleString(undefined, {
                hour: '2-digit',
                minute: '2-digit'
            })
        } else {
            return undefined
        }
    }
}