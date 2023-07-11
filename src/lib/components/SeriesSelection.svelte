<script>
    import { calculateOffset } from "$lib/functions/SeriesSelection.ts";
    import { afterUpdate } from "svelte";
    import { currentSeries } from "$lib/stores/currentSeries.ts";
    import va from '@vercel/analytics';

    export let seriesList;

    let currentSeriesIndex = 0, seriesListEl;

    const decreaseSeriesIndex = () => {
        if (currentSeriesIndex > 0) {
            va.track('Series changed');
            currentSeriesIndex--;
            currentSeries.set(seriesList[currentSeriesIndex]);
        }
    }

    const increaseSeriesIndex = () => {
        if (currentSeriesIndex < seriesList.length - 1) {
            va.track('Series changed');
            currentSeriesIndex++;
            currentSeries.set(seriesList[currentSeriesIndex]);
        }
    }

    afterUpdate(() => {
        const offset = calculateOffset(currentSeriesIndex, seriesListEl);
        seriesListEl.style.transform = `translateX(${offset}px)`;
    })
</script>
<style>
    .series-selection {
        margin: 20px 0;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-size: 30px;

        position: relative;
        overflow: hidden;
    }

    .all-series {
        transition: transform 0.3s ease;
        width: 150px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
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

    .series.selected {
        color: var(--main-text-color);
        font-weight: bold;
    }

    .series {
        margin: 0 10px;
        color: var(--secondary-text-color);
    }

    @media only screen and (max-width: 768px) {
        .series-selection {
            font-size: 24px;
        }
    }
</style>
<div class="series-selection">
    <button on:click={decreaseSeriesIndex}><i class="fa-solid fa-arrow-left"></i></button>
    <div class="all-series" bind:this={seriesListEl}>
        {#if seriesList}
            {#each seriesList as series}
                <span class="series" class:selected={series === $currentSeries}>{series.toUpperCase()}</span>
            {/each}
        {/if}
    </div>
    <button on:click={increaseSeriesIndex}><i class="fa-solid fa-arrow-right"></i></button>
</div>