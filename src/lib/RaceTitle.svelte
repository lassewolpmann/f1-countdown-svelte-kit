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
        text-align: center;
    }

    h1, h2 {
        margin: 5px 0;
    }

    h1 {
        font-size: 2.5rem;
    }

    h2 {
        color: var(--secondary-text-color);
        font-size: 1.3rem;
        font-weight: 400;
    }
</style>

<svelte:head>
    <meta name="description" content="Countdown to the {new Date().getFullYear()} Formula 1 {data['name']} {sessionNames} at {data['venue']['name']}">
</svelte:head>

<div class="race-title" data-nosnippet>
    <h1>{data['name']}</h1>
    <h2>{data['venue']['name']}</h2>
</div>