"use client";

import { useEffect } from "react";
import { Label } from "@/components/ui/Label";
import { PHASES, TICKS_PER_SEASON } from "@/lib/season";
import { siteConfig } from "@/lib/site-config";

/*
 * Les règles, en clair.
 *
 * Un jeu dont l'argument est « aucun aléatoire » doit montrer ses formules,
 * sinon l'argument ne vaut rien. Elles sont donc affichées telles qu'elles
 * seront écrites dans le contrat — racines entières comprises.
 */

const FORMULAS: { title: string; code: string; note: string }[] = [
  {
    title: "Puissance",
    code: "puissance = Σ √(mise_i)",
    note:
      "La somme des racines, pas la racine de la somme. Doubler sa mise ne double pas sa force : quatre joueurs à 250 pèsent plus qu'un joueur à 1000.",
  },
  {
    title: "Cohésion",
    code: "cohésion = 100 + 2 × min(membres actifs, 25)",
    note:
      "De 100 à 150. Une guilde qui joue à vingt-cinq frappe une fois et demie plus fort que le solitaire.",
  },
  {
    title: "Fortification",
    code: "fort = 100 + 5 × min(tick − tenu depuis, 20)",
    note:
      "De 100 à 200. Tenir un hexagone vingt ticks double sa défense. Un hexagone laissé sans défense trente ticks la perd.",
  },
  {
    title: "Taxe d'empire",
    code: "coût = mise × (100 + hexes²) / 100",
    note:
      "Attaquer avec 10 hexagones coûte le double, 20 le quintuple, 30 le décuple. Le surcoût est brûlé. Grandir se paie.",
  },
  {
    title: "Résolution",
    code: "A > D  strictement",
    note:
      "À égalité, le défenseur tient. Le vainqueur prend l'hexagone, la totalité de son trésor et 20 % de la mise adverse.",
  },
];

export function InfoOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-void/95 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Label className="text-ember">Comment ça marche</Label>
            <h2 className="type-display mt-2 text-chalk">Prendre, puis tenir</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="type-label border border-rule-strong px-3 py-2 text-chalk-muted transition-colors hover:border-chalk hover:text-chalk"
          >
            Fermer
          </button>
        </div>

        <p className="type-body mt-6 max-w-[62ch] text-chalk-soft">
          {siteConfig.wordmark} se joue par tours de huit heures. Les guildes
          misent des {siteConfig.ticker} sur les hexagones qu'elles veulent
          prendre ou garder, puis tout se résout d'un bloc. Une saison dure{" "}
          {TICKS_PER_SEASON} ticks, soit six semaines, et la cagnotte est fixe :
          elle est financée d'avance et personne n'en frappe de nouveaux.
        </p>

        {/* Le tick */}
        <h3 className="type-title mt-10 text-chalk">Le tick</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {PHASES.map((phase) => (
            <div key={phase.name} className="panel px-4 py-4">
              <Label className={phase.name === "resolution" ? "text-ember" : undefined}>
                {phase.label}
              </Label>
              <div className="type-figure-sm mt-2 text-chalk">
                {phase.seconds >= 3600
                  ? `${phase.seconds / 3600} h`
                  : `${phase.seconds / 60} min`}
              </div>
              <p className="type-data mt-2 text-chalk-muted">{phase.blurb}</p>
            </div>
          ))}
        </div>

        <p className="type-body mt-5 max-w-[62ch] text-chalk-soft">
          Le montant misé doit rester secret jusqu'au reveal, sinon l'adversaire
          ajuste. On dépose donc d'abord ses jetons dans un solde interne, et le
          commit ne contient qu'un hash — aucun transfert ne circule pendant la
          phase de commit, parce qu'un transfert trahirait le montant.
        </p>

        <pre className="type-formula mt-4 overflow-x-auto border border-rule bg-field px-4 py-3 text-chalk-soft">
          commitment = keccak256(hexId, montant, isAttack, salt, adresse)
        </pre>

        {/* Les formules */}
        <h3 className="type-title mt-10 text-chalk">Les formules</h3>
        <p className="type-body mt-3 max-w-[62ch] text-chalk-soft">
          Il n'y a aucun aléatoire nulle part, pas même pour l'ambiance. Tout se
          calcule en arithmétique entière, à la précision 1e18 : deux joueurs
          qui rejouent le même tick obtiennent le même résultat, et l'ordre des
          transactions ne change rien.
        </p>

        <div className="mt-5 space-y-3">
          {FORMULAS.map((f) => (
            <div key={f.title} className="panel px-4 py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Label className="text-chalk-soft">{f.title}</Label>
                <code className="type-formula text-ember">{f.code}</code>
              </div>
              <p className="type-data mt-2.5 max-w-[70ch] text-chalk-muted">
                {f.note}
              </p>
            </div>
          ))}
        </div>

        {/* Les garde-fous */}
        <h3 className="type-title mt-10 text-chalk">Ce qui protège les petits</h3>
        <ul className="mt-4 space-y-3">
          {[
            [
              "Le refuge",
              "Chaque guilde possède un hexagone inattaquable, déplaçable une fois tous les 21 ticks. Personne ne peut être effacé de la carte.",
            ],
            [
              "La racine",
              "La puissance croît en racine de la mise. Cent fois plus de jetons ne donnent que dix fois plus de force.",
            ],
            [
              "La taxe d'empire",
              "Plus une guilde tient d'hexagones, plus chaque attaque lui coûte cher. Le surcoût est brûlé, pas redistribué.",
            ],
            [
              "La rébellion",
              "Une guilde réduite à moins de trois hexagones frappe 25 % plus fort à partir du tick 32.",
            ],
          ].map(([title, body]) => (
            <li key={title} className="flex gap-3 border-b border-rule/60 pb-3 last:border-0">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ember" />
              <div>
                <span className="type-figure-sm text-chalk">{title}</span>
                <p className="type-body mt-1 max-w-[62ch] text-chalk-soft">{body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 border border-ember/30 bg-ember/5 px-4 py-4">
          <Label className="text-ember">État du projet</Label>
          <p className="type-body mt-2 max-w-[62ch] text-chalk-soft">
            Aucun contrat n'est déployé et aucune saison n'a commencé. La carte
            de cette page est un état réel produit par la simulation
            d'équilibrage, arrêté au tick {18} sur {TICKS_PER_SEASON} — pas une
            lecture de chaîne, et pas une invention non plus.
          </p>
        </div>
      </div>
    </div>
  );
}
