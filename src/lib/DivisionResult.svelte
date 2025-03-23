<script lang="ts">
	import type { Division } from "@prisma/client";
	import { onDestroy, onMount } from "svelte";
	import lastChangedText from "./lastChangedText";
	import { DateTime } from "luxon";

    interface Props {
        div: Division;
        active_id: number;
        overview_only: boolean;
    }

    let { div, active_id, overview_only }: Props = $props();

    let division: Division = $state(div);
    let last_changed: DateTime;
    let last_changed_text: string = $state(lastChangedText(DateTime.fromJSDate(div.updatedAt)));
    let update_timer: NodeJS.Timeout;
    let last_changed_timer: NodeJS.Timeout;

    async function fetchData()
    {
        let res = await fetch(`/api/fetch/updatedAt/${division.competitionId}/${division.divisionId}`);
        const updated_at_json = await res.json();
        const updated_at = DateTime.fromISO(updated_at_json);

        if (updated_at > last_changed || last_changed == undefined)
        {
            last_changed = updated_at;
            res = await fetch(`/api/fetch/competition/${division.competitionId}/${division.divisionId}`);
            division = await res.json();

            console.log("Division data updated");
        }
    }

    onMount(() =>
    {
        update_timer = setInterval(async () => {fetchData();}, 10000);
        last_changed_timer = setInterval(async () => {last_changed_text = lastChangedText(last_changed);}, 500);
        fetchData();
    });

    onDestroy(() =>
    {
        clearInterval(update_timer);
        clearInterval(last_changed_timer);
    });
</script>

<style>
    @import '../styles/division-result.css';
</style>

{#if (division.divisionId == active_id)}

    {#if division.resultsHtml}

        <p class="last-changed">
            Sidst ændret: {last_changed_text}
        </p>

        <div class="division-result" data-overview-only={overview_only}>
            {@html division.resultsHtml}
        </div>

    {:else}

        <div class="error">
            <p class="frown">:(</p>
            <p>Ingen resultater i denne division (endnu)</p>
        </div>

    {/if}

{/if}
