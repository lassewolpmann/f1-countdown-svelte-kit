import type { DataConfig, PrettySession, RaceData } from "$lib/types/RaceData";
import { flags } from "$lib/db/flags";

export interface SeriesData {
    allRaces: RaceData[]
    nextRaces: RaceData[]
    nextRace: RaceData
    dataConfig: DataConfig
}

export class APIData {
    seriesData: {[key: string]: SeriesData} = {}
    seriesOptions: string[] = ["f1", "f2", "f3", "f1-academy"];

    currentYear: number;

    constructor() {
        for (let series of this.seriesOptions) {
            this.seriesData[series] = {} as SeriesData
        }

        this.currentYear = new Date().getFullYear();
    }

    async getDataConfig(fetch: any, series: string) {
        const configURL = new URL('https://raw.githubusercontent.com');
        configURL.pathname = `sportstimes/f1/main/_db/${series}/config.json`;

        try {
            const res = await fetch(configURL);
            return await res.json();
        } catch (e) {
            return
        }
    }

    async getAllRaces(fetch: any, series: string, dataConfig: DataConfig) {
        const apiURL = new URL('https://raw.githubusercontent.com');
        apiURL.pathname = `sportstimes/f1/main/_db/${series}/${this.currentYear}.json`;

        try {
            const res = await fetch(apiURL);
            const data = await res.json();
            let races: RaceData[] = data['races']
            races = races.map(race => {
                race.name += " Grand Prix"
                race.flag = flags[race.localeKey] ?? "🏁"

                // Add extra info to sessions
                let sessions: {[key: string]: string} = race.sessions

                let prettySessions: PrettySession[] = []

                for (let session of Object.keys(sessions)) {
                    let dateString = sessions[session]
                    if (!dateString) continue

                    const date = new Date(dateString)
                    const timestamp = date.getTime();
                    const sessionLength = dataConfig.sessionLengths[session];

                    if (!sessionLength) continue

                    const endTimestamp = timestamp + (sessionLength * 60 * 1000);
                    const endDate = new Date(endTimestamp)

                    let startDateISOString = date.toISOString()
                    let endDateISOString = endDate.toISOString()

                    prettySessions.push({
                        startDate: date,
                        endDate: endDate,
                        startDateISO: startDateISOString,
                        endDateISO: endDateISOString,
                        startDateLocaleString: this.parseDate(startDateISOString),
                        endDateLocaleString: this.parseDate(endDateISOString),
                        startTimeLocaleString: this.parseTime(startDateISOString),
                        endTimeLocaleString: this.parseTime(endDateISOString),
                        shortName: this.shortSessionName(session),
                        longName: this.longSessionName(session)
                    })
                }

                race.prettySessions = prettySessions

                return race
            })

            return races
        } catch (e) {
            console.error(e);

            return []
        }
    }

    getNextRaces(allRaces: RaceData[]): RaceData[] {
        let nextRaces = allRaces.filter((race: RaceData): boolean => {
            const lastSessionDate: string | undefined = Object.values(race.sessions).at(-1);
            const lastSessionTimestamp: number = lastSessionDate ? new Date(lastSessionDate).getTime() : 0;

            const currentTimestamp: number = new Date().getTime();
            return lastSessionTimestamp > currentTimestamp
        })

        if (nextRaces.length > 0) {
            return nextRaces
        } else {
            let lastRace = allRaces.at(-1)

            return lastRace ? [lastRace] : [{} as RaceData]
        }
    }

    shortSessionName = (sessionName: string) => {
        switch (sessionName) {
            case "fp1":
                return "FP1"
            case "fp2":
                return "FP2"
            case "fp3":
                return "FP3"
            case "practice":
                return "P"
            case "qualifying":
                return "Q"
            case "qualifying1":
                return "Q1"
            case "qualifying2":
                return "Q2"
            case "sprintQualifying":
                return "SQ"
            case "sprint":
                return "Sprint"
            case "gp":
                return "Race"
            case "feature":
                return "Feature"
            case "race1":
                return "Race 1"
            case "race2":
                return "Race 2"
            case "race3":
                return "Race 3"
            default:
                return "?"
        }
    }

    longSessionName = (sessionName: string) => {
        switch (sessionName) {
            case "fp1":
                return "Free Practice 1"
            case "fp2":
                return "Free Practice 2"
            case "fp3":
                return "Free Practice 3"
            case "practice":
                return "Practice"
            case "qualifying":
                return "Qualifying"
            case "qualifying1":
                return "1st Qualifying"
            case "qualifying2":
                return "2nd Qualifying"
            case "sprintQualifying":
                return "Sprint Qualifying"
            case "sprint":
                return "Sprint"
            case "gp":
                return "Race"
            case "feature":
                return "Feature"
            case "race1":
                return "1st Race"
            case "race2":
                return "2nd Race"
            case "race3":
                return "3rd Race"
            default:
                return "Undefined Session"
        }
    }

    parseDate = (date: string) => {
        return new Date(date).toLocaleString(undefined, {
            day: '2-digit',
            month: '2-digit',
            weekday: 'short'
        })
    }

    parseTime = (date: string) => {
        return new Date(date).toLocaleString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        })
    }
}