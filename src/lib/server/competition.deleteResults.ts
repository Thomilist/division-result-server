import type { CompetitionWithLightDivisions } from "$lib/prisma";
import prisma from "$lib/prisma";

export default async function deleteResults(competition: CompetitionWithLightDivisions)
{
    const delete_results_promises = competition.divisions.map(async division =>
        {
            if (division.divisionId == null)
            {
                return;
            }
    
            return await prisma.division.update({
                where: {
                    competitionId_divisionId: {
                        competitionId: competition.id,
                        divisionId: division.divisionId
                    }
                },
                data: {
                    resultsHtml: ""
                }
            });
        });
    
        await Promise.all(delete_results_promises);
    return;
}