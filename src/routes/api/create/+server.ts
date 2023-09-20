import prisma from "$lib/prisma";
import { LDR_Password } from "$lib/server/headerfields";
import { HTTP_Error_No_Password } from "$lib/server/http.errors";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) =>
{
    const password_header = request.headers.get(LDR_Password);

    if (password_header === null)
    {
        throw HTTP_Error_No_Password;
    }

    const competition = await prisma.competition.create({
        data: {
            password: password_header
        }
    });
    
    return json(competition, {status: 201});
}