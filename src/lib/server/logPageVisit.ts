import prisma from "$lib/prisma";
import { Visibility, type Analytics } from "@prisma/client";

export default async function logPageVisit(comp_id: number): Promise<Analytics>
{
    const analytics = await prisma.analytics.update({
        where: {
            competitionId: comp_id,
            competition: {
                visibility: {
                    not: Visibility.PRIVATE
                }
            }
        },
        data: {
            visits: {
                increment: 1
            }
        }
    });

    // Add milestone every 10th visit to track visits over time
    if (!(analytics.visits % 10))
    {
        await prisma.visitsMilestone.create({
            data: {
                competitionId: comp_id,
                visits: analytics.visits,
                timestamp: new Date()
            }
        });
    }

    return analytics;
}