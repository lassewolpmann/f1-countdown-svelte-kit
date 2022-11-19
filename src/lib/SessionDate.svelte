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
        background: rgba(36, 36, 36);
        padding: 15px 50px;
        border: none;
        border-radius: 5px;
        color: gray;
        font-size: 0.9rem;
        margin: 20px 0;
    }
</style>

<div class="time" data-nosnippet>
    {getDate(timestamp)}
</div>