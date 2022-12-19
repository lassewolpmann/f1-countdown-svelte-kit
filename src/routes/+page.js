/** @type {import('./$types').PageLoad} */
export async function load({fetch}) {
    let data = {
        F1: {
            uuid: 'a33f8b4a-2b22-41ce-8e7d-0aea08f0e176'
        },
        F2: {
            uuid: 'a217f31e-70a6-40d1-9848-6aa2239bfb01'
        },
        F3: {
            uuid: '08ad7230-eb99-43e3-b158-405b49e994c6'
        }
    }

    for (let i = 0; i < Object.keys(data).length; i++) {
        const series = Object.keys(data)[i];
        const allEvents = await getAllEvents({fetch}, data[series]['uuid']);
        const nextEvents = getNextEvents(allEvents);
        const nextEvent = nextEvents[0];
        const lastEvent = getLastEvent(allEvents, nextEvents);
        const nextEventSessions = nextEvent['sessions'];
        const lastEventSessions = lastEvent['sessions'];

        data[series] = {
            allEvents: allEvents,
            nextEvents: nextEvents,
            nextEvent: nextEvent,
            lastEvent: lastEvent,
            nextEventSessions: nextEventSessions,
            lastEventSessions: lastEventSessions
        }
    }

    return {
        F1: data.F1,
        F2: data.F2,
        F3: data.F3
    }
}

async function getAllEvents({fetch}, uuid) {
    const apiUrl = 'https://api.motorsportstats.com/widgets/1.0.0';

    const seasonListURL = apiUrl + '/series/' + uuid + '/seasons';
    const seasonListResponse = await fetch(seasonListURL, {
        method: 'GET',
        headers: {
            Accept: 'application/json, text/plain, */*',
            Origin: 'https://widgets.motorsportstats.com',
            Referer: 'https://widgets.motorsportstats.com/',
            Host: 'api.motorsportstats.com',
            'x-parent-referer': 'https://motorsportstats.com/'
        }
    }).catch(console.error)

    const seasonListData = await seasonListResponse.json();
    let seasonUUID;

    const currentYear = new Date().getFullYear();

    for (let i = 0; i < seasonListData.length; i++) {
        if (seasonListData[i]['year'] === currentYear) {
            seasonUUID = seasonListData[i]['uuid']
        }
    }

    const seasonScheduleURL = apiUrl + '/seasons/' + seasonUUID + '/calendar';
    const seasonScheduleResponse = await fetch(seasonScheduleURL, {
        method: 'GET',
        headers: {
            Accept: 'application/json, text/plain, */*',
            Origin: 'https://widgets.motorsportstats.com',
            Referer: 'https://widgets.motorsportstats.com/',
            Host: 'api.motorsportstats.com',
            'x-parent-referer': 'https://motorsportstats.com/'
        }
    }).catch(console.error)

    const seasonScheduleData = await seasonScheduleResponse.json()

    return seasonScheduleData['events']
}

function getNextEvents(allEvents) {
    const timestamp = new Date().getTime();
    // const timestamp = new Date('2022-01-01 15:00:00Z').getTime();

    let nextEvents = allEvents.filter((event) => {
        const sessions = event['sessions']

        if (sessions.length !== 0) {
            const race = sessions[sessions.length - 1]
            const raceEndTimeUtc = race['endTimeUtc'] * 1000
            return raceEndTimeUtc > timestamp
        }
    })

    if (nextEvents.length === 0) {
        nextEvents = [allEvents[allEvents.length - 1]]
    }

    return nextEvents
}


function getLastEvent(allEvents, nextEvents) {
    if (allEvents.length === nextEvents.length) {
        return allEvents[0]
    } else {
        return allEvents[allEvents.length - nextEvents.length - 1]
    }
}
