export interface AllSeriesData {
    [key: string]: SeriesData
}

export interface Event {
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    round: number;
    slug: string;
    localeKey: string;
    sessions: { [key: string]: string };
    sessionsTableHidden?: boolean;
}

export interface SeriesData {
    nextEvents: Array<Event>,
    previousEvent: Event | undefined
}