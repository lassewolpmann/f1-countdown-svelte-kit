<script>
    import RainDrop from "$lib/components/Weather/RainDrop.svelte";

    export let weatherForecast, currentSessionIndex, nextEventSessions;

    let rainDropArray;

    $: {
        const sessionForecast = weatherForecast[currentSessionIndex];
        const currentSessionName = Object.keys(nextEventSessions).at(currentSessionIndex);
        const currentSessionDate = nextEventSessions[currentSessionName];

        rainDropArray = []

        // Only give animation for forecast that isn't in the past
        if (sessionForecast && new Date(currentSessionDate).getTime() > new Date().getTime()) {
            for (let i = 0; i < sessionForecast['pop'] * 100; i++) {
                rainDropArray.push(RainDrop);
            }
        }
    }
</script>
<style>
    .rain {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
<div class="rain">
    {#each rainDropArray as rainDrop}
        <RainDrop />
    {/each}
</div>