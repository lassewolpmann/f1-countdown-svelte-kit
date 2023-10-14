import type { Event } from "$lib/types/Data"

export class UpcomingEvent {
    event: Event
    locationURL: string;
    eventName: string;

    sessionNames: string[];

    sessionsHidden: boolean;

    sessionsDateTime: string[];
    sessionDates: (string | undefined)[];
    sessionTimes: (string | undefined)[];

    raceDate: string | undefined;
    raceTime: string | undefined;

    constructor(event: Event) {
        this.event = event;
        this.locationURL = `https://www.google.com/maps/place/${this.event.latitude},${this.event.longitude}`;
        this.eventName = this.parseName(this.event.name);

        this.sessionNames = Object.keys(this.event.sessions).map(this.toUpper);

        this.sessionsHidden = true;

        this.sessionsDateTime = Object.values(this.event.sessions);
        this.sessionDates = this.sessionsDateTime.map(this.parseDate);
        this.sessionTimes = this.sessionsDateTime.map(this.parseTime);

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

    parseDate = (sessionDate: string) => {
        return new Date(sessionDate).toLocaleString(undefined, {
            month: 'short',
            day: '2-digit'
        })
    }

    parseTime = (sessionDate: string) => {
        return new Date(sessionDate).toLocaleString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    toUpper = (name: string) => {
        return name.toUpperCase()
    }
}