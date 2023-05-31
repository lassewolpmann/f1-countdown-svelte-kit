<script lang="ts">
    export let seriesList;
    export let currentSeries;

    let currentSeriesIndex = 0;
    let seriesContentEl;

    const calculateOffset = (currentSeriesIndex) => {
        const childNodes = seriesContentEl.childNodes;

        let firstNode = childNodes[0];
        let currentNode = childNodes[currentSeriesIndex];
        let lastNode = childNodes[childNodes.length - 1];

        let offsetLeft = currentNode.getBoundingClientRect().left - firstNode.getBoundingClientRect().left;
        let offsetRight = lastNode.getBoundingClientRect().left - currentNode.getBoundingClientRect().left;

        let offset = (offsetRight - offsetLeft) / 2;

        seriesContentEl.style.transform = `translateX(${offset}px)`;
    }

    const decreaseSeriesIndex = () => {
        if (currentSeriesIndex > 0) {
            currentSeriesIndex--;
            currentSeries = seriesList[currentSeriesIndex];
        }
    }

    const increaseSeriesIndex = () => {
        if (currentSeriesIndex < seriesList.length - 1) {
            currentSeriesIndex++;
            currentSeries = seriesList[currentSeriesIndex];
        }
    }

    $: if (seriesContentEl) {
        calculateOffset(currentSeriesIndex);
    }
</script>
<style>
    .series-selection {
        margin-top: 20px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-size: 30px;

        position: relative;
        overflow: hidden;
    }

    .all-series {
        text-align: center;
        transition: transform 0.3s ease;
    }

    .series-selection:after {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        content: "";
        background-image: linear-gradient(90deg, #111 25%, transparent 50%, #111 75%);
    }

    button {
        font-family: inherit;
        font-weight: bold;
        font-size: 1.2rem;
        color: var(--secondary-text-color);
        cursor: pointer;
        background: var(--button-inactive-color);
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        transition: background 0.2s ease;

        z-index: 1;
    }

    button:hover {
        background: var(--button-hover-color);
        color: var(--main-text-color);
    }

    .selected {
        color: var(--main-text-color) !important;
        font-weight: bold;
    }

    .series {
        margin: 0 10px;
        color: var(--secondary-text-color);
    }
</style>
<div class="series-selection">
    <button on:click={decreaseSeriesIndex}><i class="fa-solid fa-arrow-left"></i></button>
    <div class="all-series" bind:this={seriesContentEl}>
        {#each seriesList as series}
            <span class="series {series === currentSeries ? 'selected' : ''}">{series.toUpperCase()}</span>
        {/each}
    </div>
    <button on:click={increaseSeriesIndex}><i class="fa-solid fa-arrow-right"></i></button>
</div>