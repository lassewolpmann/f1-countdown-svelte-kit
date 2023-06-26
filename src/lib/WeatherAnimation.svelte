<script>
    import RainDrop from "$lib/RainDrop.svelte";
    export let weatherForecast, currentSessionIndex;

    let rainDropCount, cloudCoverage;
    let rainDropArray;

    $: {
        const sessionForecast = weatherForecast[currentSessionIndex];

        if (sessionForecast) {
            rainDropCount = sessionForecast['pop'] * 100;
            cloudCoverage = typeof(sessionForecast['clouds']) === 'object' ? sessionForecast['clouds']['all'] : sessionForecast['clouds']

            rainDropArray = []

            for (let i = 0; i < rainDropCount; i++) {
                rainDropArray.push(RainDrop);
            }
        }
    }
</script>
<style>
    .weather-animation {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .rain, .clouds {
        position: absolute;
        width: 100%;
        height: 100%;
    }


</style>
<div class="weather-animation">
    <div class="rain">
        {#each rainDropArray as rainDrop}
            <svelte:component this={rainDrop} />
        {/each}
    </div>
    <div class="clouds"></div>
</div>