<script>
    import ForecastElement from "$lib/components/Weather/ForecastElement.svelte";
    import { findCurrentForecast } from "$lib/functions/WeatherForecast.ts";
    import { beforeUpdate } from "svelte";

    export let nextEventSessions, currentSessionIndex, weatherForecast;
    let forecastElementsList;
    let accuracy, currentForecastIndex, nextEventSessionDates, sessionDate, sessionTimestamp;
    let filteredForecast;

    const range = 4;

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

        width: 100%;

        padding: 15px;
        margin: 15px 0;

        overflow: hidden;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        position: relative;
    }

    .widget:after {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        content: "";
        background-image: linear-gradient(90deg, #111, transparent 40%, transparent 60%, #111);
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
