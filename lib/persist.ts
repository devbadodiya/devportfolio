import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

async function ensureDir() {
  await mkdir(dataDir, { recursive: true });
}

export async function readJsonFile<T>(name: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(path.join(dataDir, name), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonFile<T>(name: string, value: T): Promise<void> {
  await ensureDir();
  const target = path.join(dataDir, name);
  const temp = `${target}.${process.pid}.tmp`;
  const body = `${JSON.stringify(value, null, 2)}\n`;
  await writeFile(temp, body, "utf8");
  await rename(temp, target);
}
