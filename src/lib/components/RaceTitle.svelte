<script>
    import { beforeUpdate } from "svelte";

    export let nextEvents;

    let eventName, sessionNames;

    beforeUpdate(() => {
        sessionNames = Object.keys(nextEvents[0]['sessions']).join(', ');
        const name = nextEvents[0]['name']
        eventName = !name.includes("Grand Prix") ? name + " Grand Prix" : name;
    })
</script>

<style>
    .event-name {
        font-size: 48px;
        font-weight: bold;
        margin: 10px 0;
    }

    @media only screen and (max-width: 768px) {
        .event-name {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
        }
    }
</style>

<h1 class="event-name">{eventName}</h1>