export type TZOption = { id: string; label: string };

export const POPULAR_ZONES: TZOption[] = [
  { id: "Asia/Manila", label: "Philippines — Asia/Manila (UTC+08)" },
  { id: "Australia/Brisbane", label: "AEST — Australia/Brisbane (no DST)" },
  { id: "Australia/Sydney", label: "Sydney — Australia/Sydney (AEST/AEDT)" },
  { id: "Asia/Singapore", label: "Singapore — Asia/Singapore (UTC+08)" },
  { id: "Asia/Tokyo", label: "Japan — Asia/Tokyo (UTC+09)" },
  { id: "Asia/Hong_Kong", label: "Hong Kong — Asia/Hong_Kong (UTC+08)" },
  { id: "Asia/Kolkata", label: "India — Asia/Kolkata (UTC+05:30)" },
  { id: "Europe/London", label: "UK — Europe/London (GMT/BST)" },
  { id: "Europe/Berlin", label: "Central Europe — Europe/Berlin (CET/CEST)" },
  { id: "America/New_York", label: "US Eastern — America/New_York (ET)" },
  { id: "America/Chicago", label: "US Central — America/Chicago (CT)" },
  { id: "America/Denver", label: "US Mountain — America/Denver (MT)" },
  { id: "America/Los_Angeles", label: "US Pacific — America/Los_Angeles (PT)" },
  { id: "Pacific/Auckland", label: "New Zealand — Pacific/Auckland (NZ)" },
  { id: "UTC", label: "UTC" },
];
