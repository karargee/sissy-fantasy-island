import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "data");

function filePath(name) {
  return path.join(DIR, `${name}.json`);
}

export function readStore(name, fallback = []) {
  try {
    if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
    const f = filePath(name);
    if (!fs.existsSync(f)) return fallback;
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch { return fallback; }
}

export function writeStore(name, data) {
  try {
    if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
    fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2));
  } catch (e) { console.error("writeStore error:", e.message); }
}

export function appendStore(name, item) {
  const arr = readStore(name, []);
  arr.unshift({ ...item, id: Date.now().toString(), created_at: new Date().toISOString() });
  writeStore(name, arr);
  return arr[0];
}
