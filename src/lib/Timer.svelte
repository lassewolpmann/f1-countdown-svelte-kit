<script>
    import TimerElement from "$lib/TimerElement.svelte";
    import SessionSelection from "$lib/SessionSelection.svelte";
    import RaceTitle from "$lib/RaceTitle.svelte";

    export let nextEvent;
    export let previousEvent;
    export let nextEventSessions;
    export let previousEventSessions;
    export let currentSessionIndex;

    let nextEventSessionNames = Object.keys(nextEventSessions);
    let previousEventSessionNames = Object.keys(previousEventSessions);

    let nextSessionTime, nextSessionTimestamp, previousSessionTime, previousSessionTimestamp;
    let delta, daysDelta;

    $: {
        nextSessionTime = nextEventSessions[nextEventSessionNames[currentSessionIndex]];
        previousSessionTime = previousEventSessions[previousEventSessionNames[currentSessionIndex]];

        nextSessionTimestamp = new Date(nextSessionTime).getTime();
        previousSessionTimestamp = new Date(previousSessionTime).getTime();

        delta = calculateDelta(nextSessionTimestamp);
        daysDelta = calculateDaysDelta(nextSessionTimestamp, previousSessionTimestamp);
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

    function calculateDelta(nextSessionTimestamp) {
        let deltaValue = Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000);

        if (Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000) <= 0) {
            deltaValue = 0
        }

        return deltaValue
    }

    function calculateDaysDelta(nextSessionTimestamp, previousSessionTimestamp) {
        const deltaBetweenRaces = Math.floor((nextSessionTimestamp - previousSessionTimestamp) / 1000)

        return Math.floor(deltaBetweenRaces / 86400)
    }

    setInterval(() => {
        if (delta > 0) {
            delta -= 1
        }
    }, 1000);
</script>

<style>
    .timer, .timer-elements {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .timer {
        flex-direction: column;
        padding: 30px 0 50px 0;
        border-bottom: var(--border);
    }

    .timer-elements {
        flex-direction: row;
        margin: 30px 0 0 0;
        gap: 50px;
    }
</style>

<div class="timer">
    <RaceTitle
            nextEvent={nextEvent}
            nextEventSessionNames={nextEventSessionNames}
    />

    <SessionSelection
            nextEventSessionNames={nextEventSessionNames}
            bind:currentSessionIndex={currentSessionIndex}
    />

    <div class="timer-elements" data-nosnippet>
        <TimerElement timeValue={days} timeValuePct={daysPct} timeUnit="days" strokeColor="rgb(234, 53, 19)"/>
        <TimerElement timeValue={hours} timeValuePct={hoursPct} timeUnit="hours" strokeColor="rgb(244, 200, 68)"/>
        <TimerElement timeValue={minutes} timeValuePct={minutesPct} timeUnit="minutes" strokeColor="rgb(232, 232, 228)"/>
        <TimerElement timeValue={seconds} timeValuePct={secondsPct} timeUnit="seconds" strokeColor="rgb(57, 97, 164)"/>
    </div>
</div>