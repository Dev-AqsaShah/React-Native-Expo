// scripts/google-translate-json.js
require('dotenv').config();
const fs = require('fs-extra');
const fetch = require('node-fetch');
const path = require('path');

const API_KEY = process.env.GOOGLE_TRANSLATE_KEY;
if (!API_KEY) {
  console.error('Missing GOOGLE_TRANSLATE_KEY in .env');
  process.exit(1);
}

const SRC = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'en.json');
const OUT_DIR = path.join(__dirname, '..', 'src', 'i18n', 'locales');

// Target languages (ISO codes) — edit this list to the languages you want.
const TARGET_LANGS = ['ur','fr','es','ar','de','hi','bn','ru','tr','pt'];

// Flatten / unflatten utilities (keeps nested JSON shape)
function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const val = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(acc, flatten(val, newKey));
    } else {
      acc[newKey] = val;
    }
    return acc;
  }, {});
}
function unflatten(map) {
  const res = {};
  for (const fullKey of Object.keys(map)) {
    const parts = fullKey.split('.');
    let cur = res;
    parts.forEach((p, i) => {
      if (i === parts.length - 1) cur[p] = map[fullKey];
      else {
        cur[p] = cur[p] || {};
        cur = cur[p];
      }
    });
  }
  return res;
}

// Google Translate v2 REST endpoint
const TRANSLATE_URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

async function translateBatch(texts, target) {
  // texts: array of strings
  // We send them as multiple q params (can batch many at once)
  const body = {
    q: texts,
    target,
    format: 'text',
    source: 'en',
  };
  const res = await fetch(TRANSLATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Translate API error ${res.status}: ${txt}`);
  }
  const json = await res.json();
  // json.data.translations is array matching input q
  return json.data.translations.map(t => t.translatedText);
}

(async () => {
  try {
    await fs.ensureDir(OUT_DIR);
    const en = await fs.readJson(SRC);
    const flat = flatten(en);

    const keys = Object.keys(flat);
    const values = keys.map(k => flat[k]);

    // We'll process in chunks to avoid URL/body size limits and to be polite with quota
    const CHUNK = 40; // adjust (Safe: 20-100 depending on string sizes)
    for (const lang of TARGET_LANGS) {
      console.log(`Translating to ${lang} ...`);
      const outFlat = {};
      for (let i = 0; i < values.length; i += CHUNK) {
        const chunkVals = values.slice(i, i + CHUNK);
        const translated = await translateBatch(chunkVals, lang);
        for (let j = 0; j < translated.length; j++) {
          outFlat[keys[i + j]] = translated[j];
        }
        // small pause to avoid hitting quota bursts
        await new Promise(r => setTimeout(r, 200));
      }
      const nested = unflatten(outFlat);
      const outPath = path.join(OUT_DIR, `${lang}.json`);
      await fs.writeJson(outPath, nested, { spaces: 2 });
      console.log(`Wrote: ${outPath}`);
    }
    console.log('All done.');
  } catch (err) {
    console.error('Error:', err);
  }
})();
