<script>
    import ForecastElement from "$lib/components/Weather/ForecastElement.svelte";
    import { findCurrentForecast } from "$lib/functions/WeatherForecast.ts";
    import { beforeUpdate } from "svelte";

    export let nextEventSessions, currentSessionIndex, weatherForecast;
    let forecastElementsList, accuracy, currentForecastIndex, nextEventSessionDates, sessionDate, sessionTimestamp;
    let filteredForecast;

    const range = 2;

    beforeUpdate(() => {
        filteredForecast = []

        nextEventSessionDates = Object.values(nextEventSessions);
        sessionDate = nextEventSessionDates[currentSessionIndex];
        sessionTimestamp = new Date(sessionDate).getTime();

        accuracy  = weatherForecast.length === 96 ? 'hourly': 'daily';

        currentForecastIndex = findCurrentForecast(sessionTimestamp, weatherForecast, accuracy);

        for (let i = currentForecastIndex - range; i <= currentForecastIndex + range; i++) {
            if (i < 0) {
                filteredForecast.push(undefined);
            } else {
                filteredForecast.push(weatherForecast.at(i))
            }
        }
    })
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
    {#if filteredForecast}
        {#each filteredForecast as forecast}
            <ForecastElement forecast={forecast} accuracy={accuracy} />
        {/each}
    {:else}
        <h2>No forecast</h2>
    {/if}
    <div class="current-forecast-indicator"></div>
</div>
