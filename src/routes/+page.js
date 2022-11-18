/** @type {import('./$types').PageLoad} */
export async function load({fetch}) {
    const allEvents = await getAllEvents({fetch})
    const nextEvents = getNextEvents(allEvents)
    const nextEvent = nextEvents[0]
    const lastEvent = getLastEvent(allEvents, nextEvents)
    const nextEventSessions = nextEvent['sessions']
    const lastEventSession = lastEvent['sessions']

    return {
        allEvents: allEvents,
        nextEvents: nextEvents,
        nextEvent: nextEvent,
        lastEvent: lastEvent,
        nextEventSessions: nextEventSessions,
        lastEventSessions: lastEventSession
    }
}

async function getAllEvents({fetch}) {
    const apiUrl = 'https://api.motorsportstats.com/widgets/1.0.0'
    const seasonListResponse = await fetch(apiUrl + '/series/a33f8b4a-2b22-41ce-8e7d-0aea08f0e176/seasons?hasStandings=true', {
        method: 'GET',
        headers: {
            Accept: 'application/json, text/plain, */*',
            Origin: 'https://widgets.motorsportstats.com',
            Referer: 'https://widgets.motorsportstats.com/',
            Host: 'api.motorsportstats.com',
            'x-parent-referer': 'https://motorsportstats.com/'
        }
    }).catch(console.error)

    const seasonListData = await seasonListResponse.json()
    let seasonUUID;

    for (let i = 0; i < seasonListData.length; i++) {
        if (seasonListData[i]['year'] === new Date().getFullYear()) {
            seasonUUID = seasonListData[i]['uuid']
        }
    }

    const seasonScheduleResponse = await fetch(apiUrl + '/seasons/' + seasonUUID + '/calendar', {
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
    return allEvents[allEvents.length - nextEvents.length - 1]
}
