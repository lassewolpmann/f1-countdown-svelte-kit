<script lang="ts">
    // Component imports
    import TimerElement from "$lib/components/Timer/TimerElement/TimerElement.svelte";

    // Store imports
    import { currentSessionIndex } from "$lib/components/SessionSelection/currentSessionIndex";

    // Class imports
    import { Timer } from "$lib/components/Timer/Timer";

    // Function imports
    import { onDestroy } from "svelte";

    export let nextEventSessions: { [key: string]: string };

    let timer = new Timer(nextEventSessions, $currentSessionIndex);

    timer.timerInterval = setInterval(() => {
        timer.delta = timer.calculateDelta();
    }, 1000)

    // Create a new timer object when either the sessions or session index update
    $: timer = new Timer(nextEventSessions, $currentSessionIndex);

    onDestroy(() => {
        clearInterval(timer.timerInterval);
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
        margin: 30px 0;
    }

    .timer-elements {
        flex-direction: row;
        gap: 50px;
    }

    @media only screen and (max-width: 768px) {
        .timer-elements {
            gap: 25px;
        }
    }
</style>


<div class="timer">
    <div class="timer-elements" data-nosnippet>
        <TimerElement timeValue={timer.deltaDays} timeValuePct={timer.deltaDaysPct} timeUnit="days" strokeColor="rgb(234, 53, 19)"/>
        <TimerElement timeValue={timer.deltaHours} timeValuePct={timer.deltaHoursPct} timeUnit="hours" strokeColor="rgb(244, 200, 68)"/>
        <TimerElement timeValue={timer.deltaMinutes} timeValuePct={timer.deltaMinutesPct} timeUnit="minutes" strokeColor="rgb(232, 232, 228)"/>
        <TimerElement timeValue={timer.deltaSeconds} timeValuePct={timer.deltaSecondsPct} timeUnit="seconds" strokeColor="rgb(57, 97, 164)"/>
    </div>
</div>
