<script>
    import { blur } from 'svelte/transition';

    export let nextEvents;

    for (let i = 0; i < nextEvents.length; i++) {
        nextEvents[i].sessionsTableVisible = false;
    }

    let events = [];

    const getDate = (event) => {
        const eventSessions = event['sessions'];
        if (eventSessions.length > 0) {
            return parseDate(eventSessions[eventSessions.length - 1]['startTimeUtc'] * 1000)
        } else {
            return ["TBD", ""]
        }
    }

    const parseDate = (timestamp) => {
        const d = new Date(timestamp);

        return [d.toDateString(), d.toLocaleTimeString()]
    }

    const collapseSessions = (index) => {
        nextEvents[index].sessionsTableVisible = !nextEvents[index].sessionsTableVisible;
    }
</script>

<style>
    /* General table settings */
    table {
        margin: 20px 0;
        font-size: 0.9rem;
        border-collapse: collapse;
        width: min(90vw, 800px);
    }

    table caption {
        font-weight: bold;
        font-size: 1rem;
        text-align: left;
        background: var(--table-row-primary-color);
        padding: 15px;
    }

    /* Making every second row a different color */
    thead tr {
        background-color: var(--table-row-primary-color);
    }

    tbody tr {
        background-color: var(--table-row-secondary-color);
    }

    tbody tr:nth-child(4n),  tbody tr:nth-child(4n - 1){
        background-color: var(--table-row-primary-color);
    }

    /* General settings for table data */
    .flag, .collapse {
        padding: 0 5px;
        text-align: center;
        vertical-align: center;
    }

    .flag img {
        width: 35px;
        height: auto;
    }

    .name, .date, .location, .time, .session-name {
        width: 35%;
    }

    .name, .date, .session-name {
        padding: 15px 15px 5px 15px;
    }

    .location, .time {
        padding: 5px 15px 15px 15px;
        color: var(--secondary-text-color);
    }

    .session-name {
        text-align: right;
    }

    .collapse button {
        cursor: pointer;
        background-color: var(--button-inactive-color);

        color: var(--main-text-color);
        border: none;
        font-size: 1rem;

        border-radius: 5px;
        transition: background-color 0.2s ease;
    }

    .collapse button i {
        padding: 5px 3px;
    }

    .collapse button:hover {
        background: var(--button-hover-color);
    }
</style>

<table>
    <caption>Upcoming Grands Prix</caption>
    {#each nextEvents as event, i}
        <table bind:this={events[i]} class="event">
            <thead>
            <tr>
                <th class="flag" rowspan="2">
                    <img src="{event['country']['picture']}" alt="Flag of {event['country']['name']}">
                </th>
                <td class="name">{event['name']}</td>
                <td class="date">
                    {#if event['status'] === ''}
                        {getDate(event)[0]}
                    {:else}
                        {event['status']}
                    {/if}
                </td>
                <td class="collapse" rowspan="2">
                    <button on:click={() => collapseSessions(i)}>
                        {#if nextEvents[i].sessionsTableVisible}
                            <i class="fa-solid fa-minus"></i>
                        {:else}
                            <i class="fa-solid fa-plus"></i>
                        {/if}
                    </button>
                </td>
            </tr>
            <tr>
                <td class="location">{event['venue']['name']}</td>
                <td class="time">{getDate(event)[1]}</td>
            </tr>
            </thead>
            {#if nextEvents[i].sessionsTableVisible}
                <tbody class="sessions" transition:blur>
                {#each event['sessions'] as session}
                    <tr>
                        <td class="session-name" colspan="2">{session['name']}</td>
                        <td class="date" colspan="2">{parseDate(session['startTimeUtc'] * 1000)[0]}</td>
                    </tr>
                    <tr>
                        <td colspan="2"></td>
                        <td class="time" colspan="2">{parseDate(session['startTimeUtc'] * 1000)[1]}</td>
                    </tr>
                {/each}
                </tbody>
            {/if}
        </table>
    {/each}
</table>