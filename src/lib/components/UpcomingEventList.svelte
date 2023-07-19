<script lang="ts">
    // Function imports
    import { onMount } from "svelte";
    import { parseName, parseDate, parseTime, getLocationURL } from "$lib/functions/UpcomingEventList";

    // Type imports
    import type { UpcomingEvent } from "$lib/types/UpcomingEventList";

    export let nextEvents: UpcomingEvent[];

    let events: HTMLTableElement[] = [];

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
        width: min(90vw, 850px);
    }

    table caption {
        font-weight: bold;
        font-size: 18px;
        text-align: left;
        padding: 15px;
        margin-top: 20px;
    }

    table button {
        padding: 5px 10px;
    }

    /* Making every second row a different color */
    thead tr {
        background-color: var(--table-row-primary-color);
    }

    tbody tr {
        background-color: var(--table-row-secondary-color);
    }

    tbody tr:nth-child(2n) {
        background-color: var(--table-row-primary-color);
    }


    /* Table cells settings */
    .name, .session-name, .date {
        width: 45%;
        padding: 15px;
        text-align: left;
    }

    .name {
        font-weight: bold;
    }

    .time {
        color: var(--secondary-text-color);
    }

    /* Collapse button settings */
    .location, .collapse {
        width: 5%;
        padding: 15px;
        text-align: center;
        vertical-align: center;
    }

    .table-head-row {
        height: 75px;
    }

    @media only screen and (max-width: 768px) {
        .table-head-row {
            height: 125px;
        }
    }
</style>

<table class="upcoming">
    <caption>Upcoming Grands Prix</caption>
    {#if nextEvents}
        {#each nextEvents as event, i}
            <table bind:this={events[i]} class="event">
                <thead>
                <tr class="table-head-row">
                    <th class="location">
                        <a href="{getLocationURL(event)}" target="_blank">
                            <button><i class="fa-solid fa-location-dot"></i></button>
                        </a>
                    </th>
                    <td class="name">{parseName(event.name)}</td>
                    {#if !event.sessionsTableVisible}
                        <td class="date">
                            <span class="day">{parseDate(event)}</span><br>
                            <span class="time">{parseTime(event)}</span>
                        </td>
                    {:else}
                        <td class="date"></td>
                    {/if}
                    <td class="collapse">
                        <button on:click={() => nextEvents[i].sessionsTableVisible = !nextEvents[i].sessionsTableVisible}>
                            {#if event.sessionsTableVisible}
                                <i class="fa-solid fa-chevron-up"></i>
                            {:else}
                                <i class="fa-solid fa-chevron-down"></i>
                            {/if}
                        </button>
                    </td>
                </tr>
                </thead>
                {#if event.sessionsTableVisible}
                    <tbody class="sessions">
                    {#each Object.keys(event['sessions']) as session}
                        <tr>
                            <td class="session-name" colspan="2">{session.toUpperCase()}</td>
                            <td class="date" colspan="2">
                                <span class="day">{parseDate(event)}</span>
                                <span class="time">{parseTime(event)}</span>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                {/if}
            </table>
        {/each}
    {/if}
</table>