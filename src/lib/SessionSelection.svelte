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
        margin: 40px 50px 20px 50px;
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

<div class="session-selection" data-nosnippet>
    {#each nextEventSessionNames as sessionName}
        <button class="{sessionName === nextEventSessionNames[currentSessionIndex] ? 'selected' : ''}" on:click={() => currentSessionIndex = nextEventSessionNames.indexOf(sessionName)}>
            {sessionName.toUpperCase()}
        </button>
    {/each}
</div>
