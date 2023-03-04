<script>
    export let nextEvents;
    import saveAs from 'file-saver';

    const getDate = (event) => {
        const eventSessions = event['sessions'];
        if (eventSessions.length > 0) {
            const timestamp = eventSessions[eventSessions.length - 1]['startTimeUtc'] * 1000;
            const d = new Date(timestamp);

            return d.toDateString() + ', ' + d.toLocaleTimeString()
        } else {
            return "TBD"
        }
    }

    const padDate = (date) => date < 10 ? "0" + date.toString() : date.toString();

    const createTimestamp = (date) => {
        const UTCYear = date.getUTCFullYear().toString();
        const UTCMonth = padDate(date.getUTCMonth() + 1);
        const UTCDay = padDate(date.getUTCDate());
        const UTCHour = padDate(date.getUTCHours());
        const UTCMinutes = padDate(date.getUTCMinutes());
        const UTCSeconds = padDate(date.getUTCSeconds());
        return UTCYear + UTCMonth + UTCDay + 'T' + UTCHour + UTCMinutes + UTCSeconds + 'Z'
    }

    const generateCalendarFile = () => {
        // create iCalendar Object according to RFC 5545: https://datatracker.ietf.org/doc/html/rfc5545#section-3.4

        const creationTimestamp = createTimestamp(new Date());
        let calendarFile = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//hacksw/handcal//NONSGML v1.0//EN'
        ];

        // loop through all events
        for (let i = 0; i < nextEvents.length; i++) {
            if (nextEvents[i]['sessions'].length > 0) {
                // loop through every session
                for (let j = 0; j < nextEvents[i]['sessions'].length; j++) {
                    if (nextEvents[i]['sessions'][j]['startTimeUtc'] !== null)
                    {
                        calendarFile.push('BEGIN:VEVENT');
                        calendarFile.push('UID:' + nextEvents[i]['sessions'][j]['uuid']);
                        calendarFile.push('DTSTAMP:' + creationTimestamp);
                        calendarFile.push('DTSTART:' + createTimestamp(new Date(nextEvents[i]['sessions'][j]['startTimeUtc'] * 1000)));

                        let endTime;
                        if (nextEvents[i]['sessions'][j]['endTimeUtc'] * 1000 === 0) {
                            endTime = (nextEvents[i]['sessions'][j]['startTimeUtc'] + 7200) * 1000;
                        } else {
                            endTime = nextEvents[i]['sessions'][j]['endTimeUtc'] * 1000;
                        }

                        calendarFile.push('DTEND:' + createTimestamp(new Date(endTime)));
                        calendarFile.push('STATUS:CONFIRMED');
                        calendarFile.push('SUMMARY:' + nextEvents[i]['name'] + ' ' + nextEvents[i]['sessions'][j]['name']);
                        calendarFile.push('END:VEVENT');
                    }
                }
            } else {
                calendarFile.push('BEGIN:VEVENT');
                calendarFile.push('UID:' + nextEvents[i]['uuid']);
                calendarFile.push('DTSTAMP:' + creationTimestamp);
                calendarFile.push('DTSTART:' + createTimestamp(new Date(nextEvents[i]['startTimeUtc'] * 1000)));
                calendarFile.push('DTEND:' + createTimestamp(new Date(nextEvents[i]['endTimeUtc'] * 1000)));
                calendarFile.push('STATUS:CANCELLED');
                calendarFile.push('SUMMARY:' + nextEvents[i]['name']);
                calendarFile.push('END:VEVENT');
            }
        }

        calendarFile.push('END:VCALENDAR');

        const url = calendarFile.join('\n');

        let blob = new Blob([url], {type: 'text/calendar;charset=utf-8' });

        saveAs(blob, 'schedule.ics');
    }
</script>

<style>
    table {
        padding: 15px;
        margin: 20px 0;
        font-size: 0.9rem;
        border-collapse: collapse;
        width: min(90vw, 700px);
    }

    table > caption {
        font-weight: 600;
        font-size: 1rem;
        text-align: left;
        background: rgba(22, 22, 22);
        padding: 15px;
        position: relative;
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

    .name, .date, .flag {
        text-align: left;
        padding: 15px;
    }

    .flag > img {
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
        </tr>
    {/each}
    </tbody>
</table>