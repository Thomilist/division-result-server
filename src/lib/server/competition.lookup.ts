import prisma, { type CompetitionWithDivisions, type CompetitionWithLightDivisions } from "$lib/prisma";
import { LDR_Competition_ID, LDR_Password } from "./headerfields";
import { DivisionContent } from "./enums";
import { HTTP_Error_Competition_Not_Found, HTTP_Error_Incorrect_Password, HTTP_Error_No_Competition_ID, HTTP_Error_No_Password } from "./http.errors";
import { validateId } from "./competition.validateId";

export async function lookupCompetitionByRequest(request: Request, division_content: DivisionContent.FULL, include_password: boolean ): Promise<CompetitionWithDivisions>;
export async function lookupCompetitionByRequest(request: Request, division_content: DivisionContent.LIGHT, include_password: boolean ): Promise<CompetitionWithLightDivisions>;
export async function lookupCompetitionByRequest(request: Request, division_content: DivisionContent, include_password: boolean ): Promise<CompetitionWithDivisions | CompetitionWithLightDivisions>;
export async function lookupCompetitionByRequest(request: Request, division_content: DivisionContent = DivisionContent.FULL, include_password: boolean = false ): Promise<CompetitionWithDivisions | CompetitionWithLightDivisions>
{
    const competition_id_header = request.headers.get(LDR_Competition_ID);

    if (competition_id_header === null)
    {
        throw HTTP_Error_No_Competition_ID;
    }
    
    const password_header = request.headers.get(LDR_Password);

    if (password_header === null)
    {
        throw HTTP_Error_No_Password;
    }

    const comp_id = validateId(competition_id_header);
    const competition = await lookupCompetitionById(comp_id, division_content, include_password);

    if (competition === null)
    {
        throw HTTP_Error_Competition_Not_Found(competition_id_header);
    }

    if (password_header !== competition.password)
    {
        throw HTTP_Error_Incorrect_Password(competition_id_header);
    }

    return competition;
}

export async function lookupCompetitionById(competition_id: number, division_content: DivisionContent.FULL, include_password: boolean): Promise<CompetitionWithDivisions | null>;
export async function lookupCompetitionById(competition_id: number, division_content: DivisionContent.LIGHT, include_password: boolean): Promise<CompetitionWithLightDivisions | null>;
export async function lookupCompetitionById(competition_id: number, division_content: DivisionContent, include_password: boolean): Promise<CompetitionWithDivisions | CompetitionWithLightDivisions | null>
export async function lookupCompetitionById(competition_id: number, division_content: DivisionContent = DivisionContent.LIGHT, include_password: boolean = false): Promise<CompetitionWithDivisions | CompetitionWithLightDivisions | null>
{
    let competition: CompetitionWithDivisions | CompetitionWithLightDivisions | null = null;
    
    switch (division_content)
    {
        case DivisionContent.LIGHT:
        {
            competition = await prisma.competition.findUnique({
                where: {
                    id: competition_id
                },
                include: {
                    divisions: {
                        select: {
                            competitionId: true,
                            divisionId: true,
                            name: true,
                            updatedAt: true
                        },
                        orderBy: {
                            divisionId: "asc"
                        }
                    }
                }
            });
            break;
        }
        case DivisionContent.FULL:
        {
            competition = await prisma.competition.findUnique({
                where: {
                    id: competition_id
                },
                include: {
                    divisions: {
                        orderBy: {
                            divisionId: "asc"
                        }
                    }
                }
            });
            break;
        }
    }

    if (competition == null)
    {
        throw HTTP_Error_Competition_Not_Found(competition_id.toString());
    }

    if (!include_password)
    {
        competition.password = null;
    }

    return competition;
}