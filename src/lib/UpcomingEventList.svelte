<script>
    export let nextEvents;

    function getDate(event) {
        const eventSessions = event['sessions']
        const timestamp = eventSessions[eventSessions.length - 1]['startTimeUtc'] * 1000;
        const d = new Date(timestamp);

        return d.toDateString() + ', ' + d.toLocaleTimeString()
    }
</script>

<style>
    .upcoming-events {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 15px;
        margin: 20px 0;
    }

    table {
        font-size: 0.9rem;
        border-collapse: collapse;
    }

    table > caption {
        font-weight: 600;
        font-size: 1rem;
        text-align: left;
        background: rgba(22, 22, 22);
        padding: 15px;
    }

    table > tbody {
        width: 100%;
    }

    table > tbody > tr {
        background: rgba(22, 22, 22);
    }

    table > tbody > tr:nth-child(2n+1) {
        background: rgba(29, 29, 29);
    }

    table > tbody > tr:last-child {
        border: none;
        border-radius: 10px;
    }

    table > tbody > tr > td, th {
        text-align: left;
        padding: 15px;
    }

    table > tbody > tr > th > img {
        display: flex;
        width: 30px;
        height: auto;
    }
</style>

<div class="upcoming-events">
    <table>
        <caption>Upcoming Grands Prix</caption>
        <tbody>
        {#each nextEvents as event}
            <tr>
                <th>
                    <img src="{event['country']['picture']}" alt="Flag of {event['country']['name']}">
                </th>
                <td>{event['name']}</td>
                <td>{getDate(event)}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
