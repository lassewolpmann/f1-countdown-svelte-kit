<script>
    export let nextEventSessions;
    export let currentSessionIndex;
    export let weatherForecast;

    let sessionForecast, sessionForecastIconUrl;

    $: {
        const currentSessionName = Object.keys(nextEventSessions).at(currentSessionIndex);
        const currentSessionDate = nextEventSessions[currentSessionName];

        sessionForecast = weatherForecast.at(currentSessionIndex);

        // Only give weather forecast to sessions that are in the future
        // TODO: Implement Historical Weather API calls
        if (sessionForecast && new Date(currentSessionDate).getTime() > new Date().getTime()) {
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

    .weather-animation {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
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
<div class="weather-animation"></div>
