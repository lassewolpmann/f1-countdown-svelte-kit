<script>
    import RainDrop from "$lib/RainDrop.svelte";

    export let weatherForecast, currentSessionIndex;

    let rainDropCount, rainDropArray;

    $: {
        const sessionForecast = weatherForecast[currentSessionIndex];

        if (sessionForecast) {
            rainDropArray = []

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
        <svelte:component this={rainDrop} />
    {/each}
</div>
<!--
<div class="clouds">
    {#each cloudArray as cloud}
        <svelte:component this={cloud} />
    {/each}
</div>
-->