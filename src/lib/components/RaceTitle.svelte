<script lang="ts">
    // Type imports
    import type { Event } from "$lib/types/Data";

    export let nextEvents: Event[];

    let nextEvent: undefined | Event, nextEventName: string;

    $: if (nextEvents) {
        nextEvent = nextEvents.at(0);
        nextEventName = nextEvent !== undefined ? nextEvent.name : "Unknown Grand Prix";
    }
</script>

<style>
    .event-name {
        font-size: 48px;
        margin: 10px 0;
        text-align: center;
        font-weight: 600;
    }

    @media only screen and (max-width: 768px) {
        .event-name {
            font-size: 32px;
        }
    }
</style>

<h1 class="event-name">{nextEventName} Grand Prix</h1>