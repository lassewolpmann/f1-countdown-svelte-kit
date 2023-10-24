<script lang="ts">
    // Type imports
    import type { AllSeriesData } from "$lib/types/Data";
    import { MetaDescription } from "$lib/components/MetaDescription/MetaDescription";

    export let seriesData: AllSeriesData, seriesList: string[];

    const metaDescription = new MetaDescription(seriesList, seriesData);
</script>

<svelte:head>
    <meta name="description" content="{metaDescription.descriptionString}">
</svelte:head>