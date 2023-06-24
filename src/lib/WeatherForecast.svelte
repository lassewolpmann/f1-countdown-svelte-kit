<script>
    import { getSessionDateForecast } from "$lib/functions/WeatherForecast.ts";

    export let nextEventSessions;
    export let currentSessionIndex;
    export let weatherForecast;

    let sessionForecast, sessionForecastIconUrl;

    $: {
        const currentSessionName = Object.keys(nextEventSessions).at(currentSessionIndex);
        const currentSessionDate = nextEventSessions[currentSessionName];

        sessionForecast = getSessionDateForecast(weatherForecast, currentSessionDate);

        // Only give weather forecast to sessions that are in the future
        // TODO: Implement Historical Weather API calls
        if (new Date(currentSessionDate).getTime() > new Date().getTime()) {
            const sessionForecastIcon = sessionForecast['weather'][0]['icon'];
            sessionForecastIconUrl = `https://openweathermap.org/img/wn/${sessionForecastIcon}.png`;
        } else {
            sessionForecast = undefined;
        }
    }
</script>
<style>
    .weather {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
<div class="weather">
    {#if sessionForecast}
        <p>{sessionForecast['weather'][0]['description'].toUpperCase()}</p>
        <img src="{sessionForecastIconUrl}" alt="{sessionForecast['weather'][0]['main']}">
    {:else}
        <p>NO FORECAST AVAILABLE YET</p>
    {/if}
</div>
