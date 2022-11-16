<script>
    import SessionDate from "$lib/SessionDate.svelte";
    import TimerElement from "$lib/TimerElement.svelte";
    import SessionSelection from "./SessionSelection.svelte";

    export let nextEventSessions;
    export let lastEventSessions;

    let currentSession = 'Race';

    $: currentSessionIndex = nextEventSessions.findIndex((index) => index.name === currentSession);

    $: nextSessionDate = nextEventSessions[currentSessionIndex]['date'];
    $: nextSessionTime = nextEventSessions[currentSessionIndex]['time'];
    $: nextSessionTimestamp = Date.parse(nextSessionDate + ' ' + nextSessionTime);

    $: delta = calculateDelta(currentSessionIndex, nextSessionTimestamp);
    $: daysDelta = calculateDaysDelta(currentSessionIndex, nextSessionTimestamp);

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

    function calculateDaysDelta(currentSessionIndex, nextSessionTimestamp) {
        const lastSessionDate = lastEventSessions[currentSessionIndex]['date'];
        const lastSessionTime = lastEventSessions[currentSessionIndex]['time'];
        const lastSessionTimestamp = Date.parse(lastSessionDate + ' ' + lastSessionTime);

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
    .timer-elements {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin: 20px 0;
    }
</style>

<SessionSelection nextEventSessions={nextEventSessions} bind:currentSession={currentSession} />

<div class="timer-elements" data-nosnippet>
    <TimerElement timeValue={days} timeValuePct={daysPct} timeUnit="days" strokeColor="rgb(234, 53, 19)"/>
    <TimerElement timeValue={hours} timeValuePct={hoursPct} timeUnit="hours" strokeColor="rgb(244, 200, 68)"/>
    <TimerElement timeValue={minutes} timeValuePct={minutesPct} timeUnit="minutes" strokeColor="rgb(232, 232, 228)"/>
    <TimerElement timeValue={seconds} timeValuePct={secondsPct} timeUnit="seconds" strokeColor="rgb(57, 97, 164)"/>
</div>

<SessionDate timestamp={nextSessionTimestamp}/>