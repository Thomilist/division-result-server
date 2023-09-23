import { HTTP_Error_Malformed_Competition_ID } from "./http.errors";

export function validateId(comp_id_string: string | undefined): number
{
    if (comp_id_string == undefined)
    {
        throw HTTP_Error_Malformed_Competition_ID;
    }
    
    const comp_id: number = parseInt(comp_id_string);

    if (Number.isNaN(comp_id))
    {
        throw HTTP_Error_Malformed_Competition_ID;
    }

    return comp_id;
}