// Google Places API (New) client for the browser.
//
// Uses the "Text Search" and "Place Details" endpoints directly via fetch,
// with the API key sent as a request header — this is Google's supported
// pattern for browser use, provided the key is restricted by HTTP referrer
// in Google Cloud Console (see CLAUDE.md "Architecture — Google Places").
//
// Unlike Supabase's anon key, a Google Places key is NOT safe to expose
// without that referrer restriction — anyone could copy it and run up
// your bill. Restricting it to afrimigrate.com (and localhost while
// testing) is not optional.

const apiKey = import.meta.env.PUBLIC_GOOGLE_PLACES_API_KEY as string | undefined;

export const isPlacesConfigured = Boolean(apiKey);

export interface PlaceResult {
  id: string;
  name: string;
  address: string;
  rating?: number;
  userRatingCount?: number;
  openNow?: boolean;
  mapsUrl: string;
}

const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.rating',
  'places.userRatingCount',
  'places.currentOpeningHours.openNow',
  'places.googleMapsUri',
].join(',');

// Simple in-browser cache so repeat searches in one session don't burn
// through the API quota. Not persisted — server-side caching (e.g. in
// Supabase) is the next step if this feature sees real traffic.
const cache = new Map<string, PlaceResult[]>();

export async function searchPlacesText(query: string): Promise<PlaceResult[]> {
  if (!isPlacesConfigured) return [];
  if (cache.has(query)) return cache.get(query) as PlaceResult[];

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey as string,
      'X-Goog-FieldMask': FIELD_MASK,
    },
    body: JSON.stringify({ textQuery: query }),
  });

  if (!res.ok) {
    console.error('Places API error:', res.status, await res.text().catch(() => ''));
    return [];
  }

  const data = await res.json();
  const results: PlaceResult[] = (data.places ?? []).map((p: any) => ({
    id: p.id,
    name: p.displayName?.text ?? 'Unknown',
    address: p.formattedAddress ?? '',
    rating: p.rating,
    userRatingCount: p.userRatingCount,
    openNow: p.currentOpeningHours?.openNow,
    mapsUrl: p.googleMapsUri ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.displayName?.text ?? '')}`,
  }));

  cache.set(query, results);
  return results;
}
