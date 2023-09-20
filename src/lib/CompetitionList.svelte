<script lang="ts">
	import type { Competition } from '@prisma/client'
    
    export let comps: Competition[];
    export let today: boolean;
</script>

<table>
    <tr>
        {#if !today}<th>Date</th>{/if}
        <th>Name</th>
        <th>Organiser</th>
    </tr>
    {#each comps as comp}
    <tr>
        {#if !today}<td>{#if comp.date}{comp.date}{/if}</td>{/if}
        <td><a href="/competition/{comp.id}">{comp.name}</a></td>
        <td>{#if comp.organiser}{comp.organiser}{/if}</td>
    </tr>
    {/each}
</table>