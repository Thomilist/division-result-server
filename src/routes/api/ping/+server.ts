import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { lookupCompetitionByRequest } from "$lib/server/competition.lookup";
import { DivisionContent } from "$lib/server/enums";

export const GET: RequestHandler = async ({ request }) =>
{
    const competition = await lookupCompetitionByRequest(request, DivisionContent.LIGHT, true);
    return json(competition);
}