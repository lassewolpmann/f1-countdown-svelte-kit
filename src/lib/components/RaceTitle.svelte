<script>
    import { beforeUpdate } from "svelte";

    export let nextEvents;

    const parseName = (name) => {
        if (!name.includes("Grand Prix")) {
            return name + " Grand Prix"
        } else {
            return name
        }
    }

    let eventName, sessionNames;

    beforeUpdate(() => {
        sessionNames = Object.keys(nextEvents[0]['sessions']).join(', ');
        eventName = parseName(nextEvents[0]['name']);
    })
</script>

<style>
    .race-title {
        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .event-name {
        font-size: 48px;
        font-weight: bold;
        margin-inline: 15px;
    }

    @media only screen and (max-width: 768px) {
        .event-name {
            font-size: 32px;
            font-weight: bold;
            margin-inline: 15px;
        }
    }
</style>

<div class="race-title" data-nosnippet>
    <span class="event-name">{eventName}</span>
</div>