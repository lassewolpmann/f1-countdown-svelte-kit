<script>
    export let currentSeries;
    export let data;

    let innerWidth = 0;
    let f1Text, f2Text, f3Text;

    $: if (innerWidth >= 768) {
        f1Text = 'Formula 1';
        f2Text = 'Formula 2';
        f3Text = 'Formula 3';
    } else {
        f1Text = 'F1';
        f2Text = 'F2';
        f3Text = 'F3';
    }

    function checkDisabled(series) {
        const nextEvent = data[series]['nextEvent']
        console.log(nextEvent)
        return nextEvent['sessions'].length === 0
    }
</script>

<style>
    .series-selection {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 15px 15px 0 15px;
    }

    button {
        margin: 10px 10px 0 10px;
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
    }

    button.selected {
        color: white;
        box-shadow: inset 0 -3px red;
    }

    button:disabled {
        cursor: not-allowed;
    }

    button:disabled:hover {
        color: grey;
    }
</style>

<svelte:window bind:innerWidth />
<div class="series-selection">
    <button disabled="{checkDisabled('F1')}" class="{currentSeries === 'F1' ? 'selected' : ''}" on:click={() => currentSeries = 'F1'}>{f1Text}</button>
    <button disabled="{checkDisabled('F2')}" class="{currentSeries === 'F2' ? 'selected' : ''}" on:click={() => currentSeries = 'F2'}>{f2Text}</button>
    <button disabled="{checkDisabled('F3')}" class="{currentSeries === 'F3' ? 'selected' : ''}" on:click={() => currentSeries = 'F3'}>{f3Text}</button>
</div>