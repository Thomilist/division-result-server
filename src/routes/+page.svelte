<script lang="ts">
    import CompetitionList from '$lib/CompetitionList.svelte';
    import type { PageServerData } from './$types';

    interface Props {
        data: PageServerData;
    }

    let { data }: Props = $props();
</script>

<style>
    @import '../styles/fonts.css';
    @import '../styles/base.css';
</style>

<svelte:head>
    <title>Live Divisionsresultater</title>
</svelte:head>

<div class="base">
    {#if data.competitions_today.length > 0}
        <CompetitionList comps={data.competitions_today} today={true}/>
    {/if}

    {#if data.competitions.length > 0}
        <CompetitionList comps={data.competitions} today={false}/>
    {:else if data.competitions_today.length <= 0}
        <div class="error">
            <p class="frown">:(</p>
            <p>Ingen konkurrencer at vise</p>
        </div>
    {/if}
</div>