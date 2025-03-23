<script lang="ts">
    import { page } from '$app/state';
</script>

<style lang="scss">
    @import '../styles/base.scss';
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