import prisma from '$lib/prisma';
import { Visibility, type Competition } from "@prisma/client";
import type { PageServerLoad } from './$types';
import { DateTime, Interval } from 'luxon';

export const load: PageServerLoad = async () =>
{
    const competitions: Competition[] = await prisma.competition.findMany({
        where: {
            name: { not: "" },
            organiser: { not: "" },
            dateTime: { not: null },
            visibility: Visibility.PUBLIC
        },
        orderBy: {
            dateTime: "desc"
        },
        include: {
            divisions: true
        }
    });

    const now = DateTime.utc();
    const competitions_today = competitions.filter((comp) =>
    {
        if (!comp.dateTime)
        {
            return false;
        }

        const comp_start = DateTime.fromJSDate(comp.dateTime);
        const comp_end = comp_start.plus({ days: 1 });
        const comp_interval = Interval.fromDateTimes(comp_start, comp_end);

        return comp_interval.contains(now);
    });

    return { competitions, competitions_today };
};