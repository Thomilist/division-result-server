<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import DivisionResult from "./DivisionResult.svelte";
	import type { CompetitionWithDivisions } from "./prisma";
	import { DateTime } from "luxon";

    interface Props {
        comp: CompetitionWithDivisions;
    }

    let { comp }: Props = $props();

    let competition: CompetitionWithDivisions = $state(comp);
    let competition_name: string = $state("");
    let contains_name: boolean;
    let contains_date: boolean = $state(false);
    let selected_division_id: number = $state(0);
    let contains_divisions: boolean = $state(false);
    let liveresults_url: string = $state("");
    let contains_liveresults_id: boolean = $state(false);

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
            competition_name = "Konkurrence uden navn";
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

    let last_changed: DateTime;
    let timer: NodeJS.Timeout;

    async function fetchData()
    {
        let res = await fetch(`/api/fetch/updatedAt/${competition.id}`);
        const updated_at_json = await res.json();
        const updated_at = DateTime.fromISO(updated_at_json);

        if (updated_at > last_changed || last_changed == undefined)
        {
            last_changed = updated_at;
            res = await fetch(`/api/fetch/competition/${competition.id}`);
            competition = await res.json();
            updateToggleStates();

            if (selected_division_id === 0)
            {
                selectInitialDivision();
            }

            console.log("Competition data updated");
        }
    }

    function logVisit()
    {
        fetch(`/api/logVisit/${competition.id}`, {method: "PUT"});
    }

    onMount(() =>
    {
        timer = setInterval(async () => {fetchData();}, 30000);
        logVisit();
    });

    onDestroy(() =>
    {
        clearInterval(timer);
    });
</script>

<style>
    @import '../styles/comp-header.css';
</style>

<svelte:head>
    <title>{competition_name} - Live Divisionsresultater</title>
</svelte:head>



{#if contains_date}
    <h2 class="comp-date">
        {competition.date}
    </h2>
    {/if}

    <h1 class="comp-name">
    {competition_name}
    </h1>

    {#if (contains_divisions || contains_liveresults_id)}
    <div class="panel">
        <table>
            <tbody>
                {#if (contains_divisions)}
                    <tr>
                        <td>
                            <div class="division-selector">
                                <fieldset>
                                    <legend>Vælg division:</legend>
                    
                                    {#each competition.divisions as division}
                                        {#if division.name}
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
                                        {/if}
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
                                <a target="_blank" href={liveresults_url}>Se på Liveresults</a>
                            </div>
                        </td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
    {/if}

    {#if contains_divisions}
    {#each competition.divisions as division}
        <DivisionResult div={division} active_id={selected_division_id} overview_only={false}/>
    {/each}
    {/if}

    {#if (!contains_divisions && !contains_liveresults_id)}
    <div class="error">
        <p class="frown">:(</p>
        <p>Ingen resultater i denne konkurrence (endnu)</p>
    </div>
{/if}