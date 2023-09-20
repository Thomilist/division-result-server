import prisma from "$lib/prisma";
import { lookupCompetitionById } from "$lib/server/competition.lookup";
import { DivisionContent } from "$lib/server/enums";
import { HTTP_Error_Competition_Not_Found, HTTP_Error_Division_Not_Found, HTTP_Error_Private_Competition } from "$lib/server/http.errors";
import { Visibility } from "@prisma/client";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) =>
{
    if (params.comp_id == undefined || params.div_id == undefined)
    {
        throw error(404);
    }
    
    const comp_id: number = parseInt(params.comp_id);
    const div_id: number = parseInt(params.div_id);
    
    const competition = await lookupCompetitionById(comp_id, DivisionContent.LIGHT, false);

    if (competition == null)
    {
        throw HTTP_Error_Competition_Not_Found(params.comp_id);
    }

    if (competition.visibility === Visibility.PRIVATE)
    {
        throw HTTP_Error_Private_Competition;
    }

    const division = await prisma.division.findUnique({
        where: {
            competitionId_divisionId: {
                competitionId: comp_id,
                divisionId: div_id
            }
        }
    });

    if (division == null)
    {
        throw HTTP_Error_Division_Not_Found;
    }

    return json(division);
}