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

{#if is_visible}
    {#if data.comp != null}
        <Competition comp={data.comp}/>
    {/if}
{:else}
    <p>There is nothing here :/</p>
{/if}