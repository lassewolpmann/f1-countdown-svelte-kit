<script>
    // Component imports
    import Footer from "$lib/components/Footer.svelte";
    import Timer from "$lib/components/Timer/Timer.svelte";
    import UpcomingEventList from "$lib/components/UpcomingEventList.svelte";
    import SeriesSelection from "$lib/components/SeriesSelection.svelte";
    import Border from "$lib/components/Border.svelte";
    import MetaDescription from "$lib/components/MetaDescription.svelte";
    import RaceTitle from "$lib/components/RaceTitle.svelte";
    import SessionSelection from "$lib/components/SessionSelection.svelte";
    import WeatherForecast from "$lib/components/Weather/WeatherForecast.svelte";
    import { currentSeries } from "$lib/stores/currentSeries.ts";

    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import {beforeUpdate, onMount} from "svelte";

    inject({ mode: dev ? 'development' : 'production' });

    export let data;

    let seriesData, seriesList, currentSeriesData, nextEvents, nextEvent, nextEventSessions, weatherForecast;

    onMount(() => {
        seriesData = data['seriesData'];
        seriesList = data['seriesList'];
    })

    beforeUpdate(() => {
        seriesData = data['seriesData'];
        seriesList = data['seriesList'];
        currentSeriesData = seriesData[$currentSeries];
        nextEvents = currentSeriesData['nextEvents'];
        nextEvent = nextEvents[0];
        nextEventSessions = nextEvent['sessions'];
        weatherForecast = currentSeriesData['weatherForecast'];
    })
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


<MetaDescription {seriesData} {seriesList} />

<main>
    <SeriesSelection {seriesList} />
    <Border />
    <RaceTitle {nextEvents} />
    <SessionSelection {nextEventSessions} />
    <Timer {nextEventSessions} />
    <Border />
    <WeatherForecast {nextEventSessions} {weatherForecast} />
    <Border />
    <UpcomingEventList {nextEvents} />
    <Border />
</main>
<footer>
    <Footer />
</footer>

