<script lang="ts">
    // Function imports
    import { UpcomingEvent } from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent";

    // Type imports
    import type { Event } from "$lib/types/Data";

    export let event: Event;

    let upcomingEvent: UpcomingEvent;
    $: upcomingEvent = new UpcomingEvent(event)

    const toggleSessionVisibility = () => {
        upcomingEvent.sessionsHidden = !upcomingEvent.sessionsHidden
    }
</script>
<style lang="scss">
    tbody {
        background: var(--table-row-primary-color);
    }

    tbody:nth-child(2n) {
        background: var(--table-row-secondary-color);
    }

    td {
        padding: 5px 15px;
    }

    .session-row.hidden {
        display: none;
    }

    .session-date, .race-date {
        vertical-align: bottom;
        height: 35px;
        padding-bottom: 0;
    }

    .session-time, .race-time {
        color: var(--secondary-text-color);
        vertical-align: top;
        height: 35px;
        padding-top: 0;
    }

    .event-name, .session-name {
        width: 30%;
    }

    .session-date, .race-date, .session-time, .race-time {
        width: 30%;
    }

    .location, .collapse {
        width: 5%;
    }

    .location {
        a {
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

        a:hover {
            background: var(--button-hover-color);
            color: var(--main-text-color);
        }
    }

    .collapse {
        button {
            width: 30px;
            height: 30px;

            display: flex;
            align-items: center;
            justify-content: center;

            i {
                transition: transform 0.3s ease;
            }

            i.hidden {
                transform: rotateX(180deg);
            }
        }
    }
</style>

<tbody class="event">
    <tr class="header-row">
        <td class="location" rowspan="2">
            <a href={upcomingEvent.locationURL} target="_blank" aria-label="Google Maps Location of Event">
                <i class="fa-solid fa-location-dot"></i>
            </a>
        </td>
        <td class="event-name" rowspan="2">{upcomingEvent.eventName}</td>
        <td class="race-date">{upcomingEvent.raceDate}</td>
        <td class="collapse" rowspan="2">
            <button on:click={toggleSessionVisibility} aria-label="Show or hide all Sessions of Event">
                <i class="fa-solid fa-chevron-up" class:hidden={upcomingEvent.sessionsHidden}></i>
            </button>
        </td>
    </tr>
    <tr class="header-row">
        <td class="race-time">{upcomingEvent.raceTime}</td>
    </tr>
    {#each { length: upcomingEvent.sessionNames.length } as _, i}
        <tr class="session-row" class:hidden={upcomingEvent.sessionsHidden}>
            <td class="session-name" rowspan="2" colspan="2">{upcomingEvent.sessionNames.at(i)}</td>
            <td class="session-date" colspan="2">{upcomingEvent.sessionDates.at(i)}</td>
        </tr>
        <tr class="session-row" class:hidden={upcomingEvent.sessionsHidden}>
            <td class="session-time" colspan="2">{upcomingEvent.sessionTimes.at(i)}</td>
        </tr>
    {/each}
</tbody>