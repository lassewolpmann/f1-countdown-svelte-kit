<script>
    export let timestamp;

    function getDate(timestamp) {
        const d = new Date(timestamp);

        return d.toDateString() + ', ' + d.toLocaleTimeString()
    }
</script>

<style>
    .time {
        text-align: center;
        color: grey;
    }
</style>

<div class="time" data-nosnippet>{getDate(timestamp)}</div>