"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Marquee.css";

const Marquee = ({ text }) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const content = wrapper.children[0];

    // Duplicate content for seamless loop effect
    for (let i = 0; i < 2; i++) {
      const clone = content.cloneNode(true);
      wrapper.appendChild(clone);
    }

    gsap.to(wrapper, {
      x: "-2%", // Absolute minimum movement for nearly stationary feel
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 5, // Extremely high lag for intense slow-motion effect
      },
    });
  }, { scope: containerRef });

  return (
    <div className="marquee" ref={containerRef}>
      <div className="marquee-wrapper" ref={wrapperRef}>
        <div className="marquee-content">
          <h1 className="gold-text-shimmer">
            {text} — {text} — {text} — {text} — {text} — {text} — {text} —{" "}
            {text} —{text} — {text} — {text} — {text} — {text} — {text} — {text}{" "}
            — {text} —
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
