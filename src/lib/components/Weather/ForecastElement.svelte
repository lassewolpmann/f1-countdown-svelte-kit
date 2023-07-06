<script>
    import { beforeUpdate } from "svelte";

    export let forecast, accuracy;
    let forecastTime, weatherIcon, weatherDescription, temp, riskOfRain, forecastEl;

    beforeUpdate(() => {
        if (forecast) {
            weatherIcon = `https://openweathermap.org/img/wn/${forecast['weather'][0]['icon']}.png`;
            weatherDescription = forecast['weather'][0]['description'];
            riskOfRain = Math.floor(forecast['pop'] * 100);

            if (accuracy === 'hourly') {
                forecastTime = new Date(forecast.dt * 1000).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
                temp = Math.floor(forecast['main']['temp']);
            } else {
                forecastTime = new Date(forecast.dt * 1000).toLocaleDateString([], { weekday: 'short' });
                temp = Math.floor(forecast['temp']['day']);
            }
        }
    })
</script>
<style>
    .forecast-element {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        font-size: 16px;

        margin: 5px 20px;

        min-width: 50px;
        max-width: 50px;

        min-height: 105px;
        max-height: 105px;
    }

    .forecast-element > span {
        white-space: nowrap;
    }

    .forecast-element > img {
        width: 50px;
        height: 50px;
    }

    @media only screen and (max-width: 768px) {
        .forecast-element {
            font-size: 14px;

            min-width: 40px;
            max-width: 40px;

            min-height: 95px;
            max-height: 95px;
        }

        .forecast-element > img {
            width: 35px;
            height: 35px;
        }
    }
</style>
<div class="forecast-element" bind:this={forecastEl}>
    {#if forecast}
        {forecastTime}
        <img src="{weatherIcon}" alt="{weatherDescription}">
        <span>{temp}°</span>
        <span><i class="fa-solid fa-droplet"></i> {riskOfRain}%</span>
    {/if}
</div>