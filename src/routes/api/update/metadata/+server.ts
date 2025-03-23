import prisma from "$lib/prisma";
import type { PayloadJson } from "$lib/server/competition.json";
import { lookupCompetitionById, lookupCompetitionByRequest } from "$lib/server/competition.lookup";
import updateMetadata from "$lib/server/competition.updateMetadata";
import { DivisionContent } from "$lib/server/enums";
import { HTTP_Error_No_Payload } from "$lib/server/http.errors";
import { json, type RequestHandler } from "@sveltejs/kit";

export const PUT: RequestHandler = async ({ request }) =>
{
    const competition = await lookupCompetitionByRequest(request, DivisionContent.LIGHT, true);

    if (request.body === null)
    {
        HTTP_Error_No_Payload();
    }

    const payload: PayloadJson = await request.json();
    await updateMetadata(competition, payload);

    await prisma.analytics.update({
        where: {
            competitionId: competition.id
        },
        data: {
            metadataUpdates: {
                increment: 1
            }
        }
    });

    const updated_competition = await lookupCompetitionById(competition.id, DivisionContent.LIGHT, true);
    return json(updated_competition);
}