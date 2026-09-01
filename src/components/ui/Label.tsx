import { clsx } from "clsx";
import type { ReactNode } from "react";

/** A key on the sheet: mono, tracked out, uppercase. */
export function Label({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={clsx("type-label text-chalk-muted", className)}>
      {children}
    </span>
  );
}

/**
 * Marks the surface as pre-launch.
 *
 * The board shown is a simulated season, not a chain read. Without this tag, a
 * map full of guilds asserts activity that has not happened yet — this label is
 * what keeps the page honest.
 */
export function PreviewTag({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "type-label inline-flex items-center gap-1.5 border border-ember/40 bg-ember/10 px-2 py-1 text-ember",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 bg-ember" />
      Pre-launch
    </span>
  );
}
