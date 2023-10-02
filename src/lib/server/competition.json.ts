export interface PayloadJson
{
    metadata: string | null | undefined;
    results: ResultJson[] | null | undefined
}

export interface MetadataJson
{
    competition: {
        competition_id: number | null | undefined;
        password: string | null | undefined;
        competition_name: string | null | undefined;
        organiser: string | null | undefined;
        competition_date: string | null | undefined;
        time_zone_iana: string | null | undefined;
        date_time_string: string | null | undefined;
        visibility: string | null | undefined;
        liveresults_id: number | null | undefined;
    } | null | undefined,
    divisions: DivisionMetadataJson[] | null | undefined;
}

export interface DivisionMetadataJson
{
    division_id: number | null | undefined;
    division_name: string | null | undefined;
}

export interface ResultJson
{
    division_id: number | null | undefined;
    html: string | null | undefined;
}