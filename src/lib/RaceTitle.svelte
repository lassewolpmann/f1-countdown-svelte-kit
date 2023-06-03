<script>
    export let nextEvents;

    const parseName = (name) => {
        if (!name.includes("Grand Prix")) {
            return name + " Grand Prix"
        } else {
            return name
        }
    }

    let eventName, sessionNames;
    $: sessionNames = Object.keys(nextEvents[0]['sessions']).join(', ');
    $: eventName = parseName(nextEvents[0]['name']);
</script>

<style>
    .race-title {
        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .event-name {
        font-size: 3rem;
        font-weight: bold;
        margin-inline: 15px;
    }
</style>

<svelte:head>
    <meta name="description" content="Countdown to the {new Date().getFullYear()} Formula 1 {eventName} {sessionNames}">
</svelte:head>

<div class="race-title" data-nosnippet>
    <span class="event-name">{eventName}</span>
</div>