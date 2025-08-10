import { useEffect, useMemo, useState } from "react";
import ZoneSelect from "./ZoneSelect";
import { POPULAR_ZONES } from "data/timezones";
import { formatInZone, nowInZoneForInputs, wallTimeToUTC } from "utils/time";

// Local helper: 12-hour formatter (AM/PM) in a given zone
function formatInZone12(date: Date, timeZone: string, withSeconds = false) {
  const opts: Intl.DateTimeFormatOptions = {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" } : {}),
    hour12: true,
  };
  return new Intl.DateTimeFormat(undefined, opts).format(date);
}

export default function Converter() {
  // Defaults: From Sydney to Manila (AEST → PH)
  const [fromTz, setFromTz] = useState("Australia/Sydney");
  const [toTz, setToTz] = useState("Asia/Manila");

  const initialInputs = useMemo(() => nowInZoneForInputs(fromTz), [fromTz]);
  const [dateStr, setDateStr] = useState(initialInputs.date);
  const [timeStr, setTimeStr] = useState(initialInputs.time);

  // Keep input defaults in sync when changing source timezone
  useEffect(() => {
    const n = nowInZoneForInputs(fromTz);
    setDateStr(n.date);
    setTimeStr(n.time);
  }, [fromTz]);

  const { result12h, result24h, metaText, utcISO } = useMemo(() => {
    if (!dateStr || !timeStr)
      return { result12h: "—", result24h: "", metaText: "", utcISO: "" };

    const [y, m, d] = dateStr.split("-").map(Number);
    const [hh, mm] = timeStr.split(":").map(Number);

    const utcDate = wallTimeToUTC(fromTz, y, m, d, hh, mm);

    // Primary (12h) & Secondary (24h) in destination zone
    const twelve = formatInZone12(utcDate, toTz, true);
    const twentyFour = formatInZone(utcDate, toTz, true); // from utils (24h)

    // Offsets preview
    const shortOffset = (zone: string) => {
      const s = new Intl.DateTimeFormat(undefined, {
        timeZone: zone,
        timeZoneName: "shortOffset",
      }).format(utcDate);
      const match = s.match(/GMT[+\-]\d{1,2}(?::\d{2})?/);
      return match ? match[0] : s;
    };

    const meta = `From ${shortOffset(fromTz)} → ${shortOffset(toTz)}`;
    return {
      result12h: twelve,
      result24h: twentyFour,
      metaText: meta,
      utcISO: utcDate.toISOString(),
    };
  }, [dateStr, timeStr, fromTz, toTz]);

  const swapZones = () => {
    setFromTz((prev) => {
      const nextFrom = toTz;
      setToTz(prev);
      return nextFrom;
    });
  };

  const resetNow = () => {
    const n = nowInZoneForInputs(fromTz);
    setDateStr(n.date);
    setTimeStr(n.time);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(`${result12h} (${toTz})`);
    } catch {
      // ignore
    }
  };

  return (
    <div id="converter">
      <h2 className="text-lg font-semibold mb-4">Timezone Converter</h2>

      {/* From / To */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ZoneSelect
          id="from-tz"
          label="From"
          value={fromTz}
          onChange={setFromTz}
          options={POPULAR_ZONES}
        />
        <ZoneSelect
          id="to-tz"
          label="To"
          value={toTz}
          onChange={setToTz}
          options={POPULAR_ZONES}
        />
      </div>

      {/* Actions */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={swapZones}
          className="px-3 py-1.5 text-sm rounded-xl border border-slate-300 hover:border-slate-400"
        >
          Swap
        </button>
        <button
          onClick={resetNow}
          className="px-3 py-1.5 text-sm rounded-xl border border-slate-300 hover:border-slate-400"
        >
          Now
        </button>
      </div>

      {/* Date / Time */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Date (in source TZ)
          </label>
          <input
            type="date"
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Time (24h, in source TZ)
          </label>
          <input
            type="time"
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeStr}
            onChange={(e) => setTimeStr(e.target.value)}
          />
        </div>
      </div>

      {/* Result (12h primary) */}
      <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Converted Time
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-300 bg-white">
            {toTz}
          </span>
        </div>

        {/* 12-hour primary */}
        <div className="mt-2 text-3xl md:text-4xl font-extrabold leading-tight">
          {result12h}
        </div>

        {/* 24-hour secondary */}
        <div className="mt-1 text-sm text-slate-600">{result24h}</div>

        {/* Offsets + UTC */}
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>{metaText}</span>
          <span className="hidden sm:inline">•</span>
          <span className="truncate">UTC: {utcISO || ""}</span>
        </div>

        {/* Actions */}
        <div className="mt-3">
          <button
            onClick={copyResult}
            title="Copy 12-hour result"
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:border-slate-400"
          >
            Copy 12h
          </button>
        </div>
      </div>

      {/* Tip */}
      <p className="mt-3 text-xs text-slate-500">
        Tip: For strict AEST (no DST), use <b>Australia/Brisbane</b>. For Sydney (with DST), use{" "}
        <b>Australia/Sydney</b>.
      </p>
    </div>
  );
}
