<script>
    export let data;
    const circuitName = data['Circuit']['circuitName']
    const raceName = data['raceName']
</script>

<style>
    .race-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
    <span class="race-name">{raceName}</span>
    <span class="circuit-name">{circuitName}</span>
</div>