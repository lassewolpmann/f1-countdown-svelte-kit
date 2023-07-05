<script>
    export let seriesData, seriesList;
</script>

<svelte:head>
    {#each seriesList as series}
        <meta name="description" content="Countdown to the {new Date().getFullYear()} {series.toUpperCase()} {seriesData[series]['nextEvents'][0]['name']} Grand Prix {Object.keys(seriesData[series]['nextEvents'][0]['sessions']).join(', ').toUpperCase()}">
    {/each}
</svelte:head>