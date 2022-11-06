<script>
    export let data;
</script>

<style>
    .race-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
    }

    .race-name {
        font-weight: 600;
        font-size: 3rem;
        text-align: center;
    }

    .circuit-name {
        color: gray;
        font-size: 1.5rem;
    }
</style>

<svelte:head>
    <meta name="description" content="Countdown to the {data['season']} Formula 1 {data['raceName']} at {data['Circuit']['circuitName']}">
</svelte:head>
<div class="race-title" data-nosnippet>
    <span class="race-name">{data['raceName']}</span>
    <span class="circuit-name">{data['Circuit']['circuitName']}</span>
</div>