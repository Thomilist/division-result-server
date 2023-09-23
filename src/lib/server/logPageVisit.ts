import prisma from "$lib/prisma";
import type { Analytics } from "@prisma/client";

export default async function logPageVisit(comp_id: number): Promise<Analytics>
{
    return prisma.analytics.update({
        where: {
            competitionId: comp_id
        },
        data: {
            visits: {
                increment: 1
            }
        }
    });
}