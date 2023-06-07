<script lang="ts">
    import Footer from "../lib/Footer.svelte";
    import Timer from "../lib/Timer.svelte";
    import UpcomingEventList from "../lib/UpcomingEventList.svelte";
    import SeriesSelection from "../lib/SeriesSelection.svelte";
    import Border from "../lib/Border.svelte";
    import MetaDescription from "../lib/MetaDescription.svelte";

    export let data;

    let currentSeries, currentSeriesData;

    currentSeries = data['seriesList'][0];

    $: currentSeriesData = data['seriesData'][currentSeries];
</script>
<style>
    main, footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    main {
        flex-direction: column;
    }

    footer {
        padding: 20px;
        flex-direction: row;
        gap: 50px;
    }
</style>

<MetaDescription seriesData={data['seriesData']} seriesList={data.seriesList} />

<main>
    <SeriesSelection seriesList={data.seriesList} bind:currentSeries={currentSeries} />
    <Border />
    <Timer currentSeriesData={currentSeriesData} />
    <Border />
    <UpcomingEventList nextEvents={currentSeriesData['nextEvents']} />
    <Border />
</main>
<footer>
    <Footer />
</footer>
