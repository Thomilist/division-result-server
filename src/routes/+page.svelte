<script lang="ts">
    import CompetitionList from '$lib/CompetitionList.svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData;
</script>

<svelte:head>
    <title>Live Division Results</title>
</svelte:head>

<h1>Live Division Results</h1>

{#if data.competitions_today.length > 0}

<h2>Live Today</h2>

<CompetitionList comps={data.competitions_today} today={true}/>

{/if}

{#if data.competitions.length > 0}

<h2>All Competitions</h2>

<CompetitionList comps={data.competitions} today={false}/>

{:else if data.competitions_today.length <= 0}

<p>No competitions to show :/</p>

{/if}

