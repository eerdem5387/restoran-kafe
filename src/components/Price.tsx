import { formatPrice } from "@/lib/types";

/** Renders a TRY price with an Arial ₺ symbol for legibility. */
export function Price({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const formatted = formatPrice(value);
  const parts = formatted.split("₺");

  if (parts.length === 1) {
    return <span className={className}>{formatted}</span>;
  }

  return (
    <span className={className}>
      {parts[0]}
      <span className="currency-try">₺</span>
      {parts.slice(1).join("₺")}
    </span>
  );
}
