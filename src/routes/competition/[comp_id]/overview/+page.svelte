<script lang="ts">
	import DivisionResult from "$lib/DivisionResult.svelte";
	import type { PageData } from "./$types";
	import { Visibility } from "@prisma/client";

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
    @import '../../../../styles/base.css';
    @import '../../../../styles/division-overview.css';
</style>



<div class="base">
    {#if is_visible}
        {#if data.comp}
            <div class="division-overview">
                {#each data.comp.divisions as division}
                    <div class="division-overview-item">
                        <DivisionResult div={division} active_id={division.divisionId} overview_only={true}/>
                    </div>
                {/each}
            </div>
        {/if}
    {:else}
        <div class="error">
            <p class="frown">:(</p>
            <p>Der er ikke noget at se her</p>
        </div>
    {/if}
</div>