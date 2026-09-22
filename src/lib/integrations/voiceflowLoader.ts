declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: any) => void;
        destroy?: () => void;
        hide?: () => void;
        show?: () => void;
        open?: () => void;
        close?: () => void;
      };
    };
  }
}

let loadPromise: Promise<void> | null = null;

export function loadVoiceflowSDK(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Voiceflow SDK can only be loaded in browser environment."));
  }

  if (window.voiceflow && window.voiceflow.chat) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    // Check if script element already exists
    const existingScript = document.querySelector('script[src="https://cdn.voiceflow.com/widget-next/bundle.mjs"]');

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", (e) => reject(e));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      // Small timeout to ensure window.voiceflow.chat is ready
      setTimeout(() => {
        resolve();
      }, 100);
    };

    script.onerror = (err) => {
      loadPromise = null;
      reject(new Error("Falha ao carregar o SDK do Voiceflow. Verifica a ligação à internet."));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}
