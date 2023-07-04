<script>
    import ForecastElement from "$lib/components/Weather/ForecastElement.svelte";
    import { findCurrentForecast } from "$lib/functions/WeatherForecast.ts";

    export let nextEventSessions, currentSessionIndex, weatherForecast;
    let forecastElementsList, accuracy, offset;

    $: {
        const nextEventSessionDates = Object.values(nextEventSessions);
        const sessionDate = nextEventSessionDates[currentSessionIndex];
        const sessionTimestamp = new Date(sessionDate).getTime();

        accuracy  = weatherForecast.length === 96 ? 'hourly': 'daily'

        if (forecastElementsList && weatherForecast) {
            offset = findCurrentForecast(forecastElementsList, sessionTimestamp, weatherForecast, accuracy);
        }
    }
</script>
<style>
    .widget {
        background: var(--button-inactive-color);
        border-radius: 15px;

        width: min(90vw, 500px);

        padding: 15px;
        margin: 15px 0;

        overflow-x: hidden;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        position: relative;
    }

    .current-forecast-indicator {
        position: absolute;
        width: 85px;
        height: 95%;

        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
    }
</style>
<div class="widget" bind:this={forecastElementsList}>
    {#if weatherForecast.length > 0}
        {#each weatherForecast as forecast}
            <ForecastElement forecast={forecast} accuracy={accuracy} offset={offset} />
        {/each}
    {:else}
        <h2>No forecast</h2>
    {/if}
    <div class="current-forecast-indicator"></div>
</div>
