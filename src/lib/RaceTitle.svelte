<script>
    export let data;
    export let nextEventSessions;

    const sessionNameList = nextEventSessions.map(session => session['shortCode'])
    const sessionNames = sessionNameList.join(', ')

    const parseDate = (timestamp) => {
        const d = new Date(timestamp);

        return d.toDateString() + ', ' + d.toLocaleTimeString()
    }
</script>

<style>
    .race-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
        z-index: 1;
    }

    .race-name {
        font-weight: 600;
        font-size: 2.5rem;
        text-align: center;
    }

    .circuit-name {
        color: gray;
        font-size: 1.3rem;
        text-align: center;
    }
</style>

<svelte:head>
    <meta name="description" content="Countdown to the {new Date().getFullYear()} Formula 1 {data['name']} {sessionNames} at {data['venue']['name']}">
</svelte:head>

<div class="race-title" data-nosnippet>
    <span class="race-name">{data['name']}</span>
    <span class="circuit-name">{data['venue']['name']}</span>
    <!-- <span>{parseDate(data['startTimeUtc'] * 1000)} - {parseDate(data['endTimeUtc'] * 1000)}</span> -->
</div>