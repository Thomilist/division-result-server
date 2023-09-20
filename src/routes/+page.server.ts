import prisma from '$lib/prisma';
import { Visibility, type Competition } from "@prisma/client";
import type { PageServerLoad } from './$types';
import { format } from 'date-fns';

export const load: PageServerLoad = async () =>
{
  const competitions: Competition[] = await prisma.competition.findMany({
    where: {
      name: { not: "" },
      organiser: { not: null },
      visibility: Visibility.PUBLIC
    },
    orderBy: {
      date: "desc"
    },
    include: {
      divisions: true
    }
  });

  const competitions_today: Competition[] = await prisma.competition.findMany({
    where: {
      name: { not: "" },
      organiser: { not: null },
      visibility: Visibility.PUBLIC,
      date: today()
    },
    orderBy: {
      date: "desc"
    },
    include: {
      divisions: true
    }
  });
  
  return { competitions, competitions_today };
};

function today(): string
{
  return format(new Date(), 'yyyy-MM-dd');
}