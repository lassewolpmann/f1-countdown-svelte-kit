import type { AllSeriesData, Event } from "$lib/types/Data";

export class MetaDescription {
    seriesList: string[];
    seriesData: AllSeriesData;
    descriptionString: string;

    constructor(seriesList: string[], seriesData: AllSeriesData) {
        this.seriesList = seriesList;
        this.seriesData = seriesData;
        this.descriptionString = this.createDescriptionString();
    }

    createDescriptionString(): string {
        let dString = `When is the next F1, F2 and F3 race? Countdown to the `

        for (const seriesName of this.seriesList) {
            const nextEvent = this.getNextEvent(seriesName);
            const nextEventYear = this.getEventYear(nextEvent);
            const nextEventName = `${nextEvent.name} Grand Prix`;
            const nextEventSessions = Object.keys(nextEvent.sessions).map((sessionName => sessionName.toUpperCase()));

            if (seriesName === 'f1') {
                dString = dString.concat(`${nextEventYear} ${seriesName.toUpperCase()} ${nextEventName} ${nextEventSessions.join(', ')}; `)
            } else {
                dString = dString.concat(`${nextEventYear} ${seriesName.toUpperCase()} ${nextEventName}; `)
            }
        }

        return dString
    }

    getNextEvent(seriesName: string) {
        const seriesData = this.seriesData[seriesName];

        let nextEvents;
        if (seriesData) nextEvents = seriesData.nextEvents;

        let nextEvent;
        if (nextEvents) nextEvent = nextEvents.at(0);

        if (nextEvent) {
            return nextEvent
        } else {
            return {} as Event
        }
    }

    getEventYear(event: Event): number {
        const eventSessions = event.sessions;
        const raceYear = Object.values(eventSessions).at(-1);

        if (raceYear) {
            return new Date(raceYear).getFullYear()
        } else {
            return 0
        }
    }
}