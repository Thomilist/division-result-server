<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import DivisionResult from "./DivisionResult.svelte";
	import type { CompetitionWithDivisions } from "./prisma";

    export let comp: CompetitionWithDivisions;

    let competition: CompetitionWithDivisions = comp;
    let competition_name: string;
    let contains_name: boolean;
    let contains_date: boolean;
    let selected_division_id: number = 0;
    let contains_divisions: boolean;
    let liveresults_url: string;
    let contains_liveresults_id: boolean;

    function selectInitialDivision()
    {
        if (contains_divisions)
        {
            selected_division_id = competition.divisions[0].divisionId;
        }
    }

    function updateToggleStates()
    {
        contains_name = ((competition.name != null) && (competition.name.length > 0));

        if (contains_name && competition.name != null)
        {
            competition_name = competition.name;
        }
        else
        {
            competition_name = "Unnamed Competition";
        }

        contains_date = ((competition.date != null) && (competition.date.length > 0));
        
        contains_divisions = (competition.divisions.length > 0);
        
        contains_liveresults_id = ((competition.liveresultsId != null) && (competition.liveresultsId > 0));

        if (contains_liveresults_id)
        {
            liveresults_url = `https://liveresultat.orientering.se/followfull.php?comp=${competition.liveresultsId}&lang=en`;
        }

        return;
    }

    updateToggleStates();
    selectInitialDivision();

    let lastChanged: Date;
    let timer: NodeJS.Timeout;

    async function fetchData()
    {
        let res = await fetch(`/api/fetch/updatedAt/${competition.id}`);
        const updatedAt: Date = await res.json();

        if (updatedAt > lastChanged || lastChanged == undefined)
        {
            lastChanged = updatedAt;
            res = await fetch(`/api/fetch/${competition.id}`);
            competition = await res.json();
            updateToggleStates();

            if (selected_division_id === 0)
            {
                selectInitialDivision();
            }

            console.log("Competition data updated");
        }
    }

    onMount(() =>
    {
        timer = setInterval(async () => {fetchData();}, 10000);
        fetchData();
    });

    onDestroy(() =>
    {
        clearInterval(timer);
    });
</script>

<style lang="scss">
    @import '../styles/base.scss';
    @import '../styles/comp-header.scss';
    //@import '../styles/debug.scss';
</style>

<svelte:head>
    <title>{competition_name} - Live Division Results</title>
</svelte:head>

<h1>
    {competition_name} {#if contains_date}[{competition.date}]{/if}
</h1>

{#if (contains_divisions || contains_liveresults_id)}
    <div class="panel">
        <table>
            {#if (contains_divisions)}
                <tr>
                    <td>
                        <div class="division-selector">
                            <fieldset>
                                <legend>Select division:</legend>
                
                                {#each competition.divisions as division}
                                    <div>
                                        <label>
                                            <input
                                            type="radio"
                                            name={division.name}
                                            value={division.divisionId}
                                            bind:group={selected_division_id}
                                        />
                                            {division.name}
                                        </label>
                                    </div>
                                {/each}
                            </fieldset>
                        </div>
                    </td>
                </tr>
            {/if}

            {#if contains_liveresults_id}
                <tr>
                    <td>
                        <div class="liveresults">
                            <a target="_blank" href={liveresults_url}>View on Liveresults</a>
                        </div>
                    </td>
                </tr>
            {/if}
        </table>
    </div>
{/if}

{#if contains_divisions}
    {#each competition.divisions as division}
        <DivisionResult div={division} active_id={selected_division_id}/>
    {/each}
{/if}

{#if (!contains_divisions && !contains_liveresults_id)}
    <p>
        No results in this competition :/
    </p>
{/if}