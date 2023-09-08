<script lang="ts">
    import { afterUpdate } from "svelte";

    export let timeValue: number, timeValuePct: number, timeUnit: string, strokeColor: string;

    let innerWidth: number = 0;
    let svgEl: SVGSVGElement, countdownCircleEl: SVGCircleElement, fillCircleEl: SVGCircleElement;

    afterUpdate(() => {
        let diameter, strokeWidth;

        if (innerWidth >= 769) {
            diameter = 270;
            strokeWidth = 12;
        } else {
            diameter = 135;
            strokeWidth = 6;
        }

        const radius = diameter / 2 - (strokeWidth / 2);
        const dashArray =  2 * Math.PI * radius;

        const numberBeforeDecimal: number = parseInt(timeValuePct.toString());
        timeValuePct = timeValuePct > 1 ? timeValuePct - numberBeforeDecimal : timeValuePct

        svgEl.style.stroke = strokeColor;

        countdownCircleEl.style.strokeDasharray = dashArray.toString();
        countdownCircleEl.style.strokeDashoffset = (dashArray - dashArray * timeValuePct).toString();
        countdownCircleEl.setAttribute('r', `${radius}px`)

        fillCircleEl.setAttribute('r', `${radius}px`)
    })
</script>

<style>
    .timer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 270px;
        height: 270px;
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

        width: 270px;
        height: 270px;
    }

    svg > circle {
        fill: transparent;
        stroke-width: 12px;
    }

    svg > .countdown-circle {
        stroke-linecap: round;
        transform: rotate(270deg);
        transform-origin: center;
        transition: stroke-dashoffset 0.5s ease-in-out;
    }

    svg > .fill-circle {
        opacity: 0.2;
    }

    @media only screen and (max-width: 768px) {
        .timer {
            width: 135px;
            height: 135px;
        }

        svg {
            width: 135px;
            height: 135px;
        }

        svg > circle {
            stroke-width: 6px;
        }

        .time {
            font-size: 36px;
        }

        .text {
            font-size: 16px;
        }
    }
</style>

<svelte:window bind:innerWidth />
<div class="timer" data-nosnippet>
    <svg bind:this={svgEl}>
        <circle
                bind:this={countdownCircleEl}
                class="countdown-circle"
                cx="50%"
                cy="50%"
                r="135px"
        />
        <circle
                bind:this={fillCircleEl}
                class="fill-circle"
                cx="50%"
                cy="50%"
                r="135px"
        />
    </svg>
    <span class="time">{timeValue}</span>
    <span class="text">{timeUnit}</span>
</div>