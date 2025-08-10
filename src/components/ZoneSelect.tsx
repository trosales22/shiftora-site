import { TZOption } from "data/timezones";

type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: TZOption[];
  id?: string;
};

export default function ZoneSelect({ label, value, onChange, options, id }: Props) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={id}
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((z) => (
          <option key={z.id} value={z.id}>
            {z.label}
          </option>
        ))}
      </select>
    </div>
  );
}
