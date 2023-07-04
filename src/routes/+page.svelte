<script>
    import Footer from "$lib/components/Footer.svelte";
    import Timer from "$lib/components/Timer/Timer.svelte";
    import UpcomingEventList from "$lib/components/UpcomingEventList.svelte";
    import SeriesSelection from "$lib/components/SeriesSelection.svelte";
    import Border from "$lib/components/Border.svelte";
    import MetaDescription from "$lib/components/MetaDescription.svelte";

    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    inject({ mode: dev ? 'development' : 'production' });

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

    @media only screen and (max-width: 768px) {
        footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
        }
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
