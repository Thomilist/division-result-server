import deleteResults from "$lib/server/competition.deleteResults";
import { lookupCompetitionById, lookupCompetitionByRequest } from "$lib/server/competition.lookup";
import { DivisionContent } from "$lib/server/enums";
import { json, type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ request }) =>
{
    const competition = await lookupCompetitionByRequest(request, DivisionContent.LIGHT, true);
    await deleteResults(competition);
    const updated_competition = await lookupCompetitionById(competition.id, DivisionContent.LIGHT, true);
    return json(updated_competition);
}