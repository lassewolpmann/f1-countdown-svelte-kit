<script lang="ts">
    import Footer from "../lib/Footer.svelte";
    import Timer from "../lib/Timer.svelte";
    import UpcomingEventList from "../lib/UpcomingEventList.svelte";
    import SeriesSelection from "../lib/SeriesSelection.svelte";

    export let data;

    let currentSeries, currentSessionIndex, currentSeriesData;
    let nextEvent, nextEventSessions, previousEventSessions, nextEvents;

    const getCurrentSessionIndex = (sessions) => {
        const sessionNames = Object.keys(sessions);
        const timestamp = new Date().getTime();

        let currentSessionName;

        // Set current session name to last entry as default
        currentSessionName = sessionNames[sessionNames.length - 1]

        // Loop through all sessions and select the one nearest to the current date
        for (let i = 0; i < sessionNames.length; i++) {
            const sessionTimestamp = new Date(sessions[sessionNames[i]]).getTime();

            if (sessionTimestamp > timestamp) {
                currentSessionName = sessionNames[i]
                break;
            }
        }

        return sessionNames.indexOf(currentSessionName);
    }

    currentSeries = data['seriesList'][0];

    $: {
        currentSeriesData = data['seriesData'][currentSeries];
        currentSessionIndex = getCurrentSessionIndex(currentSeriesData['nextEventSessions']);

        nextEvent = currentSeriesData['nextEvent'];
        nextEventSessions = currentSeriesData['nextEventSessions'];
        previousEventSessions = currentSeriesData['previousEventSessions'];
        nextEvents = currentSeriesData['nextEvents'];
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
    <SeriesSelection seriesList={data.seriesList} bind:currentSeries={currentSeries} />
    <Timer
            nextEvent={nextEvent}
            nextEventSessions={nextEventSessions}
            previousEventSessions={previousEventSessions}
            currentSessionIndex={currentSessionIndex}
    />

    <UpcomingEventList nextEvents={nextEvents} />
</main>
<footer>
    <Footer />
</footer>
