import type { CompetitionWithLightDivisions } from "$lib/prisma";
import prisma from "$lib/prisma";
import type { MetadataJson, PayloadJson } from "./competition.json";
import { HTTP_Error_Malformed_Metadata, HTTP_Error_Malformed_Results, HTTP_Error_Mismatched_Divisions, HTTP_Error_No_Metadata, HTTP_Error_No_Results } from "./http.errors";
import { Base64 } from 'js-base64';
import { sanitiseResults } from "./sanitiseHtml";

export default async function updateResults(competition: CompetitionWithLightDivisions, payload: PayloadJson)
{
    if (payload.metadata == null)
    {
        HTTP_Error_No_Metadata();
    }

    if (payload.results == null)
    {
        HTTP_Error_No_Results();
    }

    const metadata_json_string = Base64.decode(payload.metadata);
    const metadata: MetadataJson = JSON.parse(metadata_json_string);

    if (metadata.competition == null)
    {
        HTTP_Error_Malformed_Metadata();
    }

    // Verify that the division IDs listed in metadata and provided alongside results are the same
    if (metadata.divisions == null)
    {
        HTTP_Error_Malformed_Metadata();
    }

    let metadata_division_ids = new Set<number>();

    metadata.divisions.forEach((division) =>
    {
        if (division.division_id == null)
        {
            HTTP_Error_Malformed_Metadata();
        }

        metadata_division_ids.add(division.division_id);
    });

    let results_division_ids = new Set<number>();

    payload.results.forEach((result) =>
    {
        if (result.division_id == null)
        {
            HTTP_Error_Malformed_Results();
        }

        results_division_ids.add(result.division_id);
    });

    const division_ids_union = new Set<number>([...metadata_division_ids, ...results_division_ids]);

    if (division_ids_union.size !== metadata_division_ids.size)
    {
        HTTP_Error_Mismatched_Divisions();
    }

    // Actually update the results
    const update_results_promises = payload.results.map(async division =>
    {
        if (division.division_id == null || division.html == null)
        {
            return;
        }

        return await prisma.division.update({
            where: {
                competitionId_divisionId: {
                    competitionId: competition.id,
                    divisionId: division.division_id
                }
            },
            data: {
                resultsHtml: sanitiseResults(Base64.decode(division.html))
            }
        });
    });

    await Promise.all(update_results_promises);
    return;
}