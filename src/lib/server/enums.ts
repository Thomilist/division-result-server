import { Visibility } from "@prisma/client";

export enum DivisionContent
{
    LIGHT = "LIGHT",
    FULL = "FULL"
}

export const DivisionContentFromString = new Map
([
    ["LIGHT", DivisionContent.LIGHT],
    ["FULL", DivisionContent.FULL]
])

export const VisibilityFromString = new Map<string, Visibility>
([
    ["PUBLIC", Visibility.PUBLIC],
    ["HIDDEN", Visibility.HIDDEN],
    ["PRIVATE", Visibility.PRIVATE],
])