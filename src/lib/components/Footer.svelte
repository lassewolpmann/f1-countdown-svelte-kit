<style>
    footer {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: row;

        padding: 50px;
        gap: 50px;
    }

    .fa-heart {
        color: red;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    h4 {
        font-weight: 600;
    }

    @media only screen and (max-width: 768px) {
        footer {
            flex-direction: column;
            gap: 10px;
        }
    }
</style>

<footer>
    <div>
        <h4>Made with <i class="fa-solid fa-heart"></i><br>by Lasse Wolpmann</h4>
    </div>
    <div>
        <h4>Project links</h4>
        <a href="https://github.com/lassewolpmann/f1-countdown-svelte-kit" target="_blank">
            <i class="fa-brands fa-github"></i> Code
        </a>
        <a href="https://github.com/lassewolpmann/f1-countdown-svelte-kit/blob/main/LICENSE.md" target="_blank">
            <i class="fa-solid fa-scale-balanced"></i> License
        </a>
        <a href="mailto:lasse@f1-countdown.com">
            <i class="fa-solid fa-envelope"></i> Feedback
        </a>
    </div>
    <div>
        <h4>Session data</h4>
        <a href="https://github.com/sportstimes/f1" target="_blank">
            <i class="fa-brands fa-github"></i> sportstimes
        </a>
        <a href="https://github.com/sportstimes/f1/blob/main/LICENSE" target="_blank">
            <i class="fa-solid fa-scale-balanced"></i> License
        </a>
    </div>
</footer>
