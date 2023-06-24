<script lang="ts">
    import { callOpenWeatherApi, getSessionDateForecast } from "../lib/functions/callOpenWeatherApi";
    import { onMount } from "svelte";

    export let nextEvents;
    export let nextEventSessions;
    export let currentSessionIndex;

    let lat, lon;
    let weatherForecast;
    let sessionForecast, sessionForecastIconUrl;
    let currentSessionDate;

    $: lat = nextEvents[0]['latitude'];
    $: lon = nextEvents[0]['longitude'];
    $: currentSessionDate = nextEventSessions[Object.keys(nextEventSessions)[currentSessionIndex]]

    onMount(async () => {
        weatherForecast = await callOpenWeatherApi(lat, lon, currentSessionDate);
    })

    $: if (weatherForecast) {
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
