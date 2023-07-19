<script lang="ts">
    // Type imports
    import type { AllSeriesData } from "$lib/types/Data";
    export let seriesData: AllSeriesData, seriesList: string[];
</script>

<svelte:head>
    {#if seriesList}
        {#each seriesList as series}
            <meta name="description" content="Countdown to the {new Date().getFullYear()} {series.toUpperCase()} {seriesData[series].nextEvents[0].name} Grand Prix {Object.keys(seriesData[series].nextEvents[0].sessions).join(', ').toUpperCase()}">
        {/each}
    {/if}
</svelte:head>