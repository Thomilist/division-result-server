import type { DateTime } from "luxon";

export default function lastChangedText(last_changed_time: DateTime): string
{
    if (!last_changed_time)
    {
        return "unknown";
    }

    if (Math.abs(last_changed_time.diffNow().as('minutes')) < 1)
    {
        return "just now";
    }

    const difference = last_changed_time.toRelative({ locale: 'en' });
    
    if (difference)
    {
        return difference;
    }

    return "unknown";
}