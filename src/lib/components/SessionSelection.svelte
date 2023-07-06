<script>
    import { calculateOffset } from "$lib/functions/SeriesSelection.ts";
    import { afterUpdate, beforeUpdate, onMount } from "svelte";

    export let nextEventSessions, currentSessionIndex;
    let sessionListEl, sessionNames;

    const decreaseSessionIndex = () => {
        if (currentSessionIndex > 0) currentSessionIndex--;
    }

    const increaseSessionIndex = () => {
        if (currentSessionIndex < sessionNames.length - 1) currentSessionIndex++;
    }

    onMount(() => {
        currentSessionIndex = 0;
    })

    beforeUpdate(() => {
        sessionNames = Object.keys(nextEventSessions);

        if (currentSessionIndex > sessionNames.length - 1) {
            currentSessionIndex = sessionNames.length - 1;
        }
    })

    afterUpdate(() => {
        const offset = calculateOffset(currentSessionIndex, sessionListEl);
        sessionListEl.style.transform = `translateX(${offset}px)`;
    })
</script>

<style>
    .session-selection {
        margin: 10px 0;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-size: 24px;

        position: relative;
        overflow: hidden;
    }

    .all-sessions {
        transition: transform 0.3s ease;
        width: 280px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        transform: translateX(0px);
    }

    .session-selection:after {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        content: "";
        background-image: linear-gradient(90deg, #111 15%, transparent 25%, transparent 75%, #111 85%);
    }

    .session.selected {
        color: var(--main-text-color);
        font-weight: bold;
    }

    .session {
        margin: 0 10px;
        color: var(--secondary-text-color);
    }

    @media only screen and (max-width: 768px) {
        .session-selection {
            font-size: 18px;
        }

        .all-sessions {
            width: 200px;
        }
    }
</style>

<div class="session-selection" data-nosnippet>
    <button on:click={decreaseSessionIndex}><i class="fa-solid fa-arrow-left"></i></button>
    <div class="all-sessions" bind:this={sessionListEl}>
        {#if sessionNames}
            {#each sessionNames as sessionName, sessionIndex}
                <span class="session {sessionIndex === currentSessionIndex ? 'selected' : ''}">{sessionName.toUpperCase()}</span>
            {/each}
        {/if}
    </div>
    <button on:click={increaseSessionIndex}><i class="fa-solid fa-arrow-right"></i></button>
</div>
