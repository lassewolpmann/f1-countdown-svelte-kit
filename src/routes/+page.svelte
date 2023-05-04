<script>
    import Footer from "$lib/Footer.svelte";
    import Timer from "$lib/Timer.svelte";
    import UpcomingEventList from "$lib/UpcomingEventList.svelte";

    export let data;

    let currentSession, currentEventSessions;
    $: {
        currentEventSessions = data.nextEventSessions;
        if (currentEventSessions.length !== 0) {
            currentSession = getNextSession(currentEventSessions);
        }
    }

    const getNextSession = (sessions) => {
        const timestamp = new Date().getTime();

        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i]['startTimeUtc'] * 1000 > timestamp) {
                // return first session UUID that is in the future
                // this makes the default active button the next session instead of always defaulting to the race
                return sessions[i]['uuid']
            }
        }

        // If no session is in the future, return the last session of current event
        return sessions[sessions.length - 1]['uuid']
    }
</script>
<style>
    main, footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    main {
        flex-direction: column;
    }

    footer {
        border-top: var(--border);
        padding: 20px;
        flex-direction: row;
        gap: 50px;
    }
</style>

<header>

</header>
<main>
    <Timer
            nextEvent={data.nextEvent}
            lastEvent={data.lastEvent}
            nextEventSessions={data.nextEventSessions}
            lastEventSessions={data.lastEventSessions}
            currentSession={currentSession}
    />
    <UpcomingEventList nextEvents={data.nextEvents} />
</main>
<footer>
    <Footer />
</footer>
