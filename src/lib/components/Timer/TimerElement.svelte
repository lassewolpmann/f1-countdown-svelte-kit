<script>
    import { beforeUpdate } from "svelte";

    export let timeValue;
    export let timeValuePct;
    export let timeUnit;
    export let strokeColor;

    let innerWidth = 0;
    let diameter, strokeWidth, radius, dashArray;
    let timerEl, svgEl, countdownCircleEl, fillCircleEl;

    beforeUpdate(() => {
        if (innerWidth >= 769) {
            diameter = 270;
            strokeWidth = 12;
        } else {
            diameter = 135;
            strokeWidth = 6;
        }

        radius = diameter / 2 - (strokeWidth / 2);
        dashArray =  2 * Math.PI * radius;

        radius += 'px';
        diameter += 'px';
        strokeWidth += 'px';

        if (timerEl && svgEl && countdownCircleEl && fillCircleEl) {
            timerEl.style.width = diameter;
            timerEl.style.height = diameter;

            svgEl.style.stroke = strokeColor;
            svgEl.style.width = diameter;
            svgEl.style.height = diameter;

            countdownCircleEl.style.strokeWidth = strokeWidth;
            countdownCircleEl.style.strokeDasharray = dashArray;
            countdownCircleEl.style.strokeDashoffset = dashArray - dashArray * timeValuePct;
            countdownCircleEl.setAttribute('r', radius)

            fillCircleEl.style.strokeWidth = strokeWidth;
            fillCircleEl.setAttribute('r', radius)
        }
    })
</script>

<style>
    .timer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .time {
        font-weight: 600;
        font-size: 60px;
    }

    .text {
        color: var(--secondary-text-color);
        font-size: 20px;
    }

    svg {
        position: absolute;
    }

    svg > .countdown-circle {
        fill: transparent;
        stroke-linecap: round;
        transform: rotate(270deg);
        transform-origin: center;
        transition: stroke-dashoffset 0.5s ease-in-out;
    }

    svg > .fill-circle {
        fill: transparent;
        opacity: 0.2;
    }

    @media only screen and (max-width: 768px) {
        .time {
            font-size: 36px;
        }

        .text {
            font-size: 16px;
        }
    }
</style>

<svelte:window bind:innerWidth />
<div class="timer" bind:this={timerEl} data-nosnippet>
    <svg bind:this={svgEl}>
        <circle
                bind:this={countdownCircleEl}
                class="countdown-circle"
                cx="50%"
                cy="50%"
                r="0"
        />
        <circle
                bind:this={fillCircleEl}
                class="fill-circle"
                cx="50%"
                cy="50%"
                r="0"
        />
    </svg>
    <span class="time">{timeValue}</span>
    <span class="text">{timeUnit}</span>
</div>