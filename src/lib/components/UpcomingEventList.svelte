<script lang="ts">
    // Function imports
    import { onMount } from "svelte";
    import { parseName, parseDate, parseTime, getLocationURL } from "$lib/functions/UpcomingEventList";

    // Type imports
    import type { UpcomingEvent } from "$lib/types/UpcomingEventList";

    export let nextEvents: UpcomingEvent[];

    onMount(() => {
        for (const nextEvent of nextEvents) {
            nextEvent.sessionsTableVisible = false;
        }
    })
</script>

<style>
    /* General table settings */
    table {
        margin: 20px 0;
        font-size: 14px;
        border-collapse: collapse;
        width: min(90vw, 750px);
    }

    table button {
        padding: 5px 10px;
    }

    /* Hiding and showing all sessions */
    tbody {
        display: none;
    }

    tbody.visible {
        display: table-row-group;
    }

    /* Making every second row a different color */
    thead tr, tbody tr {
        background-color: var(--table-row-primary-color);
    }

    tbody tr:nth-child(2n-1) {
        background-color: var(--table-row-secondary-color);
    }

    /* Table cells settings */
    .name, .date, .collapse, .location {
        padding: 15px;
    }

    .name, .date {
        width: 45%;
    }

    .time {
        color: var(--secondary-text-color);
    }

    /* Collapse button settings */
    .collapse, .location {
        width: 5%;
    }

    /* Rotating chevron */
    i {
        transition: transform 0.3s ease;
    }

    i.visible {
        transform: rotateX(180deg);
    }

    /* Giving a element same properties as button */
    a {
        font-size: 16px;
        color: var(--secondary-text-color);
        background: var(--button-inactive-color);
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        transition: background 0.2s ease;
    }

    a:hover {
        background: var(--button-hover-color);
        color: var(--main-text-color);
    }
</style>

<div class="upcoming-event-list">
    <h3>Upcoming Grands Prix</h3>
    {#each nextEvents as event}
        <table class="event">
            <thead>
                <tr class="table-head-row">
                    <td class="location">
                        <a href="{getLocationURL(event)}" target="_blank" aria-label="Google Maps Location of Event">
                            <i class="fa-solid fa-location-dot"></i>
                        </a>
                    </td>
                    <td class="name">{parseName(event.name)}</td>
                    <td class="date">
                        <span class="day">{parseDate(Object.values(event['sessions']).at(-1))}</span><br>
                        <span class="time">{parseTime(Object.values(event['sessions']).at(-1))}</span>
                    </td>
                    <td class="collapse">
                        <button on:click={() => event.sessionsTableVisible = !event.sessionsTableVisible} aria-label="Show or hide all Sessions of Event">
                            <i class="fa-solid fa-chevron-up" class:visible={event.sessionsTableVisible}></i>
                        </button>
                    </td>
                </tr>
            </thead>
            <tbody class:visible={event.sessionsTableVisible}>
            {#each Object.keys(event['sessions']) as session}
                <tr>
                    <td class="name" colspan="2">{session.toUpperCase()}</td>
                    <td class="date" colspan="2">
                        <span class="day">{parseDate(event['sessions'][session])}</span><br>
                        <span class="time">{parseTime(event['sessions'][session])}</span>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    {/each}
</div>