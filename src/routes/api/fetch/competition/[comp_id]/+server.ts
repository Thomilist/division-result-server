import { lookupCompetitionById } from "$lib/server/competition.lookup";
import { validateId } from "$lib/server/competition.validateId";
import { DivisionContent } from "$lib/server/enums";
import { HTTP_Error_Competition_Not_Found, HTTP_Error_Private_Competition } from "$lib/server/http.errors";
import { Visibility } from "@prisma/client";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) =>
{
    const comp_id = validateId(params.comp_id);
    const competition = await lookupCompetitionById(comp_id, DivisionContent.LIGHT, false);

    if (competition == null)
    {
        HTTP_Error_Competition_Not_Found(comp_id.toString());
    }

    if (competition.visibility === Visibility.PRIVATE)
    {
        HTTP_Error_Private_Competition(comp_id.toString());
    }

    return json(competition);
}