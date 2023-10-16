<script lang="ts">
    // Type imports
    import type { Event } from "$lib/types/Data";

    // Component imports
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";

    export let nextEvents: Event[];
</script>

<style lang="scss">
    .upcoming-event-list {
        display: flex;
        flex-direction: column;

        gap: 25px;

        width: min(90vw, 700px);

        margin-bottom: 25px;

        h3 {
            margin: 20px 0 0 0;
        }
    }
</style>

<div class="upcoming-event-list">
    <h3>Upcoming Grands Prix</h3>
    {#each nextEvents as event}
        <UpcomingEvent {event} />
    {/each}
</div>