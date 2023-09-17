<script lang="ts">

</script>
<style lang="scss">
    .donation-button {
        position: absolute;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: flex-end;

        a {
            margin: 10px;
            font-weight: bold;
            font-size: 16px;
            color: var(--secondary-text-color);
            cursor: pointer;
            background: var(--button-inactive-color);
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            transition: background 0.2s ease;

            text-decoration: none;
        }
    }

    @media only screen and (max-width: 768px) {
        .donation-button {
            display: none;
        }
    }
</style>
<div class="donation-button">
    <a href="https://www.buymeacoffee.com/f1countdowncom/membership" target="_blank">Support this project</a>
    <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="f1countdowncom" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
</div>
