<script>
    import { page } from '$app/stores';
</script>

<h1>We're sorry, but something has gone horribly wrong!</h1>
<h2>{$page.status}: {$page.error.message}</h2>