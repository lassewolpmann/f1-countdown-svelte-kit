<script>
    import Timer from "$lib/Timer.svelte";
    import RaceTitle from "$lib/RaceTitle.svelte";
    import UpcomingEventList from "$lib/UpcomingEventList.svelte";

    export let data;
    let currentSession = 'Race'
</script>

<RaceTitle
        data={data.nextEvent}
        nextEventSessions={data.nextEventSessions}
/>
<Timer
        currentSession={currentSession}
        nextEventSessions={data.nextEventSessions}
        lastEventSessions={data.lastEventSessions}
/>
<UpcomingEventList nextEvents={data.nextEvents} />
