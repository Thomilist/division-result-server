import { error } from "@sveltejs/kit";
import { LDR_Competition_ID, LDR_Password } from "./headerfields";

export function HTTP_Error_No_Competition_ID(): never
{
    error(400, `The request must include an ${LDR_Competition_ID} header with the competition ID`);
}
export function HTTP_Error_No_Password(): never
{
    error(400, `The request must include an ${LDR_Password} header with the password`);
}
export function HTTP_Error_Competition_Not_Found(competition_id: string): never
{
    error(404, `No competition exists with ID ${competition_id}`);
}
export function HTTP_Error_Division_Not_Found(competition_id: string, division_id: string): never
{
    error(404, `No division with ID ${division_id} exists with in competition with ID ${competition_id}`);
}
export function HTTP_Error_No_Division_Results(competition_id: string, division_id: string): never
{
    error(404, `No results in division with ID ${division_id} in competition with ID ${competition_id}`);
}
export function HTTP_Error_Incorrect_Password(competition_id: string): never
{
    error(401, `A competition with ID ${competition_id} exists, but the provided password is incorrect`);
}
export function HTTP_Error_No_Payload(): never
{
    error(400, "No body attached");
}
export function HTTP_Error_No_Metadata(): never
{
    error(400, "Malformed body: No metadata found");
}
export function HTTP_Error_No_Results(): never
{
    error(400, "Malformed body: No results found");
}
export function HTTP_Error_Malformed_Metadata(): never
{
    error(400, "Failed to parse competition metadata");
}
export function HTTP_Error_Malformed_Results(): never
{
    error(400, "Failed to parse results");
}
export function HTTP_Error_Mismatched_Divisions(): never
{
    error(400, "The division IDs in the competition metadata and the results are not the same");
}
export function HTTP_Error_Private_Competition(competition_id: string): never
{
    error(403, `A competition with ID ${competition_id} exists, but it is private`);
}
export function HTTP_Error_Malformed_Competition_ID(): never
{
    error(400, "Competition and division IDs must be numeric");
}