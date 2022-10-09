<script>
    export let nextEvents;

    function getDate(event) {
        const timestamp = Date.parse(event['date'] + ' ' + event['time']);
        const d = new Date(timestamp);

        return d.toDateString() + ', ' + d.toLocaleTimeString()
    }
</script>

<style>
    .event-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .event-table {
        color: #ddd;
        font-size: 0.9rem;
        border-collapse: collapse;
        margin-bottom: 50px;
    }

    .event-table caption {
        font-weight: bold;
        font-size: 1rem;
        color: grey;
        text-align: left;
        padding-top: 40px;
        padding-bottom: 20px;
    }

    .event-table th, td {
        border-bottom: 2px solid #222222;
        padding: 10px 0 10px 0;
        text-align: left;
    }

    .event-table tr:last-child td {
        border-bottom: 0;
    }

    .event-table tr:last-child th {
        border-bottom: 0;
    }

    .event-table .race-location {
        padding-inline: 20px;
        text-align: left;
    }

    .event-table .race-date {
        padding-inline: 20px;
        text-align: right;
    }
</style>

<div class="event-list">
    <table class="event-table">
        <caption>Upcoming Grands Prix</caption>
        <tbody>
        {#each nextEvents as event}
            <tr>
                <th>{event['raceName']}</th>
                <td class="race-location">{event['Circuit']['circuitName']}</td>
                <td class="race-date">{getDate(event)}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>