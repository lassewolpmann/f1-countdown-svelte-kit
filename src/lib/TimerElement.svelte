<script>
    export let timeValue;
    export let timeValuePct;
    export let timeUnit;
    export let strokeColor;

    const radius = (270 / 2) - 6;
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
        font-weight: 600;
        font-size: 3.7rem;
    }

    .text {
        color: #aaa;
        font-size: 1.3rem;
    }

    svg {
        width: 270px;
        height: 270px;
        position: absolute;
        stroke: var(--color);
    }

    svg > circle {
        fill: transparent;
        stroke-width: 12px;
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
        <circle cx="50%" cy="50%" r="calc(50% - 6px)" style="--dashOffset: {dashArray - dashArray * timeValuePct}" />
    </svg>
    <span class="time">{timeValue}</span>
    <span class="text">{timeUnit}</span>
</div>