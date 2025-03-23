import type { PageServerLoad } from './$types';
import { lookupCompetitionById } from "$lib/server/competition.lookup";
import { DivisionContent } from "$lib/server/enums";
import { validateId } from '$lib/server/competition.validateId';

export const load: PageServerLoad = async ({ params }) =>
{
	const comp_id = validateId(params.comp_id);
	const competition = await lookupCompetitionById(comp_id, DivisionContent.FULL, false);
	return { comp: competition };
};