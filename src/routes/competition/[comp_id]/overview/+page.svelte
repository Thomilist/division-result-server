<script lang="ts">
	import DivisionResult from "$lib/DivisionResult.svelte";
	import type { CompetitionWithDivisions } from "$lib/prisma";
	import { DateTime } from "luxon";
	import { onDestroy, onMount } from "svelte";
	import type { PageData } from "./$types";
	import { Visibility } from "@prisma/client";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let competition: CompetitionWithDivisions = $state(data.comp);

    let is_visible: boolean = $state(false);
    let contains_divisions: boolean = $state(false);

    let last_changed: DateTime;
    let timer: NodeJS.Timeout;

    async function fetchData()
    {
        let res = await fetch(`/api/fetch/updatedAt/${competition.id}`);
        const updated_at_json = await res.json();
        const updated_at = DateTime.fromISO(updated_at_json);

        if (updated_at > last_changed || last_changed == undefined)
        {
            last_changed = updated_at;
            res = await fetch(`/api/fetch/competition/${competition.id}`);
            competition = await res.json();
            is_visible = competition.visibility == Visibility.PUBLIC || competition.visibility == Visibility.HIDDEN;

            contains_divisions = competition.divisions && (competition.divisions.length > 0);

            console.log("Competition data updated");
        }
    }

    onMount(() =>
    {
        timer = setInterval(async () => {fetchData();}, 30000);
    });

    onDestroy(() =>
    {
        clearInterval(timer);
    });
</script>

<style>
    @import '../../../../styles/base.css';
    @import '../../../../styles/loading.css';
    @import '../../../../styles/division-overview.css';
</style>



<div class="base">
    {#await fetchData()}
        <div class="loading">
            <p>Indlæser data...</p>
        </div>
    {:then _} 
        {#if is_visible}
            <div class="division-overview">
                {#each competition.divisions as division}
                    <div class="division-overview-item">
                        <DivisionResult div={division} active_id={division.divisionId} overview_only={true}/>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="error">
                <p class="frown">:(</p>
                <p>Der er ikke noget at se her</p>
            </div>
        {/if}
    {/await}
</div>