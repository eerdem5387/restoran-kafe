"use client";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  activeLabel?: string;
  inactiveLabel?: string;
};

export function Switch({
  checked,
  onChange,
  label,
  activeLabel = "Aktif",
  inactiveLabel = "Pasif",
}: SwitchProps) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-4 rounded border border-outline-variant/40 px-3 py-2">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
          {label}
        </p>
        <p className={`text-sm ${checked ? "text-primary" : "text-on-surface-variant"}`}>
          {checked ? activeLabel : inactiveLabel}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label}: ${checked ? activeLabel : inactiveLabel}`}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary-container" : "bg-outline-variant"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
