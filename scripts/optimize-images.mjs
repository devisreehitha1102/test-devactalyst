#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import sharp from 'sharp';

const root = process.cwd();
const targets = [path.join(root, 'public'), path.join(root, 'src')];
const exts = new Set(['.jpg', '.jpeg', '.png']);
const args = new Set(process.argv.slice(2));
const FORCE = args.has('--force') || args.has('-f');
const REPORT = args.has('--report');
const CLEAN = args.has('--clean');

const isExcluded = (p) => /\\node_modules\\|\\dist\\|\\\.git\\/.test(p);

async function* walk(dir) {
  let entries;
  try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (isExcluded(p)) continue;
    if (e.isDirectory()) {
      yield* walk(p);
    } else {
      yield p;
    }
  }
}

function outNames(file) {
  const ext = path.extname(file).toLowerCase();
  const base = file.slice(0, -ext.length);
  return {
    avif: `${base}-opt.avif`,
    webp: `${base}-opt.webp`,
  };
}

async function optimizeOne(file) {
  const { avif, webp } = outNames(file);
  const src = await fs.readFile(file);
  const tasks = [];
  if (FORCE || !(await exists(avif))) {
    tasks.push(
      sharp(src)
        //.rotate()
         .zoom()
        .avif({ quality: 50, effort: 5 })
        .toFile(avif)
    );
  }
  if (FORCE || !(await exists(webp))) {
    tasks.push(
      sharp(src)
        //.rotate()
        .zoom()
        .webp({ quality: 82, effort: 5 })
        .toFile(webp)
    );
  }
  await Promise.all(tasks);
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function fileSize(p) {
  try { const s = await fs.stat(p); return s.size; } catch { return 0; }
}

async function cleanOne(file) {
  const { avif, webp } = outNames(file);
  const tasks = [];
  if (await exists(avif)) tasks.push(fs.unlink(avif));
  if (await exists(webp)) tasks.push(fs.unlink(webp));
  await Promise.all(tasks);
}

function fmt(bytes) {
  const units = ['B','KB','MB','GB'];
  let i = 0, n = bytes;
  while (n >= 1024 && i < units.length-1) { n /= 1024; i++; }
  return `${n.toFixed(1)} ${units[i]}`;
}

async function main() {
  const found = [];
  for (const target of targets) {
    for await (const p of walk(target)) {
      const ext = path.extname(p).toLowerCase();
      if (exts.has(ext)) found.push(p);
    }
  }

  if (REPORT) {
    let totalOrig = 0, totalWebp = 0, totalAvif = 0, count = 0;
    for (const f of found) {
      const { avif, webp } = outNames(f);
      totalOrig += await fileSize(f);
      totalWebp += await fileSize(webp);
      totalAvif += await fileSize(avif);
      count++;
    }
    console.log(`Images discovered: ${count}`);
    console.log(`Original size: ${fmt(totalOrig)} | WebP: ${fmt(totalWebp)} | AVIF: ${fmt(totalAvif)}`);
    console.log('Note: sizes for variants are 0 if not generated yet. Run "npm run images:optimize".');
    return;
  }

  if (CLEAN) {
    let cleaned = 0;
    await Promise.all(found.map(async (f) => { await cleanOne(f); cleaned++; }));
    console.log(`Removed generated variants for ${cleaned} images.`);
    return;
  }

  if (found.length === 0) {
    console.log('No JPG/PNG images found under public/ or src/.');
    return;
  }

  const cpu = Math.max(1, os.cpus()?.length - 1);
  let i = 0, processing = 0;
  let done = 0;
  await new Promise((resolve) => {
    const next = () => {
      while (processing < cpu && i < found.length) {
        const f = found[i++];
        processing++;
        optimizeOne(f)
          .catch((e) => console.error('Failed:', f, e.message))
          .finally(() => { processing--; done++; if (done === found.length) resolve(); else next(); });
      }
    };
    next();
  });
  console.log(`Optimized variants generated for ${found.length} images.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
