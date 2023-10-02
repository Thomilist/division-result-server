<script lang="ts">
    import Competition from '$lib/Competition.svelte';
	import { Visibility } from '@prisma/client';
    import type { PageData } from './$types';
    export let data: PageData;

    const is_visible: boolean =
    (
        data.comp != null
        &&
        (
            data.comp.visibility === Visibility.PUBLIC
            ||
            data.comp.visibility === Visibility.HIDDEN
        ));
</script>

<style lang="scss">
    @import '../../../styles/base.scss';
</style>

<div class="base">
    {#if is_visible}
        {#if data.comp != null}
            <Competition comp={data.comp}/>
        {/if}
    {:else}
        <div class="error">
            <p class="frown">:(</p>
            <p>There is nothing here</p>
        </div>
    {/if}
</div>