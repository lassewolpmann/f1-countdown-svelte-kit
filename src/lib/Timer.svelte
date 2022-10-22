<script>
    import {onMount} from "svelte";
    import SessionDate from "$lib/SessionDate.svelte";
    import TimerElement from "$lib/TimerElement.svelte";
    import SessionButton from "$lib/SessionButton.svelte";

    export let currentSession;
    export let nextEventSessions;
    export let lastEventSessions;

    let days, hours, minutes, seconds;
    let daysPct, hoursPct, minutesPct, secondsPct;
    let nextSessionTimestamp, lastSessionTimestamp;
    let delta;
    let daysDelta;

    function calculateDaysDelta(nextEventSessions, lastEventSessions) {
        const currentSessionIndex = nextEventSessions.findIndex((index) => index.name === currentSession)

        nextSessionTimestamp = Date.parse(nextEventSessions[currentSessionIndex]['date'] + ' ' + nextEventSessions[currentSessionIndex]['time'])
        lastSessionTimestamp = Date.parse(lastEventSessions[currentSessionIndex]['date'] + ' ' + lastEventSessions[currentSessionIndex]['time'])

        delta = Math.floor((nextSessionTimestamp - lastSessionTimestamp) / 1000)

        daysDelta = Math.floor(delta / 86400)
    }

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

        // set daysPct to 1, if the calculated value is >= 1
        daysPct = (delta / 86400) / daysDelta;
        hoursPct = (delta % 86400 / 3600) / 24;
        minutesPct = (delta % 86400 % 3600 / 60) / 60;
        secondsPct = (delta % 86400 % 3600 % 60) / 60;
    }

    onMount(() => {
        calculateDaysDelta(nextEventSessions, lastEventSessions)

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
        margin-top: 30px;
    }
</style>

<div class="timer-elements">
    <TimerElement timeValue={days} timeValuePct={daysPct} timeUnit="days" strokeColor="white"/>
    <TimerElement timeValue={hours} timeValuePct={hoursPct} timeUnit="hours" strokeColor="yellow"/>
    <TimerElement timeValue={minutes} timeValuePct={minutesPct} timeUnit="minutes" strokeColor="red"/>
    <TimerElement timeValue={seconds} timeValuePct={secondsPct} timeUnit="seconds" strokeColor="blue"/>
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