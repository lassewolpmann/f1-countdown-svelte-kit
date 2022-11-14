<script>
    export let timeValue;
    export let timeValuePct;
    export let timeUnit;
    export let strokeColor;

    let innerWidth = 0;
    let diameter, strokeWidth, radius, dashArray;

    $: if (innerWidth >= 768) {
        diameter = 270;
        strokeWidth = 12;
        radius = diameter / 2 - 6;
    } else {
        diameter = 135;
        strokeWidth = 6;
        radius = diameter / 2 - 3;
    }

    $: dashArray =  2 * Math.PI * radius;
</script>

<style>
    .timer {
        margin: 10px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: var(--diameter);
        height: var(--diameter);
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
        width: var(--diameter);
        height: var(--diameter);
        position: absolute;
        stroke: var(--color);
    }

    svg > .countdown-circle {
        fill: transparent;
        stroke-width: var(--strokeWidth);
        stroke-dasharray: var(--dashArray);
        stroke-dashoffset: var(--dashOffset);
        stroke-linecap: round;
        transform: rotate(-90deg);
        transform-origin: center;
        transition: stroke-dashoffset 0.5s ease-in-out;
    }

    svg > .fill-circle {
        fill: transparent;
        stroke-width: var(--strokeWidth);
        opacity: 0.2;
    }

    @media only screen and (max-width: 768px) {
        .time {
            font-size: 2.3rem;
        }

        .text {
            font-size: 1rem;
        }
    }
</style>

<svelte:window bind:innerWidth />
<div class="timer" style="--color: {strokeColor}; --diameter: {diameter}px" data-nosnippet>
    <svg style="--dashArray: {dashArray}">
        <circle
                class="countdown-circle"
                cx="50%"
                cy="50%"
                r="{radius}px"
                style="--dashOffset: {dashArray - dashArray * timeValuePct}; --strokeWidth: {strokeWidth}px"
        />
        <circle
                class="fill-circle"
                cx="50%"
                cy="50%"
                r="{radius}px"
                style="--dashOffset: {dashArray - dashArray * timeValuePct}; --strokeWidth: {strokeWidth}px"
        />
    </svg>
    <span class="time">{timeValue}</span>
    <span class="text">{timeUnit}</span>
</div>