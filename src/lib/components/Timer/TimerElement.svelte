<script>
    export let timeValue;
    export let timeValuePct;
    export let timeUnit;
    export let strokeColor;

    let innerWidth = 0;
    let diameter, strokeWidth, radius, dashArray;

    $: {
        if (innerWidth >= 768) {
            diameter = 270;
            strokeWidth = 12;
        } else {
            diameter = 125;
            strokeWidth = 6;
        }

        radius = diameter / 2 - (strokeWidth / 2);
    }

    // 2*pi*r = circumference of circle
    $: dashArray =  2 * Math.PI * radius;

    let timerEl, svgEl, countdownCircleEl, fillCircleEl;
    $: {
        // Make sure all elements exist
        if (timerEl && svgEl && countdownCircleEl && fillCircleEl) {
            diameter += 'px';
            strokeWidth += 'px';

            timerEl.style.width = diameter;
            timerEl.style.height = diameter;

            svgEl.style.stroke = strokeColor;
            svgEl.style.width = diameter;
            svgEl.style.height = diameter;

            countdownCircleEl.style.strokeWidth = strokeWidth;
            countdownCircleEl.style.strokeDasharray = dashArray;
            countdownCircleEl.style.strokeDashoffset = dashArray - dashArray * timeValuePct;

            fillCircleEl.style.strokeWidth = strokeWidth;
        }
    }
</script>

<style>
    .timer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        z-index: 1;
    }

    .time {
        font-weight: 600;
        font-size: 3.7rem;
    }

    .text {
        color: var(--secondary-text-color);
        font-size: 1.3rem;
    }

    svg {
        position: absolute;
    }

    svg > .countdown-circle {
        fill: transparent;
        stroke-linecap: round;
        transform: rotate(-90deg);
        transform-origin: center;
        transition: stroke-dashoffset 0.5s ease-in-out;
    }

    svg > .fill-circle {
        fill: transparent;
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
<div class="timer" bind:this={timerEl} data-nosnippet>
    <svg bind:this={svgEl}>
        <circle
                class="countdown-circle"
                bind:this={countdownCircleEl}
                cx="50%"
                cy="50%"
                r="{radius}px"
        />
        <circle
                class="fill-circle"
                bind:this={fillCircleEl}
                cx="50%"
                cy="50%"
                r="{radius}px"
        />
    </svg>
    <span class="time">{timeValue}</span>
    <span class="text">{timeUnit}</span>
</div>