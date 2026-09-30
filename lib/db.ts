import { createClient, type Client } from "@libsql/client";
import { mkdir } from "fs/promises";
import path from "path";
import { readJsonFile } from "@/lib/persist";
import type { VisitHit } from "@/lib/visits";

type GuestRow = { id: string; name: string; message: string; at: string };

type DbState = {
  client: Client | null;
  ready: Promise<Client> | null;
};

const globalStore = globalThis as unknown as { __devportfolioDb?: DbState };

function state(): DbState {
  if (!globalStore.__devportfolioDb) {
    globalStore.__devportfolioDb = { client: null, ready: null };
  }
  return globalStore.__devportfolioDb;
}

function databaseUrl() {
  if (process.env.TURSO_DATABASE_URL) return process.env.TURSO_DATABASE_URL;
  if (process.env.LIBSQL_URL) return process.env.LIBSQL_URL;
  const file = path.join(process.cwd(), "data", "portfolio.db");
  return `file:${file}`;
}

async function migrate(client: Client) {
  await client.batch(
    [
      `CREATE TABLE IF NOT EXISTS visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT NOT NULL,
        city TEXT NOT NULL DEFAULT '',
        country TEXT NOT NULL DEFAULT '',
        lat REAL,
        lng REAL,
        at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS guestbook (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS meta (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )`,
    ],
    "write",
  );
}

async function importJsonIfNeeded(client: Client) {
  const flag = await client.execute({
    sql: "SELECT value FROM meta WHERE key = ?",
    args: ["json_imported"],
  });
  if (flag.rows.length) return;

  const visits = await readJsonFile<VisitHit[]>("visits.json", []);
  const guestbook = await readJsonFile<GuestRow[] | null>("guestbook.json", null);

  if (Array.isArray(visits) && visits.length) {
    for (const hit of [...visits].reverse()) {
      await client.execute({
        sql: "INSERT INTO visits (path, city, country, lat, lng, at) VALUES (?, ?, ?, ?, ?, ?)",
        args: [hit.path, hit.city ?? "", hit.country ?? "", hit.lat, hit.lng, hit.at],
      });
    }
  }

  const guestRows =
    Array.isArray(guestbook) && guestbook.length
      ? guestbook
      : ([
          {
            id: "seed-dev",
            name: "Dev",
            message: "Thanks for stopping by. Leave a short note if you want — no account needed.",
            at: "2026-09-30T08:00:00.000Z",
          },
        ] satisfies GuestRow[]);

  for (const entry of guestRows) {
    await client.execute({
      sql: "INSERT OR IGNORE INTO guestbook (id, name, message, at) VALUES (?, ?, ?, ?)",
      args: [entry.id, entry.name, entry.message, entry.at],
    });
  }

  await client.execute({
    sql: "INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)",
    args: ["json_imported", "1"],
  });
}

async function createDb(): Promise<Client> {
  const url = databaseUrl();
  if (url.startsWith("file:")) {
    await mkdir(path.join(process.cwd(), "data"), { recursive: true });
  }

  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN || process.env.LIBSQL_AUTH_TOKEN,
  });

  await migrate(client);
  await importJsonIfNeeded(client);
  return client;
}

export async function getDb(): Promise<Client> {
  const current = state();
  if (current.client) return current.client;
  if (!current.ready) {
    current.ready = createDb()
      .then((client) => {
        current.client = client;
        return client;
      })
      .catch((error) => {
        current.ready = null;
        throw error;
      });
  }
  return current.ready;
}
