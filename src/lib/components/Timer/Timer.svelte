<script>
    import TimerElement from "$lib/components/Timer/TimerElement.svelte";

    import { calculateDelta, deltaToDays, deltaToHours, deltaToMinutes, deltaToSeconds, daysToPercent, hoursToPercent, minutesToPercent, secondsToPercent } from "$lib/functions/Timer.ts";
    import { beforeUpdate, onDestroy } from "svelte";

    export let nextEventSessions, currentSessionIndex;

    let delta, deltaCounter;

    beforeUpdate(() => {
        clearInterval(deltaCounter);
        delta = calculateDelta(nextEventSessions, currentSessionIndex);
        deltaCounter = setInterval(() => {
            delta = calculateDelta(nextEventSessions, currentSessionIndex);
        }, 1000);
    })

    onDestroy(() => {
        clearInterval(deltaCounter);
    })
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
        width: 100%;
        margin: 20px 0;
        position: relative;
    }

    .timer-elements {
        flex-direction: row;
        gap: 50px;
        margin: 20px;
    }

    @media only screen and (max-width: 768px) {
        .timer-elements {
            gap: 25px;
        }
    }
</style>


<div class="timer">
    <div class="timer-elements" data-nosnippet>
        <TimerElement timeValue={deltaToDays(delta)} timeValuePct={daysToPercent(delta)} timeUnit="days" strokeColor="rgb(234, 53, 19)"/>
        <TimerElement timeValue={deltaToHours(delta)} timeValuePct={hoursToPercent(delta)} timeUnit="hours" strokeColor="rgb(244, 200, 68)"/>
        <TimerElement timeValue={deltaToMinutes(delta)} timeValuePct={minutesToPercent(delta)} timeUnit="minutes" strokeColor="rgb(232, 232, 228)"/>
        <TimerElement timeValue={deltaToSeconds(delta)} timeValuePct={secondsToPercent(delta)} timeUnit="seconds" strokeColor="rgb(57, 97, 164)"/>
    </div>
</div>
