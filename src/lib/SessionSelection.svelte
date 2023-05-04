<script>
    export let nextEventSessions;
    export let currentSession;

    let innerWidth = 0;
</script>

<style>
    .session-selection {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        margin: 30px 0;
    }

    button {
        font-family: inherit;
        font-weight: bold;
        font-size: 1.1rem;
        color: var(--secondary-text-color);
        cursor: pointer;
        background: var(--button-inactive-color);
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        transition: background 0.2s ease;
    }

    button:hover {
        background: var(--button-hover-color);
        color: var(--main-text-color);
    }

    button.selected {
        background: var(--button-active-color);
        color: var(--main-text-color);
    }
</style>

<svelte:window bind:innerWidth />
<div class="session-selection" data-nosnippet>
    {#each nextEventSessions as session}
        <button class="{currentSession === session['uuid'] ? 'selected' : ''}" on:click={() => currentSession = session['uuid']}>
            {#if innerWidth >= 768}
                {session['shortName']}
            {:else}
                {session['shortCode']}
            {/if}
        </button>
    {/each}
</div>
