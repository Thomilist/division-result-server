import sanitizeHtml from 'sanitize-html';

export function sanitiseMetadata(dirty_text: string): string
{
    // No HTML in metadata
    return sanitizeHtml(dirty_text, {
        allowedTags: [],
        allowedAttributes: {},
        disallowedTagsMode: "recursiveEscape"
    });
}

export function sanitiseResults(dirty_html: string): string
{
    // Whitelist HTML from Divisionsmatchberegning.exe
    return sanitizeHtml(dirty_html, {
        allowedTags: [
            "h3",
            "div",
            "table",
            "thead",
            "tr",
            "th",
            "br",
            "tbody",
            "td"
        ],
        allowedAttributes: {
            "th": [
                {
                    name: "colspan",
                    multiple: false,
                    values: ["3"]
                }
            ]
        },
        allowedClasses: {
            "h3": ["matchnavn"],
            "div": ["matchresultat", "page-break", "stillingContainer", "stillingHeader", "stilling", "matcher", "stilling0Container", "stilling0Header", "stilling0", "matcher0", "matchgruppe", "matchgruppeHeader", "gruppe", "gruppeHeader", "gruppepoint", "table-wrapper"],
            "table": ["matchresultat", "stilling", "matcher", "stilling0", "matcher0", "matchgruppe", "gruppe"],
            "th": ["knavn", "lnavn"],
            "td": ["knavn", "bnavn", "lnavn"]
        }
    });
}