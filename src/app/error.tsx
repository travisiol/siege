"use client";

/*
 * If the map throws, the page must not go white.
 *
 * The canvas is the whole product here, so a crash inside it would otherwise
 * take the entire route down with it. This keeps the frame and offers the one
 * action that actually helps.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="max-w-[42ch] border border-rule bg-field px-6 py-6">
        <p className="type-label text-ember">Something broke</p>
        <p className="type-body mt-3 text-chalk-soft">
          The map failed to draw. Nothing was lost: this page holds no state of
          its own, and no order is placed without a wallet signature.
        </p>
        <button
          type="button"
          onClick={reset}
          className="type-label mt-5 bg-ember px-4 py-3 text-void transition-colors hover:bg-ember-bright"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
