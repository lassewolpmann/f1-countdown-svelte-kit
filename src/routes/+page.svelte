<script>
    import Timer from "$lib/Timer.svelte";
    import UpcomingEventList from "$lib/UpcomingEventList.svelte";
    import SeriesSelection from "$lib/SeriesSelection.svelte";

    export let data;
    let currentSeries = 'F1';

    let currentSession, currentEventSessions;
    $: {
        currentEventSessions = data[currentSeries].nextEventSessions;
        currentSession = currentEventSessions[currentEventSessions.length - 1]['uuid'];
    }
</script>

<SeriesSelection
        bind:currentSeries
        data={data}
/>
<Timer
        nextEvent={data[currentSeries].nextEvent}
        nextEventSessions={data[currentSeries].nextEventSessions}
        lastEventSessions={data[currentSeries].lastEventSessions}
        currentSession={currentSession}
/>
<UpcomingEventList nextEvents={data[currentSeries].nextEvents} />
