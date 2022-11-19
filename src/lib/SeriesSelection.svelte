<script>
    export let currentSeries;

    let innerWidth = 0;
    let f1Text, f2Text, f3Text

    $: if (innerWidth >= 768) {
        f1Text = 'Formula 1';
        f2Text = 'Formula 2';
        f3Text = 'Formula 3';
    } else {
        f1Text = 'F1';
        f2Text = 'F2';
        f3Text = 'F3';
    }
</script>

<style>
    .series-selection {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 15px;
    }

    button {
        margin: 10px;
        font-family: 'Poppins', sans-serif;
        font-size: 1.1rem;
        color: grey;
        cursor: pointer;
        background: #111;
        padding: 10px 15px;
        border: none;
        transition: all 0.2s ease;
    }

    button:hover {
        color: white;
        box-shadow: 0 2px red;
    }

    button.selected {
        color: white;
        box-shadow: 0 5px red;
    }
</style>

<svelte:window bind:innerWidth />
<div class="series-selection">
    <button class="{currentSeries === 'F1' ? 'selected' : ''}" on:click={() => currentSeries = 'F1'}>{f1Text}</button>
    <button class="{currentSeries === 'F2' ? 'selected' : ''}" on:click={() => currentSeries = 'F2'}>{f2Text}</button>
    <button class="{currentSeries === 'F3' ? 'selected' : ''}" on:click={() => currentSeries = 'F3'}>{f3Text}</button>
</div>