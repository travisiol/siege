/*
 * GENERATED — do not edit by hand. Regenerate with `npm run sim:replay`.
 *
 * One real tick out of the balance simulation, ready to be replayed. Once a
 * chain is live the indexer serves the same shape from `/replay/:tick`.
 */

export type ReplayAttacker = { guild: number; power: number; stake: number };

export type ReplayEvent = {
  hex: number;
  tier: number;
  kind: "battle" | "claim";
  /** 0 when the ground was unclaimed. */
  defender: number;
  defPower: number;
  defStake: number;
  fort: number;
  attackers: ReplayAttacker[];
  /** 0 means the defender held. */
  winner: number;
  treasury: number;
};

export const previewReplay = {
  tick: 18,
  ticksPerSeason: 126,
  captures: 7,
  holds: 2,
  claims: 14,
  treasuryMoved: 2256,
  events: [{"hex":60,"tier":1,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":8,"power":46.09,"stake":2125}],"winner":8,"treasury":100},{"hex":85,"tier":1,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":7,"power":44.14,"stake":1949}],"winner":7,"treasury":100},{"hex":86,"tier":1,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":7,"power":44.14,"stake":1949},{"guild":8,"power":46.09,"stake":2125}],"winner":8,"treasury":100},{"hex":112,"tier":1,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":3,"power":63.24,"stake":2000},{"guild":9,"power":38.32,"stake":1469}],"winner":3,"treasury":100},{"hex":114,"tier":1,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":3,"power":31.62,"stake":1000}],"winner":3,"treasury":100},{"hex":128,"tier":3,"kind":"battle","defender":12,"defPower":67.67,"defStake":1612,"fort":105,"attackers":[{"guild":6,"power":83.37,"stake":1791}],"winner":6,"treasury":39},{"hex":130,"tier":3,"kind":"battle","defender":6,"defPower":18.16,"defStake":100,"fort":105,"attackers":[{"guild":12,"power":183.47,"stake":6490}],"winner":12,"treasury":39},{"hex":151,"tier":1,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":9,"power":38.32,"stake":1469}],"winner":9,"treasury":100},{"hex":169,"tier":2,"kind":"battle","defender":12,"defPower":12.63,"defStake":71,"fort":110,"attackers":[{"guild":6,"power":31.56,"stake":176}],"winner":6,"treasury":29},{"hex":173,"tier":2,"kind":"battle","defender":6,"defPower":11.28,"defStake":70,"fort":105,"attackers":[{"guild":5,"power":21.94,"stake":108}],"winner":5,"treasury":14},{"hex":196,"tier":1,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":9,"power":38.32,"stake":1469}],"winner":9,"treasury":100},{"hex":221,"tier":3,"kind":"battle","defender":6,"defPower":45.38,"defStake":710,"fort":115,"attackers":[{"guild":5,"power":25.87,"stake":127}],"winner":0,"treasury":115},{"hex":229,"tier":2,"kind":"battle","defender":3,"defPower":7.35,"defStake":20,"fort":135,"attackers":[{"guild":12,"power":116.88,"stake":2527}],"winner":12,"treasury":96},{"hex":249,"tier":2,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":7,"power":62.43,"stake":3898}],"winner":7,"treasury":200},{"hex":252,"tier":1,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":1,"power":43.17,"stake":1864}],"winner":1,"treasury":100},{"hex":274,"tier":3,"kind":"battle","defender":6,"defPower":43.9,"defStake":730,"fort":110,"attackers":[{"guild":5,"power":32.41,"stake":176}],"winner":0,"treasury":77},{"hex":275,"tier":2,"kind":"battle","defender":5,"defPower":11.39,"defStake":47,"fort":135,"attackers":[{"guild":6,"power":76.19,"stake":1776}],"winner":6,"treasury":96},{"hex":303,"tier":1,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":1,"power":43.17,"stake":1864},{"guild":10,"power":38.32,"stake":1469}],"winner":1,"treasury":100},{"hex":364,"tier":3,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":10,"power":66.38,"stake":4407}],"winner":10,"treasury":300},{"hex":403,"tier":2,"kind":"battle","defender":5,"defPower":8.1,"defStake":33,"fort":115,"attackers":[{"guild":12,"power":108.79,"stake":2162}],"winner":12,"treasury":43},{"hex":430,"tier":1,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":4,"power":41.23,"stake":1700}],"winner":4,"treasury":100},{"hex":501,"tier":2,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":4,"power":58.3,"stake":3400}],"winner":4,"treasury":200},{"hex":503,"tier":2,"kind":"claim","defender":0,"defPower":0,"defStake":0,"fort":100,"attackers":[{"guild":4,"power":58.3,"stake":3400}],"winner":4,"treasury":200}] as ReplayEvent[],
} as const;
