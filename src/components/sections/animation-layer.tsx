"use client";

import { useEffect } from "react";

export function AnimationLayer() {
  useEffect(() => {
    let cleanup = () => {};

    function loadGsapScript() {
      return new Promise<void>((resolve, reject) => {
        if (
          (window as Window & { gsap?: unknown }).gsap ||
          document.querySelector("[data-gsap-cdn]")
        ) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
        script.async = true;
        script.dataset.gsapCdn = "true";
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      });
    }

    async function loadAnimations() {
      try {
        await loadGsapScript();
        const gsap =
          (
            window as Window & {
              gsap?: {
                set: (targets: HTMLElement[], vars: Record<string, unknown>) => void;
                to: (target: HTMLElement, vars: Record<string, unknown>) => void;
                utils: { toArray: <T extends Element>(selector: string) => T[] };
              };
            }
          ).gsap ?? null;

        if (!gsap) return;

        const elements = gsap.utils.toArray<HTMLElement>(".section-animate");
        gsap.set(elements, { autoAlpha: 0, y: 34 });

        const observers = elements.map((element) => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                gsap.to(element, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power3.out",
                });
                observer.disconnect();
              }
            },
            { threshold: 0.16 },
          );
          observer.observe(element);
          return observer;
        });

        cleanup = () => observers.forEach((observer) => observer.disconnect());
      } catch {
        document
          .querySelectorAll<HTMLElement>(".section-animate")
          .forEach((element) => {
            element.style.opacity = "1";
            element.style.transform = "none";
          });
      }
    }

    loadAnimations();
    return () => cleanup();
  }, []);

  return null;
}
