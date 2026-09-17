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

    const updateLenis = (time) => {
      lenisInstance.raf(time * 1000);
    };

    lenisInstance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(500, 33);

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
      gsap.ticker.remove(updateLenis);
      lenisInstance.destroy();
      if (typeof window !== "undefined") {
        delete window.lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
