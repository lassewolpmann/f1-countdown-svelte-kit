<script>
    import { page } from '$app/stores';
</script>

<style>
    .error {
        margin: 50px;
        text-align: center;
    }

    .error > img {
        margin-top: 50px;
        width: min(90vw, 500px);
        height: auto;
    }

    .error > h2 > span {
        color: red;
    }
</style>

<div class="error">
    <h1>Whoops, something has gone wrong!</h1>
    {#if $page.error}
        <h2><span>Error message: </span>{$page.error.message}</h2>
    {/if}
    <img src="https://e0.365dm.com/15/11/2048x1152/mclaren-sunbathing-alonso-seat-sunbath-fernando_3376727.jpg" alt="Sit back and relax">
    <h3>Until we resolve the issue, just sit back and relax.</h3>
</div>