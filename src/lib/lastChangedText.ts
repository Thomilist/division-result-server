import type { DateTime } from "luxon";

export default function lastChangedText(last_changed_time: DateTime): string
{
    if (!last_changed_time)
    {
        return "ukendt";
    }

    const difference = last_changed_time.toRelative({ locale: 'da' });
    
    if (difference)
    {
        return difference;
    }

    return "ukendt";
}