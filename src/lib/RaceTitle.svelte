<script>
    export let nextEvents;
    export let currentEventIndex;

    const parseName = (name) => {
        if (!name.includes("Grand Prix")) {
            return name + " Grand Prix"
        } else {
            return name
        }
    }

    let eventName, sessionNames;
    $: sessionNames = Object.keys(nextEvents[currentEventIndex]['sessions']).join(', ');
    $: eventName = parseName(nextEvents[currentEventIndex]['name']);
</script>

<style>
    .race-title {
        text-align: center;
        border-bottom: var(--border);
        padding: 20px 50px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .event-name {
        font-size: 3rem;
        font-weight: bold;
        margin-inline: 15px;
    }

    button {
        font-family: inherit;
        font-weight: bold;
        font-size: 1.2rem;
        color: var(--secondary-text-color);
        cursor: pointer;
        background: var(--button-inactive-color);
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        transition: background 0.2s ease;

        z-index: 1;
    }

    button:hover {
        background: var(--button-hover-color);
        color: var(--main-text-color);
    }
</style>

<svelte:head>
    <meta name="description" content="Countdown to the {new Date().getFullYear()} Formula 1 {eventName} {sessionNames}">
</svelte:head>

<div class="race-title" data-nosnippet>
    <span class="event-name">{eventName}</span>
</div>