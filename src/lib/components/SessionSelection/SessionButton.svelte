<script>
    import { findCurrentSessionIndex } from "$lib/functions/SessionSelection.ts";

    export let sessionName, currentSessionIndex, sessionIndex, nextEventSessions;

    let currentSessionName, sessionDate, isButtonSelected, isButtonDisabled;

    $: currentSessionIndex = findCurrentSessionIndex(nextEventSessions);
    $: currentSessionName = Object.keys(nextEventSessions)[currentSessionIndex];
    $: sessionDate = nextEventSessions[sessionName];

    const changeSessionIndex = () => currentSessionIndex = sessionIndex;

    $: isButtonSelected = sessionName === currentSessionName;
    $: isButtonDisabled = new Date().getTime() > new Date(sessionDate).getTime() ? 'disabled' : '';
</script>
<style>

</style>
<button
        disabled='{isButtonDisabled}'
        class:selected={isButtonSelected}
        on:click={changeSessionIndex}>
    {sessionName.toUpperCase()}
</button>