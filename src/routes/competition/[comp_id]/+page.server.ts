import type { PageServerLoad } from './$types';
import { lookupCompetitionById } from "$lib/server/competition.lookup";
import { DivisionContent } from "$lib/server/enums";

export const load: PageServerLoad = async ({ params }) =>
{
	if (Number.isNaN(parseInt(params.comp_id)))
	{
		return { comp: null };
	}

	return {
		comp: lookupCompetitionById(parseInt(params.comp_id), DivisionContent.FULL, false)
	};
};