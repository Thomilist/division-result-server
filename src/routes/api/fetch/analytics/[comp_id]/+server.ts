import prisma from "$lib/prisma";
import { validateId } from "$lib/server/competition.validateId";
import { HTTP_Error_Competition_Not_Found } from "$lib/server/http.errors";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) =>
{
    const comp_id = validateId(params.comp_id);

    const analytics = await prisma.analytics.findUnique({
        where: {
            competitionId: comp_id
        },
        include: {
            visitsMilestones: {
                select: {
                    visits: true,
                    timestamp: true
                }
            }
        }
    });

    if (analytics == null)
    {
        HTTP_Error_Competition_Not_Found(comp_id.toString());
    }

    return json(analytics);
}