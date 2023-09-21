<script lang="ts">
	import type { Division } from "@prisma/client";
	import { onDestroy, onMount } from "svelte";

    export let div: Division;
    export let active_id: number;

    let division: Division = div;
    let lastChanged: Date;
    let timer: NodeJS.Timeout;

    async function fetchData()
    {
        let res = await fetch(`/api/fetch/updatedAt/${division.competitionId}/${division.divisionId}`);
        const updatedAt: Date = await res.json();

        if (updatedAt > lastChanged || lastChanged == undefined)
        {
            lastChanged = updatedAt;
            res = await fetch(`/api/fetch/${division.competitionId}/${division.divisionId}`);
            division = await res.json();

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

<div class="division-result">
    {@html division.resultsHtml}
</div>

{/if}

{/if}