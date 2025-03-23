<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<style>
    @import '../styles/nav-bar.css';
</style>

<div class="nav-bar">
    <nav class="nav-bar">
        <ul class="base">
            <li><a class="nav-item" href="/">Live Divisionsresultater</a></li>
            <li><a class="nav-item" href="/about">Om</a></li>
        </ul>
    </nav>
</div>

{@render children?.()}