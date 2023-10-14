<script lang="ts">
    // Type imports
    import type { AllSeriesData } from "$lib/types/Data";
    import { getSessionNames, getNextEventName } from "$lib/components/MetaDescription/MetaDescription";

    export let seriesData: AllSeriesData, seriesList: string[];
</script>

<svelte:head>
    {#if seriesList}
        {#each seriesList as series}
            <meta name="description" content="Countdown to the {new Date().getFullYear()} {series.toUpperCase()} {getNextEventName(seriesData, series)} Grand Prix {getSessionNames(seriesData, series)}">
        {/each}
    {/if}
</svelte:head>