<!-- @migration-task Error while migrating Svelte code: `<tr>` is invalid inside `<table>` -->
<script lang="ts">
	import type { Competition } from '@prisma/client'
    
    export let comps: Competition[];
    export let today: boolean;

    const header = today ? "Live i dag" : "Alle konkurrencer";
</script>

<style>
    @import '../styles/base.css';
    @import '../styles/link-table.css';
</style>

<div class="header">
    <h1>{header}</h1>
</div>

<table class="link-table">
    <thead>
        <tr class="header">
            {#if !today}<th class="date">Dato</th>{/if}
            <th class="name">Navn</th>
            <th class="org">Arrangør</th>
        </tr>
    </thead>
    <tbody>
        {#each comps as comp}
            <tr class="content">
                {#if !today}<td>{#if comp.date}<a href="/competition/{comp.id}">{comp.date}</a>{/if}</td>{/if}
                <td><a href="/competition/{comp.id}">{comp.name}</a></td>
                <td>{#if comp.organiser}<a href="/competition/{comp.id}">{comp.organiser}</a>{/if}</td>
            </tr>
        {/each}
    </tbody>
</table>