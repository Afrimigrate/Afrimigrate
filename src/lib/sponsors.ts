// UK sponsor licence register — fetched at BUILD time (Node context), same
// pattern as src/lib/unsplash.ts, so a visitor's page load never calls out
// anywhere and there's no per-visitor rate limit.
//
// Deliberately NOT hardcoded with any employer names — CLAUDE.md explicitly
// flags this dataset as "real data required — do not fabricate" and asks
// for the current official gov.uk CSV URL before importing. Until
// SPONSOR_REGISTER_CSV_URL is set (as a real env var, the official
// "Register of licensed sponsors: workers" download link from
// gov.uk/government/publications/register-of-licensed-sponsors-workers),
// every consumer of this module gets an empty list and shows a friendly
// "not switched on yet" message with a link to the real register —
// nothing here is ever invented.
export interface Sponsor {
  name: string;
  town: string;
  rating: string;
  route: string;
}

export const isSponsorRegisterConfigured = Boolean(import.meta.env.SPONSOR_REGISTER_CSV_URL);

// Minimal CSV line splitter — handles quoted fields containing commas,
// which is all the official register's format needs (no embedded
// newlines inside fields). Avoids pulling in a parsing dependency for
// one build-time fetch.
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      fields.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  fields.push(cur.trim());
  return fields;
}

function findColumn(headers: string[], keywords: string[]): number {
  const lower = headers.map((h) => h.toLowerCase());
  for (const kw of keywords) {
    const idx = lower.findIndex((h) => h.includes(kw));
    if (idx !== -1) return idx;
  }
  return -1;
}

let cache: Sponsor[] | null = null;

export async function fetchSponsorRegister(): Promise<Sponsor[]> {
  if (!isSponsorRegisterConfigured) return [];
  if (cache) return cache;

  const url = import.meta.env.SPONSOR_REGISTER_CSV_URL as string;
  try {
    const res = await fetch(url);
    if (!res.ok) { cache = []; return cache; }
    const text = await res.text();
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length < 2) { cache = []; return cache; }

    const headers = parseCsvLine(lines[0]);
    const nameCol = findColumn(headers, ['organisation', 'company', 'name']);
    const townCol = findColumn(headers, ['town', 'city']);
    const ratingCol = findColumn(headers, ['rating', 'type & rating', 'type and rating']);
    const routeCol = findColumn(headers, ['route']);

    if (nameCol === -1) { cache = []; return cache; }

    cache = lines.slice(1).map((line) => {
      const cols = parseCsvLine(line);
      return {
        name: cols[nameCol] || '',
        town: townCol !== -1 ? cols[townCol] || '' : '',
        rating: ratingCol !== -1 ? cols[ratingCol] || '' : '',
        route: routeCol !== -1 ? cols[routeCol] || '' : '',
      };
    }).filter((s) => s.name);

    // The real register can run to 100,000+ rows — baking all of them into
    // the static page isn't practical (multi-MB page weight). Cap what's
    // embedded; if the real register turns out this large, the right fix
    // is a proper searchable backend (e.g. a Supabase table refreshed on a
    // schedule) rather than raising this number indefinitely.
    const MAX_EMBEDDED = 3000;
    if (cache.length > MAX_EMBEDDED) cache = cache.slice(0, MAX_EMBEDDED);

    return cache;
  } catch (err) {
    console.error('Sponsor register fetch error:', err);
    cache = [];
    return cache;
  }
}
