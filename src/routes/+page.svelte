<script>
    import Timer from "$lib/Timer.svelte";
    import UpcomingEventList from "$lib/UpcomingEventList.svelte";
    import SeriesSelection from "$lib/SeriesSelection.svelte";

    export let data;
    let currentSeries = 'F1';
    $: currentSession = data[currentSeries].nextEventSessions[data[currentSeries].nextEventSessions.length - 1]['uuid']
</script>

<SeriesSelection
        bind:currentSeries
/>
<Timer
        nextEvent={data[currentSeries].nextEvent}
        nextEventSessions={data[currentSeries].nextEventSessions}
        lastEventSessions={data[currentSeries].lastEventSessions}
        currentSession={currentSession}
/>
<UpcomingEventList nextEvents={data[currentSeries].nextEvents} />
