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
        margin-top: 30px;
    }
</style>

<div class="time">{getDate(timestamp)}</div>