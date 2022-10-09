/** @type {import('./$types').PageLoad} */
export async function load({fetch}) {
    const allEvents = await getAllEvents({fetch})
    const nextEvents = getNextEvents(allEvents)
    const nextEvent = nextEvents[0]
    const nextEventSessions = getNextEventSessions(nextEvent)

    return {
        allEvents: allEvents,
        nextEvents: nextEvents,
        nextEvent: nextEvent,
        nextEventSessions: nextEventSessions
    }
}

async function getAllEvents({fetch}) {
    const response = await fetch('http://ergast.com/api/f1/' + new Date().getFullYear() + '.json', {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(console.error)
    const data = await response.json()

    return data['MRData']['RaceTable']['Races']
}

function getNextEvents(allEvents) {
    const timestamp = new Date().getTime();

    return allEvents.filter((event) => {
        return new Date(event['date'] + ' ' + event['time']).getTime() > timestamp
    })
}

function getNextEventSessions(nextEvent) {
    const nextEventSessionNames = Object.keys(nextEvent).slice(7)

    let nextEventSessions = []

    for (let i = 0; i < nextEventSessionNames.length; i++) {
        nextEventSessions.push({
            name: nextEventSessionNames[i],
            date: nextEvent[nextEventSessionNames[i]]['date'],
            time: nextEvent[nextEventSessionNames[i]]['time']
        })
    }

    nextEventSessions.push({
        name: 'Race',
        date: nextEvent['date'],
        time: nextEvent['time']
    })

    return nextEventSessions
}