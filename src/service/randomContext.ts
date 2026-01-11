import type { Expression, Partner, Place } from "@/types";
import { getRandomIndex, getRandomIndices } from "@/utils/random";

type CatalogJson = { places: Place[]; partners: Partner[] };
type ExprJson = { data: Expression[] };

let cached: { catalog: CatalogJson; expr: ExprJson } | null = null;
let inflight: Promise<{ catalog: CatalogJson; expr: ExprJson }> | null = null;

export async function loadGungriData() {
  if (cached) return cached;
  if (inflight) return inflight;

  inflight = Promise.all([
    fetch("/data/catalog.json").then((r) => r.json() as Promise<CatalogJson>),
    fetch("/data/expressions.json").then((r) => r.json() as Promise<ExprJson>),
  ]).then(([catalog, expr]) => {
    cached = { catalog, expr };
    inflight = null;
    return cached;
  }).catch((e) => {
    inflight = null;
    throw e;
  });

  return inflight;
}

export function pickRandomContext() {
  if (!cached) throw new Error("Data not loaded. Call loadGungriData() first.");

  const { catalog, expr } = cached;

  const place = catalog.places[getRandomIndex(catalog.places.length)];
  const partner = catalog.partners[getRandomIndex(catalog.partners.length)];

  const indices = getRandomIndices(2, expr.data.length);
  const expressions = indices.map((i) => expr.data[i]).filter(Boolean);

  if (expressions.length < 2) throw new Error("Not enough expressions to pick 2.");

  return { place, partner, expressions };
}
