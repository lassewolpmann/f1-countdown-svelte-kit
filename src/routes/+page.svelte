<script lang="ts">
    import Footer from "../lib/Footer.svelte";
    import Timer from "../lib/Timer.svelte";
    import UpcomingEventList from "../lib/UpcomingEventList.svelte";

    export let data;

    const getCurrentSessionIndex = (sessions) => {
        const sessionNames = Object.keys(sessions);
        const timestamp = new Date().getTime();

        let currentSessionName;

        // Set current session name to last entry as default
        currentSessionName = sessionNames[sessionNames.length - 1]

        for (let i = 0; i < sessionNames.length; i++) {
            const sessionTimestamp = new Date(sessions[sessionNames[i]]).getTime();

            if (sessionTimestamp > timestamp) {
                currentSessionName = sessionNames[i]
                break;
            }
        }

        return sessionNames.indexOf(currentSessionName);
    }

    let currentSessionIndex = getCurrentSessionIndex(data['nextEventSessions']);
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
            nextEvent={data['nextEvent']}
            previousEvent={data['previousEvent']}
            nextEventSessions={data['nextEventSessions']}
            previousEventSessions={data['previousEventSessions']}
            currentSessionIndex={currentSessionIndex}
    />

    <UpcomingEventList nextEvents={data['nextEvents']} />
</main>
<footer>
    <Footer />
</footer>
