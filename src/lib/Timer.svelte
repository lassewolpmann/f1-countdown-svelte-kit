<script>
    import {onMount} from "svelte";
    import SessionDate from "$lib/SessionDate.svelte";
    import TimerElement from "$lib/TimerElement.svelte";
    import SessionButton from "$lib/SessionButton.svelte";

    export let currentSession;
    export let nextEventSessions;

    let days, hours, minutes, seconds
    let daysDeg, hoursDeg, minutesDeg, secondsDeg
    let nextSessionTimestamp
    let delta;

    function calculateDelta() {
        const currentSessionIndex = nextEventSessions.findIndex((index) => index.name === currentSession)
        nextSessionTimestamp = Date.parse(nextEventSessions[currentSessionIndex]['date'] + ' ' + nextEventSessions[currentSessionIndex]['time'])

        delta = Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000)

        if (Math.floor((nextSessionTimestamp - new Date().getTime()) / 1000) <= 0) {
            delta = 0
        }

        days = Math.floor(delta / 86400);
        hours = Math.floor(delta % 86400 / 3600);
        minutes = Math.floor(delta % 86400 % 3600 / 60);
        seconds = Math.floor(delta % 86400 % 3600 % 60);

        daysDeg = ((delta / 86400) / 7) * 360;
        hoursDeg = ((delta % 86400 / 3600) / 24) * 360;
        minutesDeg = ((delta % 86400 % 3600 / 60) / 60) * 360;
        secondsDeg = ((delta % 86400 % 3600 % 60) / 60) * 360;
    }

    onMount(() => {
        calculateDelta()    // initial calculation to not show "undefined"

        setInterval(() => {
            calculateDelta()
            delta -= 1
        }, 1000);
    })
</script>

<style>
    .timer-elements {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .session-selection {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
</style>

<div class="timer-elements">
    <TimerElement timeValue={days} timeValueDeg={daysDeg} timeUnit="days" borderColor="white"/>
    <TimerElement timeValue={hours} timeValueDeg={hoursDeg} timeUnit="hours" borderColor="yellow"/>
    <TimerElement timeValue={minutes} timeValueDeg={minutesDeg} timeUnit="minutes" borderColor="red"/>
    <TimerElement timeValue={seconds} timeValueDeg={secondsDeg} timeUnit="seconds" borderColor="blue"/>
</div>

<div class="session-selection">
    {#each nextEventSessions as session}
        <span on:click={() => {
            currentSession = session.name
            calculateDelta()
        }}>
            <SessionButton
                session={session}
                currentSession={currentSession}
            />
        </span>
    {/each}
</div>

<SessionDate timestamp={nextSessionTimestamp}/>