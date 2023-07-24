<script lang="ts">
    // Type imports
    import type { UpcomingEvent } from "$lib/types/UpcomingEventList";

    // Component imports
    import Event from "$lib/components/UpcomingEventList/Event.svelte";

    export let nextEvents: UpcomingEvent[];
</script>

<style>
    /* General table settings */
    table {
        margin: 20px 0;
        font-size: 14px;
        border-collapse: collapse;
        width: min(90vw, 600px);
    }

    table > caption {
        text-align: left;
        padding-bottom: 15px;
        font-weight: 600;
        font-size: 16px;
    }
</style>

<table class="upcoming-event-list">
    <caption>Upcoming Grands Prix</caption>
    <thead></thead>
    {#each nextEvents as event}
        <Event {event} />
    {/each}
</table>