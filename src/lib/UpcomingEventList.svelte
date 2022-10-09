<script>
    export let nextEvents;

    function getDate(event) {
        const timestamp = Date.parse(event['date'] + ' ' + event['time']);
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
    .event-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-inline: 20px;
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
        padding: 50px 0 10px 0;
    }

    .event-table th, td {
        border-bottom: 2px solid #222222;
        padding: 20px 0;
        text-align: left;
    }

    .event-table tr:last-child td {
        border-bottom: 0;
    }

    .event-table tr:last-child th {
        border-bottom: 0;
    }

    .event-table .race-name {
        padding-inline: 10px;
        text-align: left;
    }

    .event-table .race-date {
        padding-inline: 10px;
        text-align: right;
    }

    .flag {
        padding-inline: 10px;
    }

    .flag > img {
        display: flex;
        width: 35px;
        height: auto;
    }
</style>

<div class="event-list">
    <table class="event-table">
        <caption>Upcoming Grands Prix</caption>
        <tbody>
        {#each nextEvents as event}
            <tr>
                {#await getFlag(event['Circuit']['Location']['country']) then flag}
                    <th class="flag">
                        <img src="{flag}" alt="Flag of {event['Circuit']['Location']['country']}">
                    </th>
                {/await}
                <td class="race-name">{event['raceName']}</td>
                <td class="race-date">{getDate(event)}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>