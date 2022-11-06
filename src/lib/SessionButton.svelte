<script>
    export let session
    export let currentSession
</script>

<style>
    span {
        margin-inline: 20px;
        cursor: pointer;
    }

    span:hover {
        color: #ff8989;
    }

    span.selected {
        color: red;
    }
</style>

<span class={currentSession === session.name ? 'selected' : ''} data-nosnippet>
        {#if session.name === 'FirstPractice'}
                FP1
        {:else if session.name === 'SecondPractice'}
                FP2
        {:else if session.name === 'ThirdPractice'}
                FP3
        {:else}
                {session.name}
        {/if}
</span>