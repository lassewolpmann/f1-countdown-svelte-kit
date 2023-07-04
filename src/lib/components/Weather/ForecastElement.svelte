<script>
    export let forecast, accuracy, offset;
    let forecastTime, weatherIcon, weatherDescription, temp, riskOfRain;
    let forecastEl;

    $: {
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

    $: if (forecastEl) {
        forecastEl.style.transform = `translateX(${offset}px)`;
    }
</script>
<style>
    .forecast-element {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        margin: 5px 20px;

        transition: transform 0.3s ease;
    }

    .forecast-element > span {
        white-space: nowrap;
    }
</style>
<div class="forecast-element" bind:this={forecastEl}>
    {forecastTime}
    <img src="{weatherIcon}" alt="{weatherDescription}">
    <span>{temp}°</span>
    <span><i class="fa-solid fa-droplet"></i> {riskOfRain}%</span>
</div>