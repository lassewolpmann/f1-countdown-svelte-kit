<script>
    export let nextEvents;

    let events = [];

    const getDate = (event) => {
        const eventSessions = event['sessions'];
        if (eventSessions.length > 0) {
            return parseDate(eventSessions[eventSessions.length - 1]['startTimeUtc'] * 1000)
        } else {
            return "TBD"
        }
    }

    const parseDate = (timestamp) => {
        const d = new Date(timestamp);

        return d.toDateString() + ', ' + d.toLocaleTimeString()
    }

    const collapseSessions = (index) => events[index].classList.toggle('collapsed');
</script>

<style>
    /* General table settings */
    table {
        padding: 15px;
        margin: 20px 0;
        font-size: 0.9rem;
        border-collapse: collapse;
        width: min(90vw, 700px);
    }

    table caption {
        font-weight: 600;
        font-size: 1rem;
        text-align: left;
        background: rgba(29, 29, 29);
        padding: 15px;
    }

    /* Making every second row a different color */
    .event tr {
        background: rgba(22, 22, 22);
    }

    .event tr:nth-child(2n+1) {
        background: rgba(29, 29, 29);
    }

    /* General settings for table data */
    .name, .date, .flag {
        text-align: left;
        padding: 15px;
    }

    .flag img {
        display: flex;
        width: 30px;
        height: auto;
    }

    .flag {
        width: 10%;
    }

    .name {
        width: 40%;
    }

    .date {
        width: 40%;
    }

    .collapse {
        width: 10%;
        text-align: center;
    }

    /* Collapsible sessions */
    .event.collapsed .session {
        display: none;
    }

    .event.collapsed .bar.horizontal {
        opacity: 1;
    }

    .event.collapsed .bar.vertical {
        transform: rotate(90deg);
    }

    .session {
        display: table-row;
        transition: all 0.2s ease;
    }

    .collapse button {
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        font-size: 1.1rem;
        color: grey;
        cursor: pointer;
        background: #222;
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        transition: all 0.2s ease;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .collapse button:hover {
        background: #444;
        color: white;
    }

    /* plus/minus symbol for button */
    .bar {
        width: 10px;
        height: 2px;
        content: '';
        background: white;
        display: block;
        position: absolute;
    }

    .bar.horizontal {
        opacity: 0;
        transition: all 0.5s ease;
    }

    .bar.vertical {
        transform: rotate(180deg);
        transition: all 0.5s ease;
    }
</style>

<table>
    <caption>Upcoming Grands Prix</caption>
    {#each nextEvents as event, i}
        <table bind:this={events[i]} class="event collapsed">
            <tr>
                <th class="flag">
                    <img src="{event['country']['picture']}" alt="Flag of {event['country']['name']}">
                </th>
                <td class="name">{event['name']}</td>
                <td class="date">
                    {#if event['status'] === ''}
                        {getDate(event)}
                    {:else}
                        {event['status']}
                    {/if}
                </td>
                <td class="collapse"><button on:click={() => collapseSessions(i)}>
                    <span class="bar horizontal"></span>
                    <span class="bar vertical"></span>
                </button></td>
            </tr>
            {#each event['sessions'] as session}
                <tr class="session">
                    <th class="flag"></th>
                    <td class="name">{session['name']}</td>
                    <td class="date">{parseDate(session['startTimeUtc'] * 1000)}</td>
                    <td></td>
                </tr>
            {/each}
        </table>
    {/each}
</table>