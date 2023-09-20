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
                },
                {
                    name: "style",
                    multiple: false,
                    values: ["text-align:center"]
                }
            ],
            "td": [
                {
                    name: "style",
                    multiple: false,
                    values: ["text-align:left", "text-align:right", "white-space:nowrap"]
                }
            ]
        },
        allowedClasses: {
            "h3": ["matchnavn"],
            "div": ["matchresultat", "page-break", "stillingContainer", "stillingHeader", "stilling", "matcher", "matchgruppe", "matchgruppeHeader", "gruppe", "gruppeHeader", "gruppepoint"],
            "table": ["matchresultat", "stilling", "matcher", "matchgruppe", "gruppe"],
            "th": ["knavn", "lnavn"],
            "td": ["knavn", "bnavn", "lnavn"]
        }
    });
}