<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Competition } from '@prisma/client'
    
    export let comps: Competition[];
    export let today: boolean;

    const header = today ? "Live Today" : "All Competitions";
</script>

<style lang="scss">
    @import '../styles/base.scss';
    @import '../styles/link-table.scss';
</style>

<div class="header">
    <h1>{header}</h1>
</div>

<table class="link-table">
    <tr class="header">
        {#if !today}<th class="date">Date</th>{/if}
        <th class="name">Name</th>
        <th class="org">Organiser</th>
    </tr>
    {#each comps as comp}
    <tr class="content">
        {#if !today}<td>{#if comp.date}<a href="/competition/{comp.id}">{comp.date}</a>{/if}</td>{/if}
        <td><a href="/competition/{comp.id}">{comp.name}</a></td>
        <td>{#if comp.organiser}<a href="/competition/{comp.id}">{comp.organiser}</a>{/if}</td>
    </tr>
    {/each}
</table>