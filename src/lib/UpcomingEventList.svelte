<script>
    import { blur } from 'svelte/transition';

    export let nextEvents;

    for (let i = 0; i < nextEvents.length; i++) {
        nextEvents[i].sessionsTableVisible = false;
    }

    let events = [];

    const collapseSessions = (index) => {
        nextEvents[index].sessionsTableVisible = !nextEvents[index].sessionsTableVisible;
    }

    const parseName = (name) => {
        if (!name.includes("Grand Prix")) {
            return name + " Grand Prix"
        } else {
            return name
        }
    }

    const parseDate = (date) => {
        return new Date(date).toDateString()
    }

    const parseTime = (date) => {
        return new Date(date).toLocaleTimeString()
    }

    const getLastSession = (event) => {
        const allSessions = event['sessions'];
        const sessionNames = Object.keys(allSessions);
        const lastSessionName = sessionNames.at(-1);

        return allSessions[lastSessionName]
    }

    const getLocationURL = (event) => {
        const baseURL = 'https://www.google.com/maps/place/';
        const latitude = event['latitude'];
        const longitude = event['longitude'];

        return baseURL + latitude + ',' + longitude
    }
</script>

<style>
    /* General table settings */
    table {
        margin: 20px 0;
        font-size: 0.9rem;
        border-collapse: collapse;
        width: min(90vw, 850px);
    }

    table caption {
        font-weight: bold;
        font-size: 1rem;
        text-align: left;
        background: var(--table-row-primary-color);
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
</style>

<table class="upcoming">
    <caption>Upcoming Grands Prix</caption>
    {#each nextEvents as event, i}
        <table bind:this={events[i]} class="event">
            <thead>
            <tr>
                <th class="location">
                    <a href="{getLocationURL(event)}" target="_blank">
                        <button><i class="fa-solid fa-location-dot"></i></button>
                    </a>
                </th>
                <td class="name">{parseName(event['name'])}</td>
                {#if !nextEvents[i].sessionsTableVisible}
                    <td class="date">
                        <span class="day">{parseDate(getLastSession(event))}</span><br>
                        <span class="time">{parseTime(getLastSession(event))}</span>
                    </td>
                {:else}
                    <td class="date"></td>
                {/if}
                <td class="collapse">
                    <button on:click={() => collapseSessions(i)}>
                        {#if nextEvents[i].sessionsTableVisible}
                            <i class="fa-solid fa-minus"></i>
                        {:else}
                            <i class="fa-solid fa-plus"></i>
                        {/if}
                    </button>
                </td>
            </tr>
            </thead>
            {#if nextEvents[i].sessionsTableVisible}
                <tbody class="sessions" transition:blur>
                {#each Object.keys(event['sessions']) as session}
                    <tr>
                        <td class="session-name" colspan="2">{session.toUpperCase()}</td>
                        <td class="date" colspan="2">
                            <span class="day">{parseDate(event['sessions'][session])}</span>
                            <span class="time">{parseTime(event['sessions'][session])}</span>
                        </td>
                    </tr>
                {/each}
                </tbody>
            {/if}
        </table>
    {/each}
</table>