<script lang="ts">
    import CompetitionList from '$lib/CompetitionList.svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData;
</script>

<style lang="scss">
    @import '../styles/fonts.scss';
    @import '../styles/base.scss';
</style>

<svelte:head>
    <title>Live Division Results</title>
</svelte:head>

<div class="base">
    {#if data.competitions_today.length > 0}
        <CompetitionList comps={data.competitions_today} today={true}/>
    {/if}

    {#if data.competitions.length > 0}
        <CompetitionList comps={data.competitions} today={false}/>
    {:else if data.competitions_today.length <= 0}
        <p>No competitions to show :/</p>
    {/if}
</div>

