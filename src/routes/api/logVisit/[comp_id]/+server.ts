import { validateId } from "$lib/server/competition.validateId";
import logPageVisit from "$lib/server/logPageVisit";
import { json, type RequestHandler } from "@sveltejs/kit";

export const PUT: RequestHandler = async ({ params }) =>
{
    const comp_id = validateId(params.comp_id);
    return json(logPageVisit(comp_id));
}