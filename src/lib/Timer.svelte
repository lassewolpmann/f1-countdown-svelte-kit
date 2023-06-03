<script>
    import TimerElement from "$lib/TimerElement.svelte";
    import SessionSelection from "$lib/SessionSelection.svelte";
    import RaceTitle from "$lib/RaceTitle.svelte";

    import { calculateDelta } from "$lib/functions/calculateDelta.ts";
    import { deltaToDays, deltaToHours, deltaToMinutes, deltaToSeconds, daysToPercent, hoursToPercent, minutesToPercent, secondsToPercent } from "$lib/functions/deltaToTimeConversion.ts";

    export let currentSeriesData;

    let nextEvents, nextEvent, nextEventSessions;
    let delta;
    let currentSessionIndex = 0;
    let deltaCounter;

    $: {
        nextEvents = currentSeriesData['nextEvents'];
        nextEvent = nextEvents[0];
        nextEventSessions = nextEvent['sessions'];
    }

    $: {
        clearInterval(deltaCounter);
        delta = calculateDelta(nextEventSessions, currentSessionIndex);
        deltaCounter = setInterval(() => {
            if (delta > 0) {
                delta -= 1;
            }
        }, 1000);
    }
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
        margin: 20px 0;
    }

    .timer-elements {
        flex-direction: row;
        gap: 50px;
        margin: 20px;
    }
</style>

<div class="timer">
    <RaceTitle
            nextEvents={nextEvents}
    />

    <SessionSelection
            nextEventSessions={nextEventSessions}
            bind:currentSessionIndex={currentSessionIndex}
    />

    <div class="timer-elements" data-nosnippet>
        <TimerElement timeValue={deltaToDays(delta)} timeValuePct={daysToPercent(delta)} timeUnit="days" strokeColor="rgb(234, 53, 19)"/>
        <TimerElement timeValue={deltaToHours(delta)} timeValuePct={hoursToPercent(delta)} timeUnit="hours" strokeColor="rgb(244, 200, 68)"/>
        <TimerElement timeValue={deltaToMinutes(delta)} timeValuePct={minutesToPercent(delta)} timeUnit="minutes" strokeColor="rgb(232, 232, 228)"/>
        <TimerElement timeValue={deltaToSeconds(delta)} timeValuePct={secondsToPercent(delta)} timeUnit="seconds" strokeColor="rgb(57, 97, 164)"/>
    </div>
</div>