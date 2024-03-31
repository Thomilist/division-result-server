import type { DateTime } from "luxon";

export default function lastChangedText(last_changed_time: DateTime): string
{
    if (!last_changed_time)
    {
        return "ukendt";
    }

    if (Math.abs(last_changed_time.diffNow().as('minutes')) < 1)
    {
        return "lige nu";
    }

    const difference = last_changed_time.toRelative({ locale: 'da' });
    
    if (difference)
    {
        return difference;
    }

    return "ukendt";
}