<script>
    import { onMount } from "svelte";
    let rainDrop;

    onMount(() => {
        const randTop = Math.random() * 10;
        const randLeft = Math.random() * 100;
        const randAnimationDelay = Math.random();

        if (rainDrop) {
            rainDrop.style.top = `${randTop}%`;
            rainDrop.style.left = `${randLeft}%`;
            rainDrop.style.animationDuration = `${randAnimationDelay}s`;

            setTimeout(() => {
                rainDrop.style.visibility = 'visible';
            }, 250);
        }
    })
</script>
<style>
    .raindrop {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;

        width: 2px;
        height: 30px;
        background: linear-gradient(to bottom, rgba(85, 104, 135, 0.5), rgba(67, 79, 99, 0.5));

        animation-name: rainDropFalling;
        animation-iteration-count: infinite;

        visibility: hidden;
    }

    @keyframes rainDropFalling {
        0% {
            transform: translateY(0vh);
            opacity: 0;
        } 10% {
            opacity: 1;
        } 75% {
            opacity: 0;
        } to {
            transform: translateY(100vh);
        }
    }
</style>
<div class="raindrop" bind:this={rainDrop}></div>