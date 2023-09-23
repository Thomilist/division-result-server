import prisma from "$lib/prisma";
import type { Analytics } from "@prisma/client";

export default async function logPageVisit(comp_id: number): Promise<Analytics>
{
    // Only for migration
    const analytics = await prisma.analytics.findUnique({
        where: {
            competitionId: comp_id
        }
    });

    if (analytics == null)
    {
        await prisma.analytics.create({
            data: {
                competitionId: comp_id
            }
        });
    }
    // Migration code end
    
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