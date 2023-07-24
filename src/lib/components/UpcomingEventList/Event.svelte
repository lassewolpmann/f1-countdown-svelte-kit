<script lang="ts">
    // Function imports
    import { parseName, parseDate, parseTime, getLocationURL } from "$lib/functions/UpcomingEventList";
    import { onMount } from "svelte";

    // Type imports
    import type { UpcomingEvent } from "$lib/types/UpcomingEventList";

    export let event: UpcomingEvent;
    let raceDate: string;

    onMount(() => {
        raceDate = Object.values(event.sessions).at(-1);
        event.sessionsTableHidden = true;
    })

    const toggleSessionVisibility = () => {
        event.sessionsTableHidden = !event.sessionsTableHidden
    }
</script>
<style>
    tbody {
        background: var(--table-row-primary-color);
    }

    tbody:nth-child(2n) {
        background: var(--table-row-secondary-color);
    }

    td {
        padding: 5px 15px;
    }

    .session-name, .session-date {
        border-top: var(--border);
    }

    .session-row.hidden {
        display: none;
    }

    .session-time {
        color: var(--secondary-text-color);
    }

    .event-name, .session-name {
        width: 35%;
    }

    .location > a {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 30px;
        height: 30px;

        background: var(--button-inactive-color);
        cursor: pointer;
        border: none;
        border-radius: 5px;

        color: var(--secondary-text-color);
        transition: background 0.2s ease;

        text-decoration: none;
    }

    .location > a:hover {
        background: var(--button-hover-color);
        color: var(--main-text-color);
    }

    .collapse, .location {
        width: 5%;
    }

    .collapse > button {
        width: 30px;
        height: 30px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .collapse > button > i {
        transition: transform 0.3s ease;
    }

    .collapse > button > i.hidden {
        transform: rotateX(180deg);
    }
</style>

<tbody class="event" id="{event.slug}">
    <tr class="header-row">
        <td class="location" rowspan="2">
            <a href="{getLocationURL(event)}" target="_blank" aria-label="Google Maps Location of Event">
                <i class="fa-solid fa-location-dot"></i>
            </a>
        </td>
        <td class="event-name" rowspan="2">{parseName(event.name)}</td>
        <td class="race-date">{parseDate(raceDate)}</td>
        <td class="collapse" rowspan="2">
            <button on:click={toggleSessionVisibility} aria-label="Show or hide all Sessions of Event">
                <i class="fa-solid fa-chevron-down" class:hidden={event.sessionsTableHidden}></i>
            </button>
        </td>
    </tr>
    <tr class="header-row">
        <td class="session-time">{parseTime(raceDate)}</td>
    </tr>
    {#each Object.keys(event.sessions) as session}
        <tr class="session-row" class:hidden={event.sessionsTableHidden}>
            <td class="session-name" rowspan="2" colspan="2">{session.toUpperCase()}</td>
            <td class="session-date" colspan="2">{parseDate(event.sessions[session])}</td>
        </tr>
        <tr class="session-row" class:hidden={event.sessionsTableHidden}>
            <td class="session-time" colspan="2">{parseTime(event.sessions[session])}</td>
        </tr>
    {/each}
</tbody>