<script>
    export let timeValue;
    export let timeValuePct;
    export let timeUnit;
    export let strokeColor;
</script>

<style>
    .timer {
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 270px;
        height: 270px;
        font-size: 2rem;
    }

    .time {
        font-weight: bold;
    }

    .text {
        color: grey;
    }

    svg {
        width: 270px;
        height: 270px;
        position: absolute;
        stroke: var(--color);
    }

    svg > circle {
        fill: transparent;
        stroke-width: 10px;
        stroke-dasharray: calc(2 * 3.14 * 125); /* 2*pi*r */
        stroke-dashoffset: calc((2 * 3.14 * 125) - (2 * 3.14 * 125) * var(--perc));
        stroke-linecap: round;
        transform: rotate(-90deg);
        transform-origin: center;
        transition: stroke-dashoffset 0.5s ease-in-out;
    }
</style>

<div class="timer">
    <svg style="--color: {strokeColor}">
        <circle cx="50%" cy="50%" r="125" style="--perc: {timeValuePct}"/>
    </svg>
    <span class="time">{timeValue}</span>
    <span class="text">{timeUnit}</span>
</div>