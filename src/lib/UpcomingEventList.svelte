<script>
    export let nextEvents;

    function getDate(event) {
        const eventSessions = event['sessions']
        const timestamp = eventSessions[eventSessions.length - 1]['startTimeUtc'] * 1000;
        const d = new Date(timestamp);

        return d.toDateString() + ', ' + d.toLocaleTimeString()
    }

    async function getFlag(countryName) {
        const response = await fetch('https://restcountries.com/v3.1/name/' + countryName);
        const data = await response.json();

        return data[0]['flags']['svg']
    }
</script>

<style>
    table {
        width: min(80vw, 600px);
        font-size: 0.9rem;
        border-collapse: collapse;
        margin: 50px 0;
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

<table>
    <caption>Upcoming Grands Prix</caption>
    <tbody>
    {#each nextEvents as event}
        <tr>
            {#await getFlag(event['country']['name']) then flag}
                <th>
                    <img src="{flag}" alt="Flag of {event['country']['name']}">
                </th>
            {/await}
            <td>{event['name']}</td>
            <td>{getDate(event)}</td>
        </tr>
    {/each}
    </tbody>
</table>