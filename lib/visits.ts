export type VisitHit = {
  path: string;
  city: string;
  country: string;
  lat: number | null;
  lng: number | null;
  at: string;
};

export type VisitSnapshot = {
  total: number;
  last: VisitHit | null;
  lastPlace: { city: string; country: string } | null;
  recent: VisitHit[];
  countries: { name: string; count: number }[];
  pages: { name: string; count: number }[];
  pins: { city: string; country: string; lat: number; lng: number; count: number }[];
  startedAt: string | null;
};

export const pageLabels: Record<string, string> = {
  "/": "Index",
  "/about": "About",
  "/now": "Now",
  "/someday": "Someday",
  "/work": "Work",
  "/skills": "Skills",
  "/writing": "Writing",
  "/favorites": "Favorites",
  "/guestbook": "Guestbook",
  "/photos": "Photos",
  "/visits": "Visits",
  "/colophon": "Colophon",
  "/studio": "Desk",
};

export function labelPath(path: string) {
  if (pageLabels[path]) return pageLabels[path];
  if (path.startsWith("/work/")) return "Case study";
  if (path.startsWith("/writing/")) return "Note";
  return path;
}
