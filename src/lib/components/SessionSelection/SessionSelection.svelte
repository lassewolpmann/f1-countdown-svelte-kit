<script>
    import SessionButton from "$lib/components/SessionSelection/SessionButton.svelte";

    export let nextEventSessions;
    export let currentSessionIndex;
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
    {#each Object.keys(nextEventSessions) as sessionName, sessionIndex}
        <SessionButton
            sessionName={sessionName}
            bind:currentSessionIndex={currentSessionIndex}
            sessionIndex={sessionIndex}
            nextEventSessions={nextEventSessions}
        />
    {/each}
</div>
