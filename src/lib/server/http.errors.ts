import { error, type HttpError } from "@sveltejs/kit";
import { LDR_Competition_ID, LDR_Password } from "./headerfields";

export const HTTP_Error_No_Competition_ID: HttpError = error(400, `The request must include an ${LDR_Competition_ID} header with the competition ID.`);
export const HTTP_Error_No_Password: HttpError = error(400, `The request must include an ${LDR_Password} header with the password.`);
export function HTTP_Error_Competition_Not_Found(competition_id: string): HttpError
{
    return error(404, `No competition exists with ID ${competition_id}.`);
}
export function HTTP_Error_Division_Not_Found(competition_id: string, division_id: string): HttpError
{
    return error(404, `No division with ID ${division_id} exists with in competition with ID ${competition_id}.`);
}
export function HTTP_Error_No_Division_Results(competition_id: string, division_id: string): HttpError
{
    return error(404, `No results in division with ID ${division_id} in competition with ID ${competition_id}.`);
}
export function HTTP_Error_Incorrect_Password(competition_id: string): HttpError
{
    return error(401, `A competition with ID ${competition_id} exists, but the provided password is incorrect.`);
}
export const HTTP_Error_No_Payload: HttpError = error(400, "No body attached.");
export const HTTP_Error_No_Metadata: HttpError = error(400, "Malformed body: No metadata found.");
export const HTTP_Error_No_Results: HttpError = error(400, "Malformed body: No results found.");
export const HTTP_Error_Malformed_Metadata: HttpError = error(400, "Failed to parse competition metadata.");
export const HTTP_Error_Malformed_Results: HttpError = error(400, "Failed to parse results.");
export const HTTP_Error_Mismatched_Divisions: HttpError = error(400, "The division IDs in the competition metadata and the results are not the same.");
export function HTTP_Error_Private_Competition(competition_id: string): HttpError
{
    return error(403, `A competition with ID ${competition_id} exists, but it is private.`);
}