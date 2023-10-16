<script lang="ts">
    // Component imports
    import Footer from "$lib/components/Footer.svelte";
    import Timer from "$lib/components/Timer/Timer.svelte";
    import UpcomingEventList from "$lib/components/UpcomingEventList/UpcomingEventList.svelte";
    import SeriesSelection from "$lib/components/SeriesSelection/SeriesSelection.svelte";
    import Border from "$lib/components/Border.svelte";
    import MetaDescription from "$lib/components/MetaDescription/MetaDescription.svelte";
    import RaceTitle from "$lib/components/RaceTitle.svelte";
    import SessionSelection from "$lib/components/SessionSelection/SessionSelection.svelte";

    // Store imports
    import { currentSeries } from "$lib/components/SeriesSelection/currentSeries";

    // Type imports
    import type { Event, SeriesData } from "$lib/types/Data";
    import type { PageData } from './$types';

    // Font imports
    import "@fontsource/poppins/100.css";
    import "@fontsource/poppins/200.css";
    import "@fontsource/poppins/300.css";
    import "@fontsource/poppins/400.css";
    import "@fontsource/poppins/500.css";
    import "@fontsource/poppins/600.css";
    import "@fontsource/poppins/700.css";
    import "@fontsource/poppins/800.css";


    export let data: PageData;

    let currentSeriesData: SeriesData | undefined;
    let nextEvents: Event[];
    let nextEvent: Event | undefined;
    let nextEventSessions: { [key: string]: string };

    const seriesData = data['seriesData'];
    const seriesList = data['seriesList'];

    $: if (seriesData) {
        currentSeriesData = seriesData[$currentSeries];
        if (currentSeriesData) nextEvents = currentSeriesData.nextEvents;
        nextEvent = nextEvents.at(0);
        if (nextEvent) nextEventSessions = nextEvent.sessions;
    }
</script>
<style>
    main, header {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    main {
        flex-direction: column;
    }

    header {
        padding: 20px;
        flex-direction: row;
        gap: 50px;
    }
</style>


<MetaDescription {seriesData} {seriesList} />

<header>
    <SeriesSelection {seriesList} />
</header>
<Border />
<main>
    <RaceTitle {nextEvents} />
    <SessionSelection {nextEventSessions} />
    <Timer {nextEventSessions} />
    <Border />
    <UpcomingEventList {nextEvents} />
</main>
<Border />
<Footer />