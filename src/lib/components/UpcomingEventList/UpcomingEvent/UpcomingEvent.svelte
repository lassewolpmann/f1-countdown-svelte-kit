<script lang="ts">
    // Type imports
    import type { DataConfig, RaceData } from "$lib/types/RaceData";

    // Component imports
    import Body from "$lib/components/UpcomingEventList/UpcomingEvent/SessionBody.svelte";


    interface Props {
        event: RaceData;
    }

    let { event }: Props = $props();

    let scrollEl: HTMLElement | undefined = $state();
    let scrollbarEl: HTMLElement | undefined = $state();
    let nippleEl: HTMLElement | undefined = $state();

    let scrollOffsetWidth = $state(0);
    let nippleWidth = $state(0);

    let isMouseDown = $state(false);

    let initialMousePos = $state(0);
    let initialNipplePos = $state(0);

    let currentAriaValue = $state(0);

    $effect(() => {
        if (!scrollEl || !scrollbarEl || !nippleEl) return

        let scrollElementScrollWidth = scrollEl.scrollWidth
        let scrollElementVisibleWidth = scrollOffsetWidth

        let widthRatio = scrollElementVisibleWidth / scrollElementScrollWidth

        if (widthRatio === 1) {
            scrollbarEl.style.display = "none";
        } else {
            scrollbarEl.style.display = "block";
        }

        nippleWidth = Math.floor(scrollElementVisibleWidth * widthRatio)
        nippleEl.style.width = nippleWidth + "px";
    })

    const changeNipplePosition = () => {
        if (!nippleEl || !scrollEl) return

        let scrollableWidth = scrollEl.scrollWidth - scrollOffsetWidth
        let nippleOffsetRatio = scrollEl.scrollLeft / scrollableWidth
        let nippleOffset = nippleOffsetRatio * (scrollOffsetWidth - nippleWidth)

        nippleEl.style.left = `${nippleOffset}px`

        if (nippleOffset <= 0) {
            currentAriaValue = 0
        } else if (nippleOffset >= scrollOffsetWidth - nippleWidth) {
            currentAriaValue = scrollOffsetWidth - nippleWidth
        } else {
            currentAriaValue = nippleOffset
        }

        currentAriaValue = Math.floor(currentAriaValue)
    }

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault()

        if (!nippleEl || !scrollEl) return
        isMouseDown = true
        initialMousePos = e.clientX
        initialNipplePos = nippleEl.offsetLeft
    }

    const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        if (!nippleEl || !scrollEl || !isMouseDown) return

        let nippleOffset = initialNipplePos + (e.clientX - initialMousePos)

        if (nippleOffset <= 0) {
            nippleOffset = 0
        } else if (nippleOffset >= scrollOffsetWidth - nippleWidth) {
            nippleOffset = scrollOffsetWidth - nippleWidth
        }

        nippleEl.style.left = `${nippleOffset}px`

        let nippleOffsetRatio = nippleOffset / (scrollOffsetWidth - nippleWidth)
        let scrollableWidth = scrollEl.scrollWidth - scrollOffsetWidth
        scrollEl.scrollLeft = scrollableWidth * nippleOffsetRatio
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (!scrollEl) return
        let scrollableWidth = scrollEl.scrollWidth - scrollOffsetWidth
        if (e.code === "ArrowLeft") {
            scrollEl.scrollLeft -= scrollableWidth * 0.2
        } else if (e.code === "ArrowRight") {
            scrollEl.scrollLeft += scrollableWidth * 0.2
        }
    }
</script>

<svelte:window on:mouseup={() => isMouseDown = false} on:mousemove={handleMouseMove}></svelte:window>
<div class="flex flex-col gap-2">
    <span class="font-semibold text-base lg:text-xl bg-neutral-900 rounded-xl px-5 py-2.5">{event.flag} {event.name}</span>
    <div bind:offsetWidth={scrollOffsetWidth} bind:this={scrollEl} class="flex-row-justify-start justify-start overflow-x-auto gap-2 no-scrollbar" onscroll={changeNipplePosition} id="sessions-{event.slug}">
        {#each event.prettySessions as session}
            <div class="flex-col-start gap-1 px-5 py-2.5 bg-neutral-800 rounded-xl w-full">
                <span class="font-semibold w-max">{session.longName}</span>
                <Body {session} />
            </div>
        {/each}
    </div>
    <div class="relative w-full h-1 overflow-hidden rounded-xl cursor-grab" onmousedown={handleMouseDown} onkeydown={handleKeyPress} bind:this={scrollbarEl} role="scrollbar" aria-controls="sessions-{event.slug}" aria-valuemin=0 aria-valuemax={scrollOffsetWidth - nippleWidth} aria-valuenow={currentAriaValue} tabindex="0">
        <div class="background absolute w-full h-full bg-neutral-900 rounded-xl"></div>
        <div bind:this={nippleEl} class="absolute h-full bg-neutral-500 rounded-xl"></div>
    </div>
</div>
