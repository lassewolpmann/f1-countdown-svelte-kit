<script>
    export let nextEvent;
    export let nextEventSessionNames;

    const sessionNames = nextEventSessionNames.join(', ')

    const parseName = (name) => {
        if (!name.includes("Grand Prix")) {
            return name + " Grand Prix"
        } else {
            return name
        }
    }

    const parseDate = (timestamp) => {
        const d = new Date(timestamp);

        return d.toDateString() + ', ' + d.toLocaleTimeString()
    }

    let eventName = parseName(nextEvent['name'])
</script>

<style>
    .race-title {
        text-align: center;
        border-bottom: var(--border);
        padding: 20px 50px;
    }

    .event-name {
        font-size: 3rem;
        font-weight: bold;
    }
</style>

<svelte:head>
    <meta name="description" content="Countdown to the {new Date().getFullYear()} Formula 1 {eventName} {sessionNames}">
</svelte:head>

<div class="race-title" data-nosnippet>
    <span class="event-name">{eventName}</span>
</div>