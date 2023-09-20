import prisma, { type CompetitionWithLightDivisions } from "$lib/prisma";
import type { MetadataJson } from "./competition.json";
import { sanitiseMetadata } from "./sanitiseHtml";

export default async function updateDivisionList(competition: CompetitionWithLightDivisions, metadata: MetadataJson)
{
    // Modify database to match the new division list

    if (metadata.divisions == null)
    {
        return;
    }

    let current_division_ids = new Set<number>();

    competition.divisions.forEach((division) =>
    {
        current_division_ids.add(division.divisionId);
    });

    let new_division_ids = new Set<number>();

    metadata.divisions.forEach((division) =>
    {
        if (division.division_id != null)
        {
            new_division_ids.add(division.division_id);
        }
    });

    // Intersection: divisions_to_remove contains element from current_division_ids that are not present in new_division_ids
    const divisions_to_remove = new Set<number>([...current_division_ids].filter(x => !new_division_ids.has(x)));
    
    // Remove divisions that are not present in the new division list
    if (divisions_to_remove.size > 0)
    {
        await prisma.division.deleteMany({
            where: {
                competitionId: competition.id,
                divisionId: {
                    in: Array.from(divisions_to_remove.values())
                }
            }
        });
    }

    // Intersection: divisions_to_add contains element from new_division_ids that are not present in current_division_ids
    const divisions_to_add = new Set<number>([...new_division_ids].filter(x => !current_division_ids.has(x)));
    
    // Add divisions with IDs included in the new set but not in the current set
    const add_division_promises = Array.from(divisions_to_add).map(async division_id =>
    {
        return await prisma.division.create({
            data: {
                competitionId: competition.id,
                divisionId: division_id
            }
        });
    });

    await Promise.all(add_division_promises);

    // Update division names
    const update_division_promises = metadata.divisions.map(async division =>
    {
        if (division.division_id != null && division.division_name != null)
        {
            return await prisma.division.update({
                where: {
                    competitionId_divisionId: {
                        competitionId: competition.id,
                        divisionId: division.division_id
                    }
                },
                data: {
                    name: sanitiseMetadata(division.division_name)
                }
            });
        }
    });

    await Promise.all(update_division_promises);
    return;
}