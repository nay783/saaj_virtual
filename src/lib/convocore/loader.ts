import { CONVOCORE_GLOBAL_CONFIG } from "./config";

export function loadConvoCoreStylesheet(): void {
  if (typeof window === "undefined") return;

  const existingLink = document.querySelector(
    `link[href="${CONVOCORE_GLOBAL_CONFIG.stylesheetUrl}"]`
  );

  if (!existingLink) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CONVOCORE_GLOBAL_CONFIG.stylesheetUrl;
    document.head.appendChild(link);
  }
}

/**
 * Controlled script loader for ConvoCore.
 * Forcefully remounts the script tag to ensure `vg_bundle.js` executes fresh
 * for the newly assigned window.VG_CONFIG.
 */
export function reloadConvoCoreScript(token: number): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  // Ensure stylesheet is loaded
  loadConvoCoreStylesheet();

  return new Promise((resolve, reject) => {
    // 1. Remove existing vg_bundle script elements to force re-execution
    const existingScripts = document.querySelectorAll(
      `script[src*="vg_bundle.js"]`
    );
    existingScripts.forEach((s) => s.remove());

    // 2. Create fresh script element with unique cache-buster token
    const script = document.createElement("script");
    const scriptUrl = `${CONVOCORE_GLOBAL_CONFIG.scriptUrl}?token=${token}_${Date.now()}`;
    script.src = scriptUrl;
    script.defer = true;
    script.setAttribute("data-convocore-token", String(token));

    script.onload = () => {
      if (process.env.NODE_ENV === "development") {
        console.log(`[ConvoCore] Script bundle loaded successfully for token: ${token}`);
      }
      resolve();
    };

    script.onerror = (err) => {
      console.error(`[ConvoCore] Script bundle failed to load for token: ${token}`, err);
      reject(new Error("Não foi possível carregar o módulo de conversa ConvoCore."));
    };

    document.body.appendChild(script);
  });
}
