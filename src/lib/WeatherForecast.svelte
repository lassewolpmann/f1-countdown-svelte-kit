<script>
    export let nextEventSessions;
    export let currentSessionIndex;
    export let weatherForecast;

    let sessionForecast, sessionForecastIconUrl, sessionInPast;
    let weatherDescription, riskOfRain;

    $: {
        const currentSessionName = Object.keys(nextEventSessions).at(currentSessionIndex);
        const currentSessionDate = nextEventSessions[currentSessionName];

        sessionForecast = weatherForecast.at(currentSessionIndex);

        // Only give weather forecast to sessions that are in the future
        // TODO: Implement Historical Weather API calls
        // TODO: Delete
        if (sessionForecast) {
            sessionInPast = new Date(currentSessionDate).getTime() <= new Date().getTime();

            const sessionForecastIcon = sessionForecast['weather'][0]['icon'];
            sessionForecastIconUrl = `https://openweathermap.org/img/wn/${sessionForecastIcon}.png`;

            weatherDescription = sessionForecast['weather'][0]['description'].toUpperCase();
            riskOfRain = sessionForecast['pop'] * 100;
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
        flex-direction: column;
    }

    .weather > span {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }
</style>
<div class="weather">
    {#if sessionForecast && !sessionInPast}
        <span>{weatherDescription} <img src="{sessionForecastIconUrl}" alt="{sessionForecast['weather'][0]['main']}"></span>
        {#if riskOfRain > 0}
            <span>RISK OF RAIN: {riskOfRain}%</span>
        {/if}
    {:else if !sessionForecast}
        <p>NO FORECAST AVAILABLE</p>
    {/if}
</div>
