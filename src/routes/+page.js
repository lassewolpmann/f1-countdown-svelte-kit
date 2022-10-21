/** @type {import('./$types').PageLoad} */
export async function load({fetch}) {
    const allEvents = await getAllEvents({fetch})
    const nextEvents = getNextEvents(allEvents)
    const nextEvent = nextEvents[0]
    const lastEvent = getLastEvent(allEvents, nextEvent)
    const nextEventSessions = getEventSessions(nextEvent)
    const lastEventSession = getEventSessions(lastEvent)

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
    const response = await fetch('https://ergast.com/api/f1/' + new Date().getFullYear() + '.json', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=86400'
        }
    }).catch(console.error)

     const data = await response.json()

     return data['MRData']['RaceTable']['Races']
}

function getNextEvents(allEvents) {
    const timestamp = new Date().getTime();

    let nextEvents = allEvents.filter((event) => {
        return new Date(event['date'] + ' ' + event['time']).getTime() > timestamp
    })

    if (nextEvents.length === 0) {
        nextEvents = [allEvents[allEvents.length - 1]]
    }

    return nextEvents
}

function getEventSessions(eventData) {
    const eventSessionNames = Object.keys(eventData).slice(7)

    let eventSessions = []

    for (let i = 0; i < eventSessionNames.length; i++) {
        eventSessions.push({
            name: eventSessionNames[i],
            date: eventData[eventSessionNames[i]]['date'],
            time: eventData[eventSessionNames[i]]['time']
        })
    }

    eventSessions.push({
        name: 'Race',
        date: eventData['date'],
        time: eventData['time']
    })

    return eventSessions
}

function getLastEvent(allEvents, nextEvent) {
    const nextEventIndex = nextEvent['round'] - 1
    return allEvents[nextEventIndex - 1]
}