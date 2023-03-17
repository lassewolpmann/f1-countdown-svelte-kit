/** @type {import('./$types').PageLoad} */

export async function load({fetch}) {
    const allEvents = await getAllEvents({fetch}, 'a33f8b4a-2b22-41ce-8e7d-0aea08f0e176');
    const nextEvents = getNextEvents(allEvents);
    const nextEvent = nextEvents[0];
    const lastEvent = getLastEvent(allEvents, nextEvents);
    let nextEventSessions = nextEvent['sessions'];
    let lastEventSessions = lastEvent['sessions'];

    return {
        allEvents: allEvents,
        nextEvents: nextEvents,
        nextEvent: nextEvent,
        lastEvent: lastEvent,
        nextEventSessions: nextEventSessions,
        lastEventSessions: lastEventSessions
    }
}

async function getAllEvents({fetch}, uuid) {
    const apiUrl = 'https://api.motorsportstats.com/widgets/1.0.0';
    const apiHeaders = {
        Accept: 'application/json, text/plain, */*',
        Origin: 'https://widgets.motorsportstats.com',
        Referer: 'https://widgets.motorsportstats.com',
        Host: 'api.motorsportstats.com',
        'x-parent-referer': 'https://motorsportstats.com'
    };

    // request all seasons
    const seasonListURL = apiUrl + '/series/' + uuid + '/seasons';
    const seasonListResponse = await fetch(seasonListURL, {
        method: 'GET',
        headers: apiHeaders
    }).catch(console.error)

    const seasonListData = await seasonListResponse.json();
    let seasonUUID;

    // get uuid of current season
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < seasonListData.length; i++) {
        if (seasonListData[i]['year'] === currentYear) {
            seasonUUID = seasonListData[i]['uuid']
        }
    }

    // request season info
    const seasonScheduleURL = apiUrl + '/seasons/' + seasonUUID + '/calendar';
    const seasonScheduleResponse = await fetch(seasonScheduleURL, {
        method: 'GET',
        headers: apiHeaders
    }).catch(console.error)

    const seasonScheduleData = await seasonScheduleResponse.json()

    for (let i = 0; i < seasonScheduleData['events'].length; i++) {
        seasonScheduleData['events'][i]['sessions'] = filterSessions(seasonScheduleData['events'][i])
    }

    return seasonScheduleData['events']
}

function getNextEvents(allEvents) {
    const timestamp = new Date().getTime();
    // const timestamp = new Date('2023-04-30 15:00:00Z').getTime();

    let nextEvents = allEvents.filter((event) => {
        const eventEndTimeUtc = event['endTimeUtc'] * 1000
        return eventEndTimeUtc > timestamp
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

const filterSessions = (event) => {
    const sessions = event['sessions'];

    let filteredSessions = sessions.filter((session) => {
        return session['shortCode'] !== 'Q' && session['shortCode'] !== 'Q2' && session['shortCode'] !== 'Q3'
    })

    for (let i = 0; i < filteredSessions.length; i++) {
        if (filteredSessions[i]['shortCode'] === 'Q1') {
            filteredSessions[i]['shortCode'] = 'Q';
            filteredSessions[i]['shortName'] = 'Qualifying';
            filteredSessions[i]['name'] = 'Qualifying';
        }
    }

    return filteredSessions;
}