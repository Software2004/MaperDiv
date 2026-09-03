import { ICONS } from "./icon-data";

/* Single stroke icon set — currentColor, 24px grid.
   Icon paths and brand marks live in ./icon-data. */
export function Icon({ name, size = 22, stroke = 1.75, fill = false, style, className }) {
  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth={fill ? 0 : stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d={d} />
    </svg>
  );
}
