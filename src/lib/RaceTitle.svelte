<script>
    export let data;
    export let nextEventSessions;

    const sessionNameList = nextEventSessions.map(session => {
        if (session['name'] === 'FirstPractice') {
            return 'FP1'
        } else if (session['name'] === 'SecondPractice') {
            return 'FP2'
        } else if (session['name'] === 'ThirdPractice') {
            return 'FP3'
        } else {
            return session['name']
        }
    })

    const sessionNames = sessionNameList.join(', ')
</script>

<style>
    .race-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
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