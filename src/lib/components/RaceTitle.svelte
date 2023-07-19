<script lang="ts">
    // Type imports
    import type { Event } from "$lib/types/Data";
    export let nextEvents: Event[];
</script>

<style>
    .event-name {
        font-size: 48px;
        font-weight: bold;
        margin: 10px 0;
    }

    @media only screen and (max-width: 768px) {
        .event-name {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
        }
    }
</style>

<h1 class="event-name">{nextEvents[0]['name']} Grand Prix</h1>