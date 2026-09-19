// Unsplash client — called at BUILD time from .astro frontmatter (Node context),
// not from the browser. Photos get baked into the static HTML during `astro build`,
// so this never runs per-visitor and never touches the browser's rate limit —
// see CLAUDE.md "Architecture — Unsplash".
//
// Unsplash's API terms require attribution: the photographer's name and a link
// back to their Unsplash profile, shown alongside every photo (see the `credit`
// fields below) — do not drop this when rendering a photo.

const accessKey = import.meta.env.PUBLIC_UNSPLASH_ACCESS_KEY as string | undefined;

export const isUnsplashConfigured = Boolean(accessKey);

export interface UnsplashPhoto {
  url: string;
  alt: string;
  creditName: string;
  creditUrl: string;
}

const cache = new Map<string, UnsplashPhoto | null>();

export async function fetchUnsplashPhoto(query: string): Promise<UnsplashPhoto | null> {
  if (!isUnsplashConfigured) return null;
  if (cache.has(query)) return cache.get(query) as UnsplashPhoto | null;

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&content_filter=high`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    );
    if (!res.ok) {
      cache.set(query, null);
      return null;
    }
    const data = await res.json();
    const photo = data.results?.[0];
    if (!photo) {
      cache.set(query, null);
      return null;
    }
    const result: UnsplashPhoto = {
      url: photo.urls.regular,
      alt: photo.alt_description || query,
      creditName: photo.user.name,
      creditUrl: `${photo.user.links.html}?utm_source=afrimigrate&utm_medium=referral`,
    };
    cache.set(query, result);
    return result;
  } catch (err) {
    console.error('Unsplash fetch error:', err);
    cache.set(query, null);
    return null;
  }
}
