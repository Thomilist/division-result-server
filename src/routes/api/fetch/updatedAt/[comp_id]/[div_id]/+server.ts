import prisma from "$lib/prisma";
import { lookupCompetitionById } from "$lib/server/competition.lookup";
import { DivisionContent } from "$lib/server/enums";
import { HTTP_Error_Competition_Not_Found, HTTP_Error_Division_Not_Found, HTTP_Error_Malformed_Metadata, HTTP_Error_Private_Competition } from "$lib/server/http.errors";
import { Visibility } from "@prisma/client";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) =>
{
    if (params.comp_id == undefined || params.div_id == undefined)
    {
        error(404);
    }
    
    const comp_id: number = parseInt(params.comp_id);
    const div_id: number = parseInt(params.div_id);

    if (Number.isNaN(comp_id) || Number.isNaN(div_id))
    {
        HTTP_Error_Malformed_Metadata();
    }
    
    const competition = await lookupCompetitionById(comp_id, DivisionContent.LIGHT, false);

    if (competition == null)
    {
        HTTP_Error_Competition_Not_Found(params.comp_id);
    }

    if (competition.visibility === Visibility.PRIVATE)
    {
        HTTP_Error_Private_Competition(comp_id.toString());
    }

    const res = await prisma.division.findUnique({
        where: {
            competitionId_divisionId: {
                competitionId: comp_id,
                divisionId: div_id
            }
        },
        select: {
            updatedAt: true
        }
    });

    if (res == null)
    {
        HTTP_Error_Division_Not_Found(comp_id.toString(), div_id.toString());
    }

    return json(res.updatedAt);
}