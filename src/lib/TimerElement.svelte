<script>
    export let timeValue;
    export let timeValuePct;
    export let timeUnit;
    export let strokeColor;

    const radius = (270 / 2) - 5;
    const dashArray = 2 * Math.PI * radius;
</script>

<style>
    .timer {
        margin: 10px 20px;
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
        z-index: 1;
    }

    .text {
        color: #aaa;
        z-index: 1;
    }

    svg {
        width: 270px;
        height: 270px;
        position: absolute;
        stroke: var(--color);
    }

    svg > circle {
        fill: var(--color);
        fill-opacity: 0.075;
        stroke-width: 10px;
        stroke-dasharray: var(--dashArray);
        stroke-dashoffset: var(--dashOffset);
        stroke-linecap: round;
        transform: rotate(-90deg);
        transform-origin: center;
        transition: stroke-dashoffset 0.5s ease-in-out;
    }
</style>

<div class="timer" style="--color: {strokeColor}">
    <svg style="--dashArray: {dashArray}">
        <circle cx="50%" cy="50%" r="calc(50% - 5px)" style="--dashOffset: {dashArray - dashArray * timeValuePct}" />
    </svg>
    <span class="time">{timeValue}</span>
    <span class="text">{timeUnit}</span>
</div>