import type { PayloadJson } from "$lib/server/competition.json";
import { lookupCompetitionById, lookupCompetitionByRequest } from "$lib/server/competition.lookup";
import updateMetadata from "$lib/server/competition.updateMetadata";
import updateResults from "$lib/server/competition.updateResults";
import { DivisionContent } from "$lib/server/enums";
import { HTTP_Error_No_Payload } from "$lib/server/http.errors";
import { json, type RequestHandler } from "@sveltejs/kit";

export const PUT: RequestHandler = async ({ request }) =>
{
    const competition = await lookupCompetitionByRequest(request, DivisionContent.LIGHT, true);

    if (request.body === null)
    {
        throw HTTP_Error_No_Payload;
    }

    const payload: PayloadJson = await request.json();
    await updateMetadata(competition, payload);
    await updateResults(competition, payload);
    
    const updated_competition = await lookupCompetitionById(competition.id, DivisionContent.LIGHT, true);
    return json(updated_competition);
}