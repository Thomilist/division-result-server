import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type CompetitionWithDivisions = Prisma.CompetitionGetPayload<{
    include: {
        divisions: true,
        analytics: true
    }
}>;

type CompetitionWithLightDivisions = Prisma.CompetitionGetPayload<{
    include: {
        divisions: {
            select: {
                competitionId: true,
                divisionId: true,
                name: true,
                updatedAt: true
            }
        },
        analytics: true
    }
}>;

type LightDivision = Prisma.DivisionGetPayload<{
    select: {
        competitionId: true,
        divisionId: true,
        name: true,
        updatedAt: true
    }
}>;

type LightVisitsMilestone = Prisma.VisitsMilestoneGetPayload<{
    select: {
        visits: true,
        timestamp: true
    }
}>;

type AnalyticsWithLightVisitsMilestones = Prisma.AnalyticsGetPayload<{
    include: {
        visitsMilestones: {
            select: {
                visits: true,
                timestamp: true
            }
        }
    }
}>;

export default prisma;
export type { CompetitionWithDivisions };
export type { CompetitionWithLightDivisions };
export type { LightDivision };
export type { LightVisitsMilestone };
export type { AnalyticsWithLightVisitsMilestones };