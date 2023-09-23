import prisma from "$lib/prisma";
import { validateId } from "$lib/server/competition.validateId";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) =>
{
    const comp_id = validateId(params.comp_id);

    const analytics = await prisma.analytics.findUnique({
        where: {
            competitionId: comp_id
        }
    });

    return json(analytics);
}