<script lang="ts">
    import Competition from '$lib/Competition.svelte';
	import { Visibility } from '@prisma/client';
    import type { PageData } from './$types';

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const is_visible: boolean =
    (
        data.comp != null
        &&
        (
            data.comp.visibility === Visibility.PUBLIC
            ||
            data.comp.visibility === Visibility.HIDDEN
        )
    );
</script>

<style>
    @import '../../../styles/base.css';
</style>

<div class="base">
    {#if is_visible}
        {#if data.comp != null}
            <Competition comp={data.comp}/>
        {/if}
    {:else}
        <div class="error">
            <p class="frown">:(</p>
            <p>Der er ikke noget at se her</p>
        </div>
    {/if}
</div>