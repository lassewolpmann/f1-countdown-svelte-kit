<script lang="ts">
    // Type imports
    import type { Event } from "$lib/types/Data";

    // Component imports
    import EventComponent from "$lib/components/UpcomingEventList/EventComponent.svelte";

    export let nextEvents: Event[];
</script>

<style lang="scss">
    table {
        margin: 20px 0;
        font-size: 14px;
        border-collapse: collapse;
        width: min(90vw, 600px);

        caption {
            text-align: left;
            padding-bottom: 15px;
            font-weight: 600;
            font-size: 16px;
        }
    }
</style>

<table class="upcoming-event-list">
    <caption>Upcoming Grands Prix</caption>
    <thead></thead>
    {#each nextEvents as event}
        <EventComponent {event} />
    {/each}
</table>