import { getDb } from "@/lib/db";
import type { VisitHit, VisitSnapshot } from "@/lib/visits";

const MAX = 240;

function tally(hits: VisitHit[], pick: (hit: VisitHit) => string) {
  const map = new Map<string, number>();
  for (const hit of hits) {
    const key = pick(hit);
    if (!key) continue;
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function rowToHit(row: Record<string, unknown>): VisitHit {
  return {
    path: String(row.path ?? "/"),
    city: String(row.city ?? ""),
    country: String(row.country ?? ""),
    lat: typeof row.lat === "number" ? row.lat : row.lat == null ? null : Number(row.lat),
    lng: typeof row.lng === "number" ? row.lng : row.lng == null ? null : Number(row.lng),
    at: String(row.at ?? ""),
  };
}

export function visitSnapshot(hits: VisitHit[]): VisitSnapshot {
  const pins = new Map<string, VisitSnapshot["pins"][number]>();
  for (const hit of hits) {
    if (hit.lat == null || hit.lng == null || !hit.city || Number.isNaN(hit.lat) || Number.isNaN(hit.lng)) {
      continue;
    }
    const key = `${hit.city}|${hit.country}`;
    const existing = pins.get(key);
    if (existing) existing.count += 1;
    else pins.set(key, { city: hit.city, country: hit.country, lat: hit.lat, lng: hit.lng, count: 1 });
  }
  const lastPlaced = hits.find((hit) => hit.city || hit.country) ?? null;
  return {
    total: hits.length,
    last: hits[0] ?? null,
    lastPlace: lastPlaced ? { city: lastPlaced.city, country: lastPlaced.country } : null,
    recent: hits.slice(0, 8),
    countries: tally(hits, (hit) => hit.country),
    pages: tally(hits, (hit) => hit.path || "/"),
    pins: [...pins.values()],
    startedAt: hits.length ? hits[hits.length - 1].at : null,
  };
}

async function loadHits(): Promise<VisitHit[]> {
  const db = await getDb();
  const result = await db.execute("SELECT path, city, country, lat, lng, at FROM visits ORDER BY id DESC");
  return result.rows.map((row) => rowToHit(row as Record<string, unknown>));
}

export async function listVisits(): Promise<VisitSnapshot> {
  return visitSnapshot(await loadHits());
}

export async function addVisit(hit: VisitHit): Promise<VisitSnapshot> {
  const db = await getDb();
  await db.execute({
    sql: "INSERT INTO visits (path, city, country, lat, lng, at) VALUES (?, ?, ?, ?, ?, ?)",
    args: [hit.path, hit.city, hit.country, hit.lat, hit.lng, hit.at],
  });

  const count = await db.execute("SELECT COUNT(*) AS total FROM visits");
  const total = Number((count.rows[0] as { total?: number } | undefined)?.total ?? 0);
  if (total > MAX) {
    await db.execute({
      sql: `DELETE FROM visits WHERE id IN (
        SELECT id FROM visits ORDER BY id ASC LIMIT ?
      )`,
      args: [total - MAX],
    });
  }

  return visitSnapshot(await loadHits());
}
