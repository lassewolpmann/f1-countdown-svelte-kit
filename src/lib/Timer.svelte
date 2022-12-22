<script>
    import SessionDate from "$lib/SessionDate.svelte";
    import TimerElement from "$lib/TimerElement.svelte";
    import SessionSelection from "$lib/SessionSelection.svelte";
    import RaceTitle from "$lib/RaceTitle.svelte";

    export let nextEvent;
    export let nextEventSessions;
    export let lastEventSessions;
    export let currentSession;

    let delta, currentTrackMap, currentTrackMapEl;

    $: {
        currentTrackMap = nextEvent['venue']['picture']
        if (currentTrackMap !== null && currentTrackMapEl !== undefined) {
            currentTrackMapEl.style.display = 'block';
        }
    }

    $: currentSessionIndex = nextEventSessions.findIndex(session => session['uuid'] === currentSession);
    $: nextSessionTimestamp = nextEventSessions[currentSessionIndex]['startTimeUtc'] * 1000;
    $: lastSessionTimestamp = lastEventSessions[currentSessionIndex]['startTimeUtc'] * 1000;

    $: delta = calculateDelta(currentSessionIndex, nextSessionTimestamp);
    $: daysDelta = calculateDaysDelta(currentSessionIndex, nextSessionTimestamp, lastSessionTimestamp);

    $: days = Math.floor(delta / 86400);
    $: hours = Math.floor(delta % 86400 / 3600);
    $: minutes = Math.floor(delta % 86400 % 3600 / 60);
    $: seconds = Math.floor(delta % 86400 % 3600 % 60);

    $: daysPct = (delta / 86400) / daysDelta;
    $: hoursPct = (delta % 86400 / 3600) / 24;
    $: minutesPct = (delta % 86400 % 3600 / 60) / 60;
    $: secondsPct = (delta % 86400 % 3600 % 60) / 60;

    function calculateDelta(currentSessionIndex, nextSessionTimestamp) {
        let deltaValue = Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000);

        if (Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000) <= 0) {
            deltaValue = 0
        }

        return deltaValue
    }

    function calculateDaysDelta(currentSessionIndex, nextSessionTimestamp, lastSessionTimestamp) {
        const deltaBetweenRaces = Math.floor((nextSessionTimestamp - lastSessionTimestamp) / 1000)

        return Math.floor(deltaBetweenRaces / 86400)
    }

    setInterval(() => {
        if (delta > 0) {
            delta -= 1
        }
    }, 1000);
</script>

<style>
    .timer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 15px;
        border-top: 2px solid rgba(36, 36, 36);
        border-bottom: 2px solid rgba(36, 36, 36);
        position: relative;
    }

    .timer-elements {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin: 20px 0;
    }

    .track-map {
        height: 100%;
        max-width: 100vw;
        position: absolute;
        padding: 10px;
        opacity: 0.7;
        display: none;
    }
</style>

<div class="timer">
    <img class="track-map" src="{currentTrackMap}" alt="Track Map" bind:this={currentTrackMapEl}>
    <RaceTitle
            data={nextEvent}
            nextEventSessions={nextEventSessions}
    />

    <SessionSelection
            nextEventSessions={nextEventSessions}
            bind:currentSession={currentSession}
    />

    <div class="timer-elements" data-nosnippet>
        <TimerElement timeValue={days} timeValuePct={daysPct} timeUnit="days" strokeColor="rgb(234, 53, 19)"/>
        <TimerElement timeValue={hours} timeValuePct={hoursPct} timeUnit="hours" strokeColor="rgb(244, 200, 68)"/>
        <TimerElement timeValue={minutes} timeValuePct={minutesPct} timeUnit="minutes" strokeColor="rgb(232, 232, 228)"/>
        <TimerElement timeValue={seconds} timeValuePct={secondsPct} timeUnit="seconds" strokeColor="rgb(57, 97, 164)"/>
    </div>

    <SessionDate timestamp={nextSessionTimestamp}/>
</div>