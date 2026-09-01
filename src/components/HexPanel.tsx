"use client";

import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import { Label, PreviewTag } from "@/components/ui/Label";
import { guildColor, guildName } from "@/lib/guilds";
import { TIER_YIELD, type HexCell } from "@/lib/hexmap";
import { isLive, chainConfig, siteConfig } from "@/lib/site-config";
import { previewBoard } from "@/lib/preview-board";

/*
 * La fiche d'un hexagone.
 *
 * Tout ce qui est affiché ici est public dans le jeu réel — propriétaire,
 * tier, trésor, ancienneté de la tenue — parce que c'est exactement ce qu'un
 * attaquant peut lire avant de committer. La seule chose qu'il ne verra jamais
 * avant le reveal, c'est le montant misé en face; le panneau d'ordre le dit.
 */

function fortification(tick: number, heldSince: number): number {
  return 100 + 5 * Math.min(Math.max(0, tick - heldSince), 20);
}

const fmt = (n: number) => n.toLocaleString("fr-FR");

export function HexPanel({
  cell,
  onClose,
}: {
  cell: HexCell;
  onClose: () => void;
}) {
  const owner = previewBoard.owners[cell.id] ?? 0;
  const tier = previewBoard.tiers[cell.id] ?? 1;
  const treasury = previewBoard.treasury[cell.id] ?? 0;
  const heldSince = previewBoard.heldSince[cell.id] ?? 0;
  const isRefuge = previewBoard.refuges.includes(cell.id);
  const fort = fortification(previewBoard.tick, heldSince);
  const claimPrice = tier * 100;

  const rows: { key: string; value: string; tone?: string }[] = [
    { key: "Coordonnées", value: `q ${cell.q}   r ${cell.r}` },
    { key: "Tier", value: `${tier} — rendement ${TIER_YIELD[tier]}x` },
    {
      key: "Propriétaire",
      value: owner === 0 ? "Neutre" : guildName(owner),
    },
    { key: "Trésor", value: `${fmt(treasury)} ${siteConfig.ticker}` },
    {
      key: "Tenu depuis",
      value: owner === 0 ? "—" : `tick ${heldSince}`,
    },
    {
      key: "Fortification",
      value: owner === 0 ? "—" : `${fort} %`,
      tone: fort >= 200 ? "text-ember" : undefined,
    },
  ];

  return (
    <div className="flex h-full flex-col border-l border-rule bg-void/96 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3 border-b border-rule px-5 py-4">
        <div>
          <Label>Hex</Label>
          <div className="type-display mt-1 text-chalk">
            #{String(cell.id).padStart(3, "0")}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la fiche"
          className="type-label border border-rule-strong px-3 py-2 text-chalk-muted transition-colors hover:border-chalk hover:text-chalk"
        >
          Fermer
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Bandeau de possession: la couleur avant les chiffres. */}
        <div
          className="flex items-center gap-3 border-b border-rule px-5 py-3"
          style={{
            background:
              owner === 0 ? "transparent" : `${guildColor(owner)}1f`,
          }}
        >
          <span
            className="h-3 w-3 shrink-0"
            style={{ background: owner === 0 ? "#39404a" : guildColor(owner) }}
          />
          <span className="type-figure-sm text-chalk">
            {owner === 0 ? "Libre" : guildName(owner)}
          </span>
          {isRefuge && (
            <span className="type-label ml-auto border border-chalk/40 px-2 py-1 text-chalk">
              Refuge
            </span>
          )}
          {tier === 3 && !isRefuge && (
            <span className="type-label ml-auto border border-ember/40 bg-ember/10 px-2 py-1 text-ember">
              Tier 3
            </span>
          )}
        </div>

        <dl className="px-5 py-4">
          {rows.map((row) => (
            <div
              key={row.key}
              className="flex items-baseline justify-between gap-4 border-b border-rule/60 py-2.5 last:border-0"
            >
              <dt>
                <Label>{row.key}</Label>
              </dt>
              <dd className={clsx("type-data text-chalk", row.tone)}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        {isRefuge && (
          <p className="type-data mx-5 mb-4 border border-chalk/25 bg-chalk/5 px-3 py-2.5 text-chalk-soft">
            Un refuge ne peut pas être attaqué. Chaque guilde en a exactement un
            et ne peut le déplacer qu'une fois tous les 21 ticks — c'est ce qui
            garantit qu'aucune guilde ne peut être effacée de la carte.
          </p>
        )}

        {/* Panneau d'ordre. Désactivé tant qu'aucun contrat n'existe. */}
        <div className="mx-5 mb-5 border border-rule">
          <div className="flex items-center justify-between gap-2 border-b border-rule px-4 py-3">
            <Label className="text-chalk-soft">Engager un ordre</Label>
            <PreviewTag />
          </div>

          <div className="px-4 py-4">
            <div className="flex gap-2">
              {(owner === 0
                ? ([{ k: "claim", l: "Claim" }] as const)
                : ([
                    { k: "attack", l: "Attaquer" },
                    { k: "defend", l: "Défendre" },
                  ] as const)
              ).map((opt) => (
                <span
                  key={opt.k}
                  className="type-label flex-1 border border-rule-strong px-3 py-2.5 text-center text-chalk-muted"
                >
                  {opt.l}
                </span>
              ))}
            </div>

            {owner === 0 ? (
              <div className="mt-3 flex items-baseline justify-between">
                <Label>Coût du claim</Label>
                <span className="type-data text-chalk">
                  {fmt(claimPrice)} {siteConfig.ticker}
                </span>
              </div>
            ) : (
              <p className="type-data mt-3 text-chalk-muted">
                Le montant reste scellé jusqu'au reveal : on ne dépose qu'un
                hash pendant les 7 h de commit. Personne — pas même le
                défenseur — ne voit ce qui arrive.
              </p>
            )}

            <Button className="mt-4 w-full" disabled>
              {isLive ? "Committer" : "Contrats non déployés"}
            </Button>

            <p className="type-data mt-3 text-chalk-muted">
              {isLive
                ? `Réseau ${chainConfig.network}.`
                : `Rien n'est déployé. Le déploiement est prévu sur ${chainConfig.network}, après la simulation d'équilibrage.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
