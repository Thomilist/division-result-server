<script lang="ts">
    import { page } from '$app/state';
</script>

<style>
    @import '../styles/base.css';
</style>

<div class="base">
    <div class="error">
        <p class="frown">
            :(
        </p>
        
        <h1>
            {page.status}
        </h1>
        
        <p>
            {page.error?.message}
        </p>
    </div>
</div>