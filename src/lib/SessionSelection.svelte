<script>
    export let nextEventSessionNames;
    export let currentSessionIndex;

    $: {
        if (currentSessionIndex > nextEventSessionNames.length - 1) {
            currentSessionIndex = nextEventSessionNames.length - 1;
        }
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
