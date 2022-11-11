<script>
    import { onMount } from "svelte";

    export let data;
    export let nextEventSessions;
    let sessionNames;

    onMount(() => {
        sessionNames = '';

        for (let i = 0; i < nextEventSessions.length; i++) {
            let sessionName = nextEventSessions[i]['name'];
            if (sessionName === 'FirstPractice') {
                sessionName = 'FP1'
            } else if (sessionName === 'SecondPractice') {
                sessionName = 'FP2'
            } else if (sessionName === 'ThirdPractice') {
                sessionName = 'FP3'
            }

            if (i === nextEventSessions.length - 2) {
                sessionNames = sessionNames + sessionName + ' ';
            } else if (i === nextEventSessions.length - 1) {
                sessionNames = sessionNames + 'and ' + sessionName
            } else {
                sessionNames = sessionNames + sessionName + ', '
            }
        }
    })
</script>

<style>
    .race-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
    }

    .race-name {
        font-weight: 600;
        font-size: 3rem;
        text-align: center;
    }

    .circuit-name {
        color: gray;
        font-size: 1.5rem;
    }
</style>

<svelte:head>
    <meta name="description" content="Countdown to the {data['season']} Formula 1 {data['raceName']} {sessionNames} at {data['Circuit']['circuitName']}">
</svelte:head>
<div class="race-title" data-nosnippet>
    <span class="race-name">{data['raceName']}</span>
    <span class="circuit-name">{data['Circuit']['circuitName']}</span>
</div>