import type { CompetitionWithLightDivisions } from "$lib/prisma";
import prisma from "$lib/prisma";
import type { MetadataJson, PayloadJson } from "./competition.json";
import updateDivisionList from "./competition.updateDivisionList";
import { VisibilityFromString } from "./enums";
import { HTTP_Error_Malformed_Metadata, HTTP_Error_No_Metadata } from "./http.errors";
import { Base64 } from 'js-base64';
import { sanitiseMetadata } from "./sanitiseHtml";

export default async function updateMetadata(competition: CompetitionWithLightDivisions, payload: PayloadJson)
{
    if (payload.metadata == null)
    {
        throw HTTP_Error_No_Metadata;
    }

    const metadata_json_string = Base64.decode(payload.metadata);
    const metadata: MetadataJson = JSON.parse(metadata_json_string);

    if (metadata.competition == null)
    {
        throw HTTP_Error_Malformed_Metadata;
    }

    if (metadata.competition.competition_name != null)
    {
        await prisma.competition.update({
            where: {
                id: competition.id
            },
            data: {
                name: sanitiseMetadata(metadata.competition.competition_name)
            }
        });
    }

    if (metadata.competition.organiser != null)
    {
        await prisma.competition.update({
            where: {
                id: competition.id
            },
            data: {
                organiser: sanitiseMetadata(metadata.competition.organiser)
            }
        });
    }

    if (metadata.competition.competition_date != null)
    {
        await prisma.competition.update({
            where: {
                id: competition.id
            },
            data: {
                date: sanitiseMetadata(metadata.competition.competition_date)
            }
        });
    }

    if (metadata.competition.visibility != null)
    {
        const new_visibility = VisibilityFromString.get(metadata.competition.visibility);

        if (new_visibility !== undefined)
        {
            await prisma.competition.update({
                where: {
                    id: competition.id
                },
                data: {
                    visibility: new_visibility
                }
            });
        }
    }

    if (metadata.competition.liveresults_id != null)
    {
        await prisma.competition.update({
            where: {
                id: competition.id
            },
            data: {
                liveresultsId: metadata.competition.liveresults_id
            }
        });
    }

    await updateDivisionList(competition, metadata);

    return;
}