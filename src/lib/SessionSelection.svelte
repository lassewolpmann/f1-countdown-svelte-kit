<script>
    import { findCurrentSessionIndex } from "$lib/functions/findCurrentSessionIndex.ts";

    export let nextEventSessions;
    export let currentSessionIndex;

    let nextEventSessionNames;

    $: {
        nextEventSessionNames = Object.keys(nextEventSessions);
        currentSessionIndex = findCurrentSessionIndex(nextEventSessions);
    }
</script>

<style>
    .session-selection {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        margin: 20px 40px;
    }
</style>

<div class="session-selection" data-nosnippet>
    {#each nextEventSessionNames as sessionName, sessionIndex}
        <button class="{sessionName === nextEventSessionNames[currentSessionIndex] ? 'selected' : ''}" on:click={() => currentSessionIndex = sessionIndex}>
            {sessionName.toUpperCase()}
        </button>
    {/each}
</div>
