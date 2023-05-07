<style>
    a {
        color: inherit;
        text-decoration: inherit;
        transition: color 0.2s ease;
    }

    a:hover {
        color: var(--button-hover-color);
    }

    .fa-heart {
        color: red;
    }

    .fa-github {
        padding-bottom: 5px;
    }

    .github, .copyright, .author {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    @media only screen and (max-width: 600px) {
        .github, .copyright, .author {
            font-size: 0.6rem;
        }
    }
</style>

<div class="author">
    <span>Made with <i class="fa-solid fa-heart"></i></span>
    <span>by Lasse Wolpmann</span>
</div>
<div class="github">
    <a href="https://github.com/lassewolpmann/f1-countdown-svelte-kit" target="_blank"><i class="fa-brands fa-github"></i> Project</a>
    <a href="https://github.com/lassewolpmann/f1-countdown-svelte-kit/issues" target="_blank"><i class="fa-brands fa-github"></i> Issues</a>
</div>
<div class="copyright">
    Data provided by <a href="https://github.com/sportstimes/f1" target="_blank"><i class="fa-brands fa-github"></i> sportstimes</a>
    <a href="https://github.com/sportstimes/f1/blob/main/LICENSE" target="_blank"><i class="fa-solid fa-scale-balanced"></i> License</a>
</div>