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
        margin: 20px 0;
    }

    button {
        margin: 10px;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        font-size: 1.1rem;
        color: grey;
        cursor: pointer;
        background: #222;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        transition: all 0.2s ease;
    }

    button:hover {
        background: #444;
        color: white;
    }

    button.selected {
        background: rgb(234, 53, 19);
        color: white;
    }
</style>

<svelte:window bind:innerWidth />
<div class="session-selection" data-nosnippet>
    {#each nextEventSessions as session}
        {#if innerWidth >= 768}
            {#if session['shortCode'] !== 'Q1' && session['shortCode'] !== 'Q2' && session['shortCode'] !== 'Q3'}
                <button
                        class="{currentSession === session['uuid'] ? 'selected' : ''}"
                        on:click={() => currentSession = session['uuid']}
                >
                    {session['shortName']}
                </button>
            {/if}
        {:else}
            {#if session['shortCode'] !== 'Q1' && session['shortCode'] !== 'Q2' && session['shortCode'] !== 'Q3'}
                <button
                        class="{currentSession === session['uuid'] ? 'selected' : ''}"
                        on:click={() => currentSession = session['uuid']}
                >
                    {session['shortCode']}
                </button>
            {/if}
        {/if}
    {/each}
</div>
