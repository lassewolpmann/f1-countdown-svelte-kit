<script>
    export let session
</script>

<span data-nosnippet>
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