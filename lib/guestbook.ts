import { getDb } from "@/lib/db";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  at: string;
};

export type GuestbookSnapshot = {
  total: number;
  entries: GuestbookEntry[];
};

const MAX = 120;

const rateLimit = new Map<string, number>();

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function rowToEntry(row: Record<string, unknown>): GuestbookEntry {
  return {
    id: String(row.id),
    name: String(row.name),
    message: String(row.message),
    at: String(row.at),
  };
}

export async function listGuestbook(): Promise<GuestbookSnapshot> {
  const db = await getDb();
  const result = await db.execute("SELECT id, name, message, at FROM guestbook ORDER BY at DESC");
  const entries = result.rows.map((row) => rowToEntry(row as Record<string, unknown>));
  return { total: entries.length, entries };
}

export async function addGuestbookEntry(input: {
  name: unknown;
  message: unknown;
  ip: string;
}): Promise<{ ok: true; snapshot: GuestbookSnapshot } | { ok: false; error: string }> {
  const name = clean(input.name, 40);
  const message = clean(input.message, 280);
  if (name.length < 2) return { ok: false, error: "Name needs at least two characters." };
  if (message.length < 4) return { ok: false, error: "Say a little more — four characters minimum." };

  const urlHits = (message.match(/https?:\/\//gi) || []).length;
  if (urlHits > 1) return { ok: false, error: "One link is enough." };

  const now = Date.now();
  const last = rateLimit.get(input.ip) ?? 0;
  if (input.ip && now - last < 20_000) {
    return { ok: false, error: "Give it a moment — try again in a few seconds." };
  }

  const entry: GuestbookEntry = {
    id: `${now.toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    message,
    at: new Date(now).toISOString(),
  };

  const db = await getDb();
  await db.execute({
    sql: "INSERT INTO guestbook (id, name, message, at) VALUES (?, ?, ?, ?)",
    args: [entry.id, entry.name, entry.message, entry.at],
  });

  const count = await db.execute("SELECT COUNT(*) AS total FROM guestbook");
  const total = Number((count.rows[0] as { total?: number } | undefined)?.total ?? 0);
  if (total > MAX) {
    await db.execute({
      sql: `DELETE FROM guestbook WHERE id IN (
        SELECT id FROM guestbook ORDER BY at ASC LIMIT ?
      )`,
      args: [total - MAX],
    });
  }

  if (input.ip) rateLimit.set(input.ip, now);
  return { ok: true, snapshot: await listGuestbook() };
}
