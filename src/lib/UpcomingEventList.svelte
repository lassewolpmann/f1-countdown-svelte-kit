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
        const lastSessionName = sessionNames[sessionNames.length - 1]

        return allSessions[lastSessionName]
    }

    const getLocationURL = (event) => {
        const baseURL = 'https://www.google.com/maps/place/';
        const latitude = event['latitude'];
        const longitude = event['longitude'];

        console.log(baseURL + latitude + ',' + longitude);

        return baseURL + latitude + ',' + longitude
    }
</script>

<style>
    /* General table settings */
    table {
        margin: 20px 0;
        font-size: 0.9rem;
        border-collapse: collapse;
        width: min(90vw, 1000px);
    }

    table caption {
        font-weight: bold;
        font-size: 1rem;
        text-align: left;
        background: var(--table-row-primary-color);
        padding: 15px;
        margin: 20px 0 0 0;
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

    /* General settings for table data */
    .collapse {
        padding: 15px 5px;
        text-align: center;
        vertical-align: center;
    }

    .name, .session-name {
        width: 50%;
    }

    .date {
        width: 20%;
    }

    .name, .session-name, .date {
        padding: 15px 20px;
        text-align: left;
    }

    .collapse button {
        cursor: pointer;
        background: none;

        color: var(--main-text-color);
        border: none;
        font-size: 1rem;

        transition: color 0.2s ease;
    }

    .collapse button:hover {
        color: var(--button-hover-color);
    }

    a {
        color: inherit;
        text-decoration: inherit;
        transition: color 0.2s ease;
        padding-right: 10px;
    }

    a:hover {
        color: var(--button-hover-color);
    }
</style>

<table class="upcoming">
    <caption>Upcoming Grands Prix</caption>
    {#each nextEvents as event, i}
        <table bind:this={events[i]} class="event">
            <thead>
            <tr>
                <th class="name"><a href="{getLocationURL(event)}" target="_blank"><i class="fa-solid fa-location-dot"></i></a>{parseName(event['name'])}</th>
                {#if !nextEvents[i].sessionsTableVisible}
                    <td class="date">{parseDate(getLastSession(event))}</td>
                    <td class="date">{parseTime(getLastSession(event))}</td>
                {:else}
                    <td class="date"></td>
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
                        <td class="session-name">{session.toUpperCase()}</td>
                        <td class="date">{parseDate(event['sessions'][session])}</td>
                        <td class="date" colspan="2">{parseTime(event['sessions'][session])}</td>
                    </tr>
                {/each}
                </tbody>
            {/if}
        </table>
    {/each}
</table>