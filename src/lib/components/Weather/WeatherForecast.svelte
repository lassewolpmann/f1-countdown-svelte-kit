<script>
    import ForecastElement from "$lib/components/Weather/ForecastElement.svelte";
    import { currentSessionIndex } from "$lib/stores/currentSessionIndex.ts";

    export let weatherForecast;

    let accuracy;
    $: if (weatherForecast) accuracy = weatherForecast[$currentSessionIndex].length === 96 ? 'hourly': 'daily';
</script>
<style>
    .widget {
        padding: 15px;
        margin: 15px 0;

        max-width: 100vw;
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
        background-image: linear-gradient(90deg, #111 15%, transparent 25%, transparent 75%, #111 85%);
    }

    .current-forecast-indicator {
        position: absolute;
        width: 85px;
        height: 95%;

        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
    }

    @media only screen and (max-width: 480px) {
        /* Remove gradient background on mobile devices to show as much forecast as possible */
        .widget:after {
            background: none;
        }
    }

    @media only screen and (max-width: 768px) {
        .current-forecast-indicator {
            width: 75px;
        }
    }
</style>
<div class="widget">
    {#if weatherForecast}
        {#if weatherForecast[$currentSessionIndex][4]['dt'] * 1000 > new Date().getTime()}
            {#each weatherForecast[$currentSessionIndex] as forecast}
                <ForecastElement {forecast} {accuracy} />
            {/each}
            <div class="current-forecast-indicator"></div>
        {:else}
            <h2>No forecast</h2>
        {/if}
    {:else}
        <h2>No forecast</h2>
    {/if}
</div>
