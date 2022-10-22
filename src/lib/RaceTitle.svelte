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
        font-weight: bold;
        font-size: 3rem;
        text-align: center;
    }

    .circuit-name {
        color: gray;
        font-size: 1.5rem;
    }
</style>

<div class="race-title">
    <span class="race-name">{data['raceName']}</span>
    <span class="circuit-name">{data['Circuit']['circuitName']}</span>
</div>