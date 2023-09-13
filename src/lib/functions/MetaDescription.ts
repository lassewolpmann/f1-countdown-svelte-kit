import type { AllSeriesData, SeriesData, Event } from "$lib/types/Data";

const getNextEvent = (data: AllSeriesData, seriesName: string): Event => {
    const seriesData: SeriesData | undefined = data[seriesName];

    let nextEvents, nextEvent;

    if (seriesData) nextEvents = seriesData.nextEvents;
    if (nextEvents) nextEvent = nextEvents.at(0);

    if (nextEvent) {
        return nextEvent;
    } else {
        return {} as Event
    }
}

export const getNextEventName = (data: AllSeriesData, seriesName: string): string => {
    const nextEvent: Event = getNextEvent(data, seriesName)

    return nextEvent.name
}

export const getSessionNames = (data: AllSeriesData, seriesName: string): string => {
    const nextEvent: Event = getNextEvent(data, seriesName)

    return Object.keys(nextEvent.sessions).join(', ').toUpperCase()
}