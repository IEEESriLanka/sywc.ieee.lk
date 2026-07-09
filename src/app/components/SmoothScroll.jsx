"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);
    if (typeof window !== "undefined") {
      window.lenis = lenisInstance;
    }

    lenisInstance.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Global listener for scroll lock
    const handleScrollLock = (e) => {
      if (e.detail.locked) {
        lenisInstance.stop();
      } else {
        lenisInstance.start();
      }
    };

    window.addEventListener("scroll-lock", handleScrollLock);

    return () => {
      window.removeEventListener("scroll-lock", handleScrollLock);
      lenisInstance.destroy();
      gsap.ticker.remove(lenisInstance.raf);
      if (typeof window !== "undefined") {
        delete window.lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
