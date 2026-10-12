/**
 * Resolves full API URL for client-side fetches.
 * In mobile Capacitor builds (or when NEXT_PUBLIC_API_BASE_URL is provided),
 * client-side requests target the production Vercel backend.
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NEXT_PUBLIC_CAPACITOR_BUILD === "true"
    ? "https://saajvirtual.vercel.app"
    : "");

export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (!API_BASE_URL) {
    return cleanPath;
  }
  return `${API_BASE_URL.replace(/\/$/, "")}${cleanPath}`;
}
