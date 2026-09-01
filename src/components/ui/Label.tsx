import { clsx } from "clsx";
import type { ReactNode } from "react";

/** Une clé sur la fiche: mono, chassée, capitales. */
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
 * Marque la surface comme antérieure au lancement.
 *
 * Le plateau affiché est une saison simulée, pas une lecture de chaîne. Sans
 * cette étiquette, une carte pleine de guildes affirme une activité qui
 * n'existe pas encore — c'est elle qui tient la promesse du site.
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
      Avant-lancement
    </span>
  );
}
