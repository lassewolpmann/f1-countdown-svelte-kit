<script>
    import Timer from "$lib/Timer.svelte";
    import UpcomingEventList from "$lib/UpcomingEventList.svelte";
    import SeriesSelection from "$lib/SeriesSelection.svelte";

    export let data;
    let currentSeries = 'F1';

    let currentSession, currentEventSessions;
    $: {
        currentEventSessions = data[currentSeries].nextEventSessions;
        if (currentEventSessions.length !== 0) {
            currentSession = getNextSession(currentEventSessions);
        }
    }

    const getNextSession = (sessions) => {
        const timestamp = new Date().getTime();

        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i]['shortCode'] !== 'Q1' && sessions[i]['shortCode'] !== 'Q2' && sessions[i]['shortCode'] !== 'Q3') {
                if (sessions[i]['startTimeUtc'] * 1000 > timestamp) {
                    // return first session UUID that is in the future
                    // this makes the default active button the next session instead of always defaulting to the race
                    return sessions[i]['uuid']
                }
            }
        }
    }
</script>

<SeriesSelection
        bind:currentSeries
        data={data}
/>
<Timer
        nextEvent={data[currentSeries].nextEvent}
        lastEvent={data[currentSeries].lastEvent}
        nextEventSessions={data[currentSeries].nextEventSessions}
        lastEventSessions={data[currentSeries].lastEventSessions}
        currentSession={currentSession}
/>
<UpcomingEventList nextEvents={data[currentSeries].nextEvents} />
