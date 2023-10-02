<script lang="ts">
	import type { Division } from "@prisma/client";
	import { onDestroy, onMount } from "svelte";
	import lastChangedText from "./lastChangedText";
	import { DateTime } from "luxon";

    export let div: Division;
    export let active_id: number;

    let division: Division = div;
    let last_changed: DateTime;
    let last_changed_text: string = "loading...";
    let timer: NodeJS.Timeout;

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
            last_changed_text = lastChangedText(updated_at);

            console.log("Division data updated");
        }
    }

    onMount(() =>
    {
        timer = setInterval(async () => {fetchData();}, 30000);
        fetchData();
    });

    onDestroy(() =>
    {
        clearInterval(timer);
    });
</script>

<style lang="scss">
    @import '../styles/division-result.scss';
</style>

{#if (division.divisionId == active_id)}

    {#if division.resultsHtml}

        <p class="last-changed">
            Last changed: {last_changed_text}
        </p>
    
        <div class="division-result">
            {@html division.resultsHtml}
        </div>

    {:else}

        <div class="error">
            <p class="frown">:(</p>
            <p>No results for this division (yet)</p>
        </div>

    {/if}

{/if}