import prisma from "$lib/prisma";
import type { Competition } from "@prisma/client";
import type { MetadataJson } from "./competition.json";

export default async function updateDateTime(competition: Competition, metadata: MetadataJson)
{
    if (metadata.competition == null || metadata.competition.date_time_string == null)
    {
        return;
    }

    const date_time_value = Date.parse(metadata.competition.date_time_string);

    if (Number.isNaN(date_time_value))
    {
        return;
    }

    const date_time = new Date(date_time_value);

    await prisma.competition.update({
        where: {
            id: competition.id
        },
        data: {
            dateTime: date_time
        }
    });

    return;
}