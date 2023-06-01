<script>
    import TimerElement from "$lib/TimerElement.svelte";
    import SessionSelection from "$lib/SessionSelection.svelte";
    import RaceTitle from "$lib/RaceTitle.svelte";

    import { calculateDelta } from "$lib/functions/calculateDelta.ts";

    export let currentSeriesData;
    export let currentEventIndex;

    let nextEvents, previousEvent, nextEvent, nextEventSessions, previousEventSessions, deltaValues;
    let currentSessionIndex = 0;
    let deltaCounter;

    $: {
        nextEvents = currentSeriesData['nextEvents'];
        previousEvent = currentSeriesData['previousEvent']

        if (currentEventIndex > nextEvents.length - 1) {
            currentEventIndex = nextEvents.length - 1;
        }

        nextEvent = nextEvents[currentEventIndex];
        nextEventSessions = nextEvent['sessions'];
        previousEventSessions = previousEvent['sessions'];

        deltaValues = calculateDelta(nextEventSessions, previousEventSessions, currentSessionIndex);

        clearInterval(deltaCounter);
        deltaCounter = setInterval(() => {
            if (deltaValues.delta > 0) {
                deltaValues.delta -= 1;
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
            currentEventIndex={currentEventIndex}
    />

    <SessionSelection
            nextEventSessionNames={Object.keys(nextEventSessions)}
            bind:currentSessionIndex={currentSessionIndex}
    />

    <div class="timer-elements" data-nosnippet>
        <TimerElement timeValue={deltaValues.days} timeValuePct={deltaValues.daysPct} timeUnit="days" strokeColor="rgb(234, 53, 19)"/>
        <TimerElement timeValue={deltaValues.hours} timeValuePct={deltaValues.hoursPct} timeUnit="hours" strokeColor="rgb(244, 200, 68)"/>
        <TimerElement timeValue={deltaValues.minutes} timeValuePct={deltaValues.minutesPct} timeUnit="minutes" strokeColor="rgb(232, 232, 228)"/>
        <TimerElement timeValue={deltaValues.seconds} timeValuePct={deltaValues.secondsPct} timeUnit="seconds" strokeColor="rgb(57, 97, 164)"/>
    </div>
</div>