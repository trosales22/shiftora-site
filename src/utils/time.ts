// Format a Date in a given IANA time zone.
export function formatInZone(date: Date, timeZone: string, withSeconds = false) {
  const opts: Intl.DateTimeFormatOptions = {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" } : {}),
    hour12: false,
  };
  return new Intl.DateTimeFormat(undefined, opts).format(date);
}

// Extract Y-M-D-H-M (24h) for a Date as seen in `timeZone`.
export function partsInZone(date: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat(undefined, {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
  };
}

// Convert a wall-clock date/time in `timeZone` to a real UTC Date, no libs.
export function wallTimeToUTC(
  timeZone: string,
  year: number,
  month: number, // 1-12
  day: number,
  hour: number,
  minute: number
): Date {
  // Initial guess: treat provided wall time as if it were UTC.
  let utcTs = Date.UTC(year, month - 1, day, hour, minute);

  // Two-pass correction handles DST shifts for most cases.
  for (let i = 0; i < 2; i++) {
    const zoned = partsInZone(new Date(utcTs), timeZone);
    const desired = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const got = new Date(
      Date.UTC(zoned.year, zoned.month - 1, zoned.day, zoned.hour, zoned.minute)
    );
    const diffMin = Math.round((desired.getTime() - got.getTime()) / 60000);
    utcTs += diffMin * 60000;
  }

  return new Date(utcTs);
}

// Build initial date & time strings for inputs based on a zone.
export function nowInZoneForInputs(timeZone: string) {
  const now = new Date();
  const p = partsInZone(now, timeZone);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    date: `${p.year}-${pad(p.month)}-${pad(p.day)}`,
    time: `${pad(p.hour)}:${pad(p.minute)}`,
  };
}
