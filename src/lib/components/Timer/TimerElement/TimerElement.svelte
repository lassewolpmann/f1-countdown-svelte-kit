<script lang="ts">
    import { TimerElement } from "$lib/components/Timer/TimerElement/TimerElement";

    export let timeValue: number, timeValuePct: number, timeUnit: string, strokeColor: string;

    let innerWidth: number = 768;

    let timerElement: TimerElement = new TimerElement(innerWidth);
    $: timerElement = new TimerElement(innerWidth);
</script>

<style lang="scss">
    .timer, svg {
        width: 270px;
        height: 270px;
    }

    .timer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .time {
        font-weight: bold;
        font-size: 60px;
    }

    .text {
        color: var(--secondary-text-color);
        font-size: 24px;
    }

    svg {
        position: absolute;

        circle {
            fill: transparent;
        }

        .countdown-circle {
            stroke-linecap: round;
            transform: rotate(270deg);
            transform-origin: center;
            transition: stroke-dashoffset 250ms ease-in-out;
        }

        .fill-circle {
            opacity: 0.2;
        }
    }

    @media only screen and (max-width: 768px) {
        .timer, svg {
            width: 135px;
            height: 135px;
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
    <svg>
        <circle
                class="countdown-circle"
                cx="50%"
                cy="50%"
                r="{timerElement.radius}px"
                stroke="{strokeColor}"
                stroke-width="{timerElement.strokeWidth}"
                stroke-dasharray="{timerElement.dashArray}"
                stroke-dashoffset="{timerElement.dashArray - timerElement.dashArray * timeValuePct}"
        />
        <circle
                class="fill-circle"
                cx="50%"
                cy="50%"
                r="{timerElement.radius}px"
                stroke="{strokeColor}"
                stroke-width="{timerElement.strokeWidth}"
        />
    </svg>
    <span class="time">{timeValue}</span>
    <span class="text">{timeUnit}</span>
</div>