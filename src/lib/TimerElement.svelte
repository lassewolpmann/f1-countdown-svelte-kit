<script>
    export let timeValue;
    export let timeValueDeg;
    export let timeUnit;
    export let borderColor;
</script>

<style>
    .timer {
        margin: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        font-size: 2rem;
        background: conic-gradient(var(--color) var(--deg), transparent var(--deg));
    }

    .timer span.time {
        font-weight: bold;
        z-index: 2;
    }

    .timer span.text {
        color: grey;
        z-index: 2;
    }

    .timer::after {
        content: "";
        position: absolute;
        min-width: 235px;
        min-height: 235px;
        background: #111;
        border-radius: 50%;
        z-index: 1;
    }
</style>

<div class="timer" style="--color: {borderColor}; --deg: {timeValueDeg}deg">
    <span class="time">{timeValue}</span>
    <span class="text">{timeUnit}</span>
</div>