<script>
    export let timestamp;

    function getDate(timestamp) {
        const d = new Date(timestamp);

        return d.toDateString() + ', ' + d.toLocaleTimeString()
    }
</script>

<style>
    .time {
        color: #aaa;
        text-align: center;
        font-size: 1rem;
        margin: 20px 0;
    }
</style>

<div class="time" data-nosnippet>
    {getDate(timestamp)}
</div>