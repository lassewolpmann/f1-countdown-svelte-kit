<script lang="ts">
    // Component imports
    import Footer from "$lib/components/Footer.svelte";
    import Timer from "$lib/components/Timer/Timer.svelte";
    import UpcomingEventList from "$lib/components/UpcomingEventList.svelte";
    import SeriesSelection from "$lib/components/SeriesSelection.svelte";
    import Border from "$lib/components/Border.svelte";
    import MetaDescription from "$lib/components/MetaDescription.svelte";
    import RaceTitle from "$lib/components/RaceTitle.svelte";
    import SessionSelection from "$lib/components/SessionSelection.svelte";

    // Store imports
    import { currentSeries } from "$lib/stores/currentSeries";

    // Type imports
    import type { Event, SeriesData, AllSeriesData } from "$lib/types/Data";
    import type { PageData } from './$types';

    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    inject({ mode: dev ? 'development' : 'production' });

    export let data: PageData;

    let currentSeriesData: SeriesData;
    let nextEvents: Event[];
    let nextEvent: Event | undefined;
    let nextEventSessions: { [key: string]: string };

    const seriesData = data ? data['seriesData'] : {} as AllSeriesData;
    const seriesList = data ? data['seriesList'] : [];

    $: if (seriesData) {
        currentSeriesData = seriesData[$currentSeries];
        nextEvents = currentSeriesData.nextEvents;
        nextEvent = nextEvents.at(0);
        if (nextEvent) nextEventSessions = nextEvent.sessions;
    }
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
    <UpcomingEventList {nextEvents} />
    <Border />
</main>
<footer>
    <Footer />
</footer>

