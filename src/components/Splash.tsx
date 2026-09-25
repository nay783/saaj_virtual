"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SplashProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const Splash: React.FC<SplashProps> = ({
  onComplete,
  minDurationMs = 800,
}) => {
  const [fadingOut, setFadingOut] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Always keep onCompleteRef up to date without triggering re-render effects
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[SAAJ BOOT] Splash mounted (minDurationMs: ${minDurationMs}ms)`);
    }

    const timer = setTimeout(() => {
      if (process.env.NODE_ENV === "development") {
        console.log("[SAAJ BOOT] Splash minDuration reached, starting fade out...");
      }
      setFadingOut(true);

      const finishTimer = setTimeout(() => {
        if (process.env.NODE_ENV === "development") {
          console.log("[SAAJ BOOT] Splash transition complete, calling onComplete()");
        }
        onCompleteRef.current();
      }, 300);

      return () => clearTimeout(finishTimer);
    }, minDurationMs);

    return () => {
      if (process.env.NODE_ENV === "development") {
        console.log("[SAAJ BOOT] Splash unmounting/cleaning up");
      }
      clearTimeout(timer);
    };
  }, [minDurationMs]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-300 ease-out ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="SAAJ Virtual"
    >
      {/* Pure white page container allows source logo white background to blend 100% seamlessly */}
      <div className="relative w-64 h-64 max-w-[75vw] max-h-[75vw] flex items-center justify-center">
        <Image
          src="/splash/splash_screen.png"
          alt="SAAJ Virtual Logo"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="mt-8 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-tonito-600 animate-pulse" />
        <span className="w-2 h-2 rounded-full bg-manuela-600 animate-pulse [animation-delay:200ms]" />
        <span className="w-2 h-2 rounded-full bg-tonito-600 animate-pulse [animation-delay:400ms]" />
      </div>
    </div>
  );
};
