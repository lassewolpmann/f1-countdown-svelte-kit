<script>
    import SessionDate from "$lib/SessionDate.svelte";
    import TimerElement from "$lib/TimerElement.svelte";
    import SessionSelection from "$lib/SessionSelection.svelte";
    import RaceTitle from "$lib/RaceTitle.svelte";

    export let nextEvent;
    export let lastEvent;
    export let nextEventSessions;
    export let lastEventSessions;
    export let currentSession;

    let currentSessionIndex;
    $: currentSessionIndex = nextEventSessions.findIndex(session => session['uuid'] === currentSession);

    let nextSessionTimestamp, lastSessionTimestamp;
    let delta, daysDelta;
    $: {
        if (nextEventSessions.length === 0) {
            nextSessionTimestamp = nextEvent['startTimeUtc'] * 1000;
            lastSessionTimestamp = lastEventSessions[lastEventSessions.length - 1]['startTimeUtc'] * 1000;
        } else if (lastEventSessions.length === 0) {
            nextSessionTimestamp = nextEventSessions[currentSessionIndex]['startTimeUtc'] * 1000;
            lastSessionTimestamp = lastEvent['startTimeUtc'] * 1000;
        } else {
            nextSessionTimestamp = nextEventSessions[currentSessionIndex]['startTimeUtc'] * 1000;
            lastSessionTimestamp = lastEventSessions[currentSessionIndex]['startTimeUtc'] * 1000;
        }

        delta = calculateDelta(currentSessionIndex, nextSessionTimestamp);
        daysDelta = calculateDaysDelta(currentSessionIndex, nextSessionTimestamp, lastSessionTimestamp);
    }

    let days, hours, minutes, seconds, daysPct, hoursPct, minutesPct, secondsPct;
    $: {
        days = Math.floor(delta / 86400);
        hours = Math.floor(delta % 86400 / 3600);
        minutes = Math.floor(delta % 86400 % 3600 / 60);
        seconds = Math.floor(delta % 86400 % 3600 % 60);
        daysPct = (delta / 86400) / daysDelta;
        hoursPct = (delta % 86400 / 3600) / 24;
        minutesPct = (delta % 86400 % 3600 / 60) / 60;
        secondsPct = (delta % 86400 % 3600 % 60) / 60;
    }

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
</style>

<div class="timer">
    <RaceTitle
            data={nextEvent}
            nextEventSessions={nextEventSessions}
    />

    <SessionSelection
            nextEventSessions={nextEventSessions}
            bind:currentSession={currentSession}
    />

    {#if nextEvent['status'] !== ''}
        <h1>{nextEvent['status']}</h1>
    {:else}
        {#if nextSessionTimestamp !== 0}
            <div class="timer-elements" data-nosnippet>
                <TimerElement timeValue={days} timeValuePct={daysPct} timeUnit="days" strokeColor="rgb(234, 53, 19)"/>
                <TimerElement timeValue={hours} timeValuePct={hoursPct} timeUnit="hours" strokeColor="rgb(244, 200, 68)"/>
                <TimerElement timeValue={minutes} timeValuePct={minutesPct} timeUnit="minutes" strokeColor="rgb(232, 232, 228)"/>
                <TimerElement timeValue={seconds} timeValuePct={secondsPct} timeUnit="seconds" strokeColor="rgb(57, 97, 164)"/>
            </div>

            <SessionDate timestamp={nextSessionTimestamp}/>
        {:else}
            <h1 style="margin: 50px 0">Session data not available.</h1>
        {/if}
    {/if}
</div>