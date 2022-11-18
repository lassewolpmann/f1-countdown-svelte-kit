<script>
    export let nextEventSessions;
    export let currentSession;
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

<div class="session-selection" data-nosnippet>
    {#each nextEventSessions as session}
        <button class="{currentSession === session['shortCode'] ? 'selected' : ''}" on:click={() => currentSession = session['shortCode']}>
            {session['shortCode']}
        </button>
    {/each}
</div>
