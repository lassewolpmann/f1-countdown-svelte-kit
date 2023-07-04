<script>
    import { onDestroy, onMount } from "svelte";
    let rainDrop;
    let animationTimeout;

    onMount(() => {
        const randTop = Math.random() * 10;
        const randLeft = Math.random() * 100;
        const randAnimationDelay = Math.random() * 5;

        if (rainDrop) {
            rainDrop.style.top = `${randTop}%`;
            rainDrop.style.left = `${randLeft}%`;
            rainDrop.style.animationDelay = `${randAnimationDelay}s`;

            animationTimeout = setTimeout(() => {
                rainDrop.style.visibility = 'visible';
            }, randAnimationDelay * 1000);
        }
    })

    onDestroy(() => {
        clearTimeout(animationTimeout);
    })
</script>
<style>
    .raindrop {
        position: absolute;
        top: 0;
        left: 0;

        width: 2px;
        height: 30px;
        background: linear-gradient(to bottom, rgba(85, 104, 135, 0.5), rgba(67, 79, 99, 0.5));

        animation-name: rainDropFalling;
        animation-iteration-count: infinite;
        animation-duration: 1s;

        visibility: hidden;
    }

    @keyframes rainDropFalling {
        0% {
            top: 0;
            opacity: 0;
        } 20% {
            opacity: 1;
        } to {
            top: 100%;
            opacity: 0;
        }
    }
</style>
<div class="raindrop" bind:this={rainDrop}></div>