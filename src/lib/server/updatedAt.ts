import prisma from "$lib/prisma";

export async function updatedAt(competition_id: number, division_id: number = 0): Promise<Date | null>
{
    let timestamp: Date | null = null;
    
    if (division_id === 0)
    {
        const res = await prisma.competition.findUnique({
            where: {
                id: competition_id
            },
            select: {
                updatedAt: true
            }
        });

        if (res != null)
        {
            timestamp = res.updatedAt;
        }
    }
    else
    {
        const res = await prisma.division.findUnique({
            where: {
                competitionId_divisionId: {
                    competitionId: competition_id,
                    divisionId: division_id
                }
            },
            select: {
                updatedAt: true
            }
        });

        if (res != null)
        {
            timestamp = res.updatedAt;
        }
    }

    return timestamp;
}